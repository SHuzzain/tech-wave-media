#!/bin/bash
set -euo pipefail

# Apache can only load one MPM. Upstream wordpress images sometimes enable
# mpm_event and mpm_prefork together (AH00534) and Apache never starts → 502.
# See https://github.com/9d8dev/next-wp/issues/76
echo "[setup] Forcing Apache mpm_prefork..."
a2dismod mpm_event mpm_worker 2>/dev/null || true
rm -f /etc/apache2/mods-enabled/mpm_event.load \
      /etc/apache2/mods-enabled/mpm_event.conf \
      /etc/apache2/mods-enabled/mpm_worker.load \
      /etc/apache2/mods-enabled/mpm_worker.conf
a2enmod mpm_prefork 2>/dev/null || true

# Railway injects PORT; stock Apache listens on 80.
if [ -n "${PORT:-}" ] && [ "${PORT}" != "80" ]; then
    echo "[setup] Binding Apache to PORT=${PORT}"
    if [ -f /etc/apache2/ports.conf ]; then
        sed -i "s/^Listen 80/Listen ${PORT}/" /etc/apache2/ports.conf
    fi
    if [ -f /etc/apache2/sites-available/000-default.conf ]; then
        sed -i "s/:80>/:${PORT}>/" /etc/apache2/sites-available/000-default.conf
    fi
fi

# Copy plugin and theme from staging to WordPress (after volume is mounted)
copy_custom_files() {
    echo "[setup] Waiting for WordPress files..."

    # Wait for WordPress core to be extracted (with timeout)
    local elapsed=0
    local timeout=120
    while [ ! -d /var/www/html/wp-content/plugins ]; do
        if [ "$elapsed" -ge "$timeout" ]; then
            echo "[setup] ERROR: Timed out waiting for /var/www/html/wp-content/plugins after ${timeout}s" >&2
            return 1
        fi
        sleep 2
        elapsed=$((elapsed + 2))
    done

    # Copy plugin if not already present (idempotent — image updates don't overwrite volume)
    if [ ! -d /var/www/html/wp-content/plugins/next-revalidate ]; then
        echo "[setup] Installing next-revalidate plugin..."
        cp -r /usr/src/next-revalidate /var/www/html/wp-content/plugins/
        chown -R www-data:www-data /var/www/html/wp-content/plugins/next-revalidate
    else
        echo "[setup] next-revalidate plugin already present, skipping"
    fi

    # Copy theme if not already present
    if [ ! -d /var/www/html/wp-content/themes/nextjs-headless ]; then
        echo "[setup] Installing nextjs-headless theme..."
        cp -r /usr/src/nextjs-headless /var/www/html/wp-content/themes/
        chown -R www-data:www-data /var/www/html/wp-content/themes/nextjs-headless
    else
        echo "[setup] nextjs-headless theme already present, skipping"
    fi

    # Create robots.txt to block crawlers (Next.js is the public site) — only if missing
    if [ ! -f /var/www/html/robots.txt ]; then
        echo "[setup] Creating robots.txt..."
        cat > /var/www/html/robots.txt << 'EOF'
User-agent: *
Disallow: /
EOF
        chown www-data:www-data /var/www/html/robots.txt
    fi

    # Run the setup script
    echo "[setup] Running WordPress setup..."
    if ! /usr/local/bin/setup-wordpress.sh; then
        echo "[setup] WARNING: WordPress setup failed" >&2
    fi
}

# Run copy and setup in background after a delay for volume mount
(sleep 10 && copy_custom_files) &

# Run the original WordPress entrypoint
exec docker-entrypoint.sh "$@"
