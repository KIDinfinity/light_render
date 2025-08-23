FROM nginx:alpine-perl
RUN rm -rf /usr/share/nginx/html/*
COPY dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx
ENV ELASTIC_API_HOST="localhost"
ENV ELASTIC_API_PORT="9200"
ENV BU_RECORD_URL="localhost"
ENV BU_ENROLL_URL="localhost"
ENV X_API_KEY="KIvXQnqpgAFoiHRSG2O0femx"
ENTRYPOINT envsubst '$NGINX_HOST $NGINX_PORT  $ELASTIC_API_HOST $ELASTIC_API_PORT $BU_RECORD_URL $BU_ENROLL_URL   $X_API_KEY'   < /etc/nginx/nginx.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'







