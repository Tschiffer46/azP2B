# Server Setup Guide — Padel to Business

This guide covers everything needed to get the Padel to Business site running on the Hetzner server. It is written for the owner of the site, who uses **Terminus** as their SSH client.

---

## How the server works

The Hetzner server already runs several other websites. All containers are managed from a **single master file** at `/home/deploy/hosting/docker-compose.yml`. A browser-based tool called **Nginx Proxy Manager** (running as a container on the same server) handles all web traffic routing — there are no Nginx config files to edit manually.

When you merge this PR, the GitHub Actions workflow will automatically:
1. Build the Docker image for the Padel to Business app and push it to GitHub's container registry (GHCR)
2. SSH into the server as the `deploy` user
3. Update the master `docker-compose.yml` on the server — replacing the old static `azp2b` container entry with the real Next.js app and its MariaDB database
4. Write the environment variables (passwords, SMTP settings, etc.) to `/home/deploy/hosting/.env.p2b`
5. Pull the new image and start the containers

---

## Before the first deploy — two one-time steps

### Step 1 — Add the `deploy` user to the Docker group

The GitHub Actions workflow connects to the server as the `deploy` user and runs Docker commands. That user needs permission to do so.

Open Terminus, connect as **root**, and run:

```bash
usermod -aG docker deploy
```

Verify it worked:

```bash
groups deploy
```

You should see `docker` in the list, for example:
```
deploy : deploy docker
```

> **Note:** This only needs to be done once. If you already did this for another site on this server, you can skip it.

---

### Step 2 — Update the Nginx Proxy Manager proxy host for azp2b

The old static `azp2b` container served files on port **80**. The new Next.js app listens on port **3000**. You need to update the proxy host in Nginx Proxy Manager before merging — otherwise the site will return a 502 error after deploy.

**How to do it:**

1. Open a browser and go to **http://89.167.90.112:81**
2. Log in to Nginx Proxy Manager
3. Click **Proxy Hosts** in the menu
4. Find the proxy host for `azp2b.agiletransition.se` (or `padeltobusiness.se` once DNS is set up)
5. Click the **three dots** on the right → **Edit**
6. Change the **Forward Port** from `80` to `3000`
7. Click **Save**

That's it. The proxy host is now pointing to the correct port on the new container.

---

## Merge the PR

Once both steps above are done, merge the PR. GitHub Actions will handle everything else automatically.

---

## After the merge — verify the deployment

Once the GitHub Actions workflow finishes (look for the green checkmark on the Actions tab), open Terminus and connect as **deploy**. Run:

```bash
docker compose -f /home/deploy/hosting/docker-compose.yml ps
```

You should see both `azp2b` and `p2b-db` listed as **running**:

```
NAME        IMAGE                              STATUS
azp2b       ghcr.io/tschiffer46/azp2b:latest   Up X minutes
p2b-db      mariadb:11                         Up X minutes (healthy)
```

Check the app started cleanly (press Ctrl+C to stop following logs):

```bash
docker compose -f /home/deploy/hosting/docker-compose.yml logs --tail=50 azp2b
```

Look for lines near the end that say something like:
```
Running database migrations...
Starting server...
```

Finally, open `https://azp2b.agiletransition.se` in a browser. You should see the Padel to Business site.

---

## Troubleshooting

**`docker: permission denied` when running as deploy**
The group change from Step 1 hasn't taken effect in the current session. In Terminus, close the `deploy` session and open a fresh one, then try again.

**`p2b-db` container is restarting**
The database is still initialising on first start. Wait 30 seconds and re-run `docker compose ps`. If it keeps restarting, check the logs:
```bash
docker compose -f /home/deploy/hosting/docker-compose.yml logs --tail=50 p2b-db
```

**`azp2b` container is not starting**
Check the logs for database connection errors:
```bash
docker compose -f /home/deploy/hosting/docker-compose.yml logs --tail=50 azp2b
```
If it says it cannot connect to the database, the `p2b-db` container may not be healthy yet — wait a minute and run `docker compose up -d azp2b` to retry.

**502 Bad Gateway in the browser**
The `azp2b` container is not running. Check the container status:
```bash
docker compose -f /home/deploy/hosting/docker-compose.yml ps
```
Then check the logs as shown above.

**Proxy host still shows port 80 in Nginx Proxy Manager**
Follow Step 2 above to update the Forward Port to `3000`.

**The GitHub Actions workflow failed**
Go to the **Actions** tab in the GitHub repository and click on the failed run. Look at the step that failed and read the error message — it will tell you what went wrong (for example, a missing secret or an SSH connection issue).
