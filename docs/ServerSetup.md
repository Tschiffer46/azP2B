# Server Setup Guide — Padel to Business

This guide is written specifically for the Hetzner server that **already runs azprofil.se and agiletransition.se** via Nginx. You are using **Terminus** as your SSH client.

azP2B adds one new thing to that server: **Docker**. Everything else (Nginx, the `deploy` user, SSH keys) is already in place.

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

## Step 2 — Check if Docker is already installed

```bash
docker --version
```

- If you see a version number (e.g. `Docker version 27.x.x`) → skip to **Step 4**.
- If you see `command not found` → continue to Step 3.

---

## Step 3 — Install Docker

Run as `root`:

```bash
curl -fsSL https://get.docker.com | sh
```

This is the [official Docker install script](https://docs.docker.com/engine/install/). You can preview what it does first by opening `https://get.docker.com` in a browser.  
Verify it worked:

```bash
docker --version
docker compose version
```

Both should print version numbers.

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

Still as `root`, create the config file:

```bash
nano /etc/nginx/sites-available/padeltobusiness.se
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

Enable the site and test the config:

```bash
ln -s /etc/nginx/sites-available/padeltobusiness.se /etc/nginx/sites-enabled/
nginx -t
```

You should see `syntax is ok` and `test is successful`. Then reload Nginx:

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
