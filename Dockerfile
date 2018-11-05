FROM ahmadnassri/build-essential
LABEL name="imagemin-build"
LABEL description="Node Build Image for metalsmith-imagemin"
LABEL maintainer="Ahmad Nassri <email@ahmadnassri.com>"

USER root

RUN apk add --update --no-cache zlib-dev nasm autoconf automake libtool libjpeg-turbo libjpeg-turbo-dev

USER node
