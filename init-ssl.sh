#!/bin/bash
# ============================================================
# PetPals Shop — Script khởi tạo SSL lần đầu
# Chạy trên VPS sau khi đã trỏ domain về IP server
# Usage: chmod +x init-ssl.sh && ./init-ssl.sh
# ============================================================

# ─── CẤU HÌNH ──────────────────────────────────────────────
DOMAIN="YOUR_DOMAIN.COM"          # ← Thay bằng domain thực
EMAIL="your-email@example.com"    # ← Thay bằng email thực
# ────────────────────────────────────────────────────────────

set -e

echo "🐾 PetPals SSL Setup"
echo "Domain: $DOMAIN"
echo "Email:  $EMAIL"
echo ""

# 1. Tạo thư mục
mkdir -p nginx/certbot/conf nginx/certbot/www

# 2. Tạo Nginx config tạm (chỉ HTTP, cho Certbot challenge)
cat > nginx/default.conf.tmp << 'EOF'
server {
    listen 80;
    server_name DOMAIN_PLACEHOLDER;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 200 'PetPals is setting up SSL...';
        add_header Content-Type text/plain;
    }
}
EOF
sed -i "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" nginx/default.conf.tmp

# 3. Backup Nginx config gốc, dùng config tạm
cp nginx/default.conf nginx/default.conf.bak
cp nginx/default.conf.tmp nginx/default.conf

# 4. Chạy Nginx (chỉ HTTP)
echo "📦 Starting Nginx (HTTP only)..."
docker compose up -d nginx

# 5. Xin SSL certificate
echo "🔐 Requesting SSL certificate..."
docker compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    -d "$DOMAIN"

# 6. Khôi phục Nginx config đầy đủ (HTTPS)
echo "🔄 Restoring full Nginx config..."
cp nginx/default.conf.bak nginx/default.conf
rm nginx/default.conf.tmp nginx/default.conf.bak

# 7. Thay domain trong config
sed -i "s/YOUR_DOMAIN.COM/$DOMAIN/g" nginx/default.conf

# 8. Restart tất cả services
echo "🚀 Starting all services..."
docker compose up -d

echo ""
echo "✅ Done! PetPals Shop is live at https://$DOMAIN"
echo ""
echo "📋 Useful commands:"
echo "  docker compose logs -f        # Xem logs"
echo "  docker compose ps             # Xem trạng thái"
echo "  docker compose down           # Dừng services"
echo "  docker compose up -d --build  # Rebuild & restart"
