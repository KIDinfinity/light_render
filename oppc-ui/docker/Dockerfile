FROM nginx:alpine-perl

RUN rm -rf /usr/share/nginx/html/*

RUN apk update && apk add --no-cache \
        shadow   \
        acl      \
        sudo     \
        libcap

RUN mkdir -p /var/run/nginx /var/cache/nginx /var/log/nginx /run && \
    chmod 755 /var/run/nginx /var/cache/nginx /var/log/nginx /run

# 复制构建产物到nginx
COPY --chown=appuser:appuser dist /usr/share/nginx/html
COPY --chown=appuser:appuser nginx.conf.template /etc/nginx

RUN useradd -m -d /home/appuser -s /bin/sh appuser && \
    echo "appuser:owb@123!" | chpasswd && \
    chown -R appuser:appuser /usr/share/nginx /etc/nginx /var/log/nginx /var/run/nginx /var/cache/nginx /run && \
    setfacl -R -m u:appuser:rwx /etc/nginx /var/log/nginx /var/run/nginx /var/cache/nginx /run && \
    setfacl -R -d -m u:appuser:rwx /etc/nginx /var/log/nginx /var/run/nginx /var/cache/nginx /run && \
    setfacl -R -m g:appuser:rwx /etc/nginx /var/log/nginx /var/run/nginx /var/cache/nginx /run && \
    setfacl -R -d -m g:appuser:rwx /etc/nginx /var/run/nginx /var/cache/nginx /run && \
    setfacl -R -m o:rx /etc/nginx /var/log/nginx /var/run/nginx /var/cache/nginx /run && \
    setfacl -R -d -m o:rx /etc/nginx /var/log/nginx /var/run/nginx /var/cache/nginx /run && \
    echo "appuser ALL=(ALL) ALL" >> /etc/sudoers.d/appuser && \
    chmod 0440 /etc/sudoers.d/appuser && \
    chown root:root /usr/bin/sudo && \
    chmod 4755 /usr/bin/sudo && \
    setcap 'cap_net_bind_service=+ep' /usr/sbin/nginx && \
    getcap /usr/sbin/nginx

ENV ELASTIC_API_HOST="localhost"
ENV ELASTIC_API_PORT="9200"
ENV BU_RECORD_URL="localhost"
ENV BU_ENROLL_URL="localhost"
ENV X_API_KEY="KIvXQnqpgAFoiHRSG2O0femx"

USER appuser

ENTRYPOINT envsubst '$NGINX_HOST $NGINX_PORT $ELASTIC_API_HOST $ELASTIC_API_PORT $BU_RECORD_URL $BU_ENROLL_URL $X_API_KEY' < /etc/nginx/nginx.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'