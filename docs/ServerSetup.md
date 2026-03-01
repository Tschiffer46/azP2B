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

## Before the first deploy — three one-time steps

### Step 1 — Set up the SSH key for GitHub Actions

The GitHub Actions workflow connects to the server over SSH using the `SERVER_SSH_KEY` secret. The key must be a key pair **whose public key is already authorised on the server** for the `deploy` user.

The easiest way to do this is to generate the key pair directly on the server so the public key is automatically available there.

Open Terminus, connect as **deploy**, and run:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/github_actions -N ""
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

Now display the private key so you can copy it:

```bash
cat ~/.ssh/github_actions
```

Copy the entire output (from `-----BEGIN OPENSSH PRIVATE KEY-----` to `-----END OPENSSH PRIVATE KEY-----`, including those lines).

In GitHub, go to **Settings → Secrets and variables → Actions → New repository secret** and add:

| Name | Value |
|------|-------|
| `SERVER_SSH_KEY` | The private key content you just copied |
| `SERVER_HOST` | `89.167.90.112` |
| `SERVER_USER` | `deploy` |

> **Why generate on the server?** You can also generate the key pair on your laptop and copy the public key to the server — but then you must copy the **private** key (not the public key) to GitHub Secrets. Generating on the server skips the extra copy step: the public key is already in place and you only need to copy the private key to GitHub.

---

### Step 2 — Add the `deploy` user to the Docker group

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

### Step 3 — Update the Nginx Proxy Manager proxy host for azp2b

The old static `azp2b` container served files on port **80**. The new Next.js app listens on port **3000**. You need to update the proxy host in Nginx Proxy Manager before merging — otherwise the site will return a 502 error after deploy.

**How to do it:**

1. Open a browser and go to **http://89.167.90.112:81**
2. Log in to Nginx Proxy Manager
3. Click **Proxy Hosts** in the menu
4. Find the proxy host for `azp2b.agiletransition.se` (or `padeltobusiness.se` once DNS is set up)
5. Click the **three dots** on the right → **Edit**
6. Make sure the **Forward Hostname / IP** is set to `azp2b` (the container name — this is how Nginx Proxy Manager reaches the app through the Docker network)
7. Change the **Forward Port** from `80` to `3000`
8. Click **Save**

That's it. The proxy host is now pointing to the correct port on the new container.

---

## Merge the PR

Once all three steps above are done, merge the PR. GitHub Actions will handle everything else automatically.

> **On the very first deploy** the MariaDB container has to initialise a brand-new data directory. This is expected and can take up to a few minutes. The deploy workflow now waits up to **5 minutes** for the database to become healthy before starting the app container, so you do not need to do anything manually.

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
The group change from Step 2 hasn't taken effect in the current session. In Terminus, close the `deploy` session and open a fresh one, then try again.

**The GitHub Actions workflow fails with `dependency failed to start: container p2b-db is unhealthy`**
This can happen on the very first deploy when no database volume exists yet — MariaDB needs to initialise a brand-new data directory from scratch, which takes time. The deploy workflow now starts the database first and waits up to 5 minutes for it to become healthy before starting the app. If the error occurs anyway, check the `p2b-db` logs on the server:
```bash
docker compose -f /home/deploy/hosting/docker-compose.yml logs --tail=50 p2b-db
```
The most common causes are:
- A missing or empty `DB_ROOT_PASSWORD` or `DB_PASSWORD` secret in GitHub (MariaDB refuses to start if the root password is blank)
- A previous failed initialisation that left the volume in a broken state — in that case, remove the volume and redeploy: `docker volume rm hosting_p2b_db_data`

**`p2b-db` container keeps restarting or stays unhealthy after the deploy**
Check the logs:
```bash
docker compose -f /home/deploy/hosting/docker-compose.yml logs --tail=50 p2b-db
```

**`azp2b` container is not starting**
Check the logs for database connection errors:
```bash
docker compose -f /home/deploy/hosting/docker-compose.yml logs --tail=50 azp2b
```
If it says it cannot connect to the database, the `p2b-db` container may not be healthy yet — wait a minute and run:
```bash
docker compose -f /home/deploy/hosting/docker-compose.yml up -d azp2b
```

**SSH connection refused / `Permission denied (publickey)` in the workflow**
The `SERVER_SSH_KEY` secret does not match any key authorised on the server. Follow Step 1 above to generate a key pair **on the server** and add the private key to GitHub Secrets. A key generated on your own laptop will not work unless you have separately added its public key to the server's `authorized_keys`.

**502 Bad Gateway in the browser**
The `azp2b` container is not running. Check the container status:
```bash
docker compose -f /home/deploy/hosting/docker-compose.yml ps
```
Then check the logs as shown above.

**Proxy host still shows port 80 in Nginx Proxy Manager**
Follow Step 3 above to update the Forward Port to `3000`.

**The GitHub Actions workflow failed**
Go to the **Actions** tab in the GitHub repository and click on the failed run. Look at the step that failed and read the error message — it will tell you what went wrong (for example, a missing secret or an SSH connection issue).
