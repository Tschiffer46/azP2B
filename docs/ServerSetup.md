# Server Setup Guide — Padel to Business

This guide is written specifically for the Hetzner server that **already runs azprofil.se and agiletransition.se** via Nginx. You are using **Terminus** as your SSH client.

Everything needed is already in place: Nginx, the `deploy` user, SSH keys — and **Docker 29.2.1** (confirmed installed).

---

## Before you start — two questions

**Q: Which user should I log in as?**  
Most steps below require **root**. The final verification step uses **deploy**.  
Your Terminus likely has both saved. Use whichever profile matches.

**Q: Which value should `HETZNER_USER` be set to in GitHub Secrets?**  
Set it to **`deploy`** — the same user that runs azprofil and agiletransition.se on this server.

---

## Step 1 — Log in as `root` in Terminus

Open your `root` SSH session on the Hetzner server.

---

## Step 2 — Confirm Docker and Docker Compose are available

**Docker 29.2.1 is already installed on the server.** Run these to double-check before continuing:

```bash
docker --version
docker compose version
```

Expected output — both should print version numbers:
```
Docker version 29.2.1, build a5c7197
Docker Compose version v2.x.x
```

→ Proceed directly to **Step 4** (Docker install is not needed).

---

## Step 3 — ~~Install Docker~~ (already done)

Docker 29.2.1 is already installed. Skip this step.

---

## Step 4 — Add `deploy` to the docker group

The GitHub Actions workflow SSHes in as `deploy`. That user needs permission to run Docker commands.

Run as `root`:

```bash
usermod -aG docker deploy
```

Verify:

```bash
groups deploy
```

You should see `docker` in the list, e.g.:  
`deploy : deploy docker`

> **Note:** This change only takes effect in new login sessions. Existing `deploy` sessions on the server (if any) need to reconnect.

---

## Step 5 — Add the Nginx virtual host for padeltobusiness.se

azP2B's container listens on port **3000**. Nginx needs to forward traffic from `padeltobusiness.se` to it — exactly like it does for your other sites.

### 5a — Find the correct Nginx config directory

This Hetzner server does **not** use the standard `sites-available`/`sites-enabled` layout. First, confirm the directory where your existing sites are configured:

```bash
ls /etc/nginx/
```

You should see a folder called **`client-azp2b`** (or similar — check which name matches the other sites):

```bash
ls /etc/nginx/client-azp2b/
```

You should see config files for `azprofil.se` and/or `agiletransition.se` in there. That is the correct directory.

### 5b — Create the config file

Still as `root`, create the file in that same directory:

```bash
nano /etc/nginx/client-azp2b/padeltobusiness.se.conf
```

Paste this content exactly:

```nginx
server {
    listen 80;
    server_name padeltobusiness.se www.padeltobusiness.se;

    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Save and close (`Ctrl+O`, `Enter`, `Ctrl+X`).

### 5c — Test and reload Nginx

```bash
nginx -t
```

You should see `syntax is ok` and `test is successful`. Then reload:

```bash
systemctl reload nginx
```

---

## Step 6 — Add an SSL certificate (HTTPS)

If you use Certbot for your other sites (you should — check with `certbot certificates`), run:

```bash
certbot --nginx -d padeltobusiness.se -d www.padeltobusiness.se
```

Certbot will automatically update the Nginx config and reload it.  
This also sets up automatic renewal, the same as your other sites.

> **Note:** DNS for `padeltobusiness.se` must point to this server's IP address before running Certbot, otherwise the certificate request will fail.

---

## Step 7 — You're ready to merge

The server preparation is complete. **Merge the PR.**

GitHub Actions will automatically:
1. Build the Docker image and push it to GHCR
2. SSH in as `deploy` and create `~/p2b/` (if it doesn't exist)
3. Copy `docker-compose.yml` and write `.env` from your GitHub Secrets
4. Log in to GHCR on the server, pull the image, and start the containers
5. The container runs `prisma migrate deploy` on startup (creates DB tables), then starts the Next.js app on port 3000

---

## Step 8 — Verify the deployment (after merge)

Once the GitHub Actions `deploy` job shows a green checkmark, open a **`deploy`** session in Terminus and run:

```bash
# All containers should show "running"
docker compose -f ~/p2b/docker-compose.yml ps
```

Expected output — both `app` and `db` should be `running`:
```
NAME        IMAGE                          STATUS
p2b-app-1   ghcr.io/tschiffer46/azp2b      Up X minutes
p2b-db-1    mariadb:11                     Up X minutes (healthy)
```

Check the app started cleanly (Ctrl+C to stop):

```bash
docker compose -f ~/p2b/docker-compose.yml logs --tail=50 app
```

Look for these two lines near the end:
```
Running database migrations...
Starting server...
```

Check the database tables were created:

```bash
docker compose -f ~/p2b/docker-compose.yml exec db \
  mariadb -u p2b -p p2b -e "SHOW TABLES;"
```

When prompted `Enter password:`, type the `DB_PASSWORD` you set in GitHub Secrets.  
(`-u p2b` is the DB username, `p2b` at the end is the database name — the `-p` flag prompts for the password.)

Finally, open `https://padeltobusiness.se` in a browser. You should be redirected to `/sv` and see the homepage.

---

## Troubleshooting

**`nano /etc/nginx/sites-available/...` gives "No such file or directory"**  
This server uses Hetzner's `client-azp2b` directory layout, not the standard Debian `sites-available`/`sites-enabled` layout. Use the path in Step 5 above: `/etc/nginx/client-azp2b/padeltobusiness.se.conf`. Run `ls /etc/nginx/` first to confirm the exact directory name.

**`docker: permission denied` when running as deploy**  
The group change hasn't taken effect. In Terminus, close the `deploy` session and open a fresh one, then retry.

**`docker compose pull` fails with "unauthorized"**  
The `GHCR_TOKEN` secret may be missing `packages:read` scope. Go to GitHub → Settings → Developer settings → Personal access tokens, and verify the token has both `packages:read` and `packages:write`.

**`app` container shows as `restarting` instead of `running`**  
The database healthcheck hasn't passed yet. Wait 30 seconds and re-run `docker compose ps`. If it keeps restarting, check logs: `docker compose -f ~/p2b/docker-compose.yml logs app`.

**Nginx returns 502 Bad Gateway**  
The app container isn't running yet. Check `docker compose ps` and the app logs.

**Certbot says DNS doesn't resolve**  
Set the DNS A record for `padeltobusiness.se` to your server's IP address in your DNS provider, wait for propagation (usually 5–15 minutes), then re-run Certbot.
