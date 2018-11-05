FROM ahmadnassri:build-essential
LABEL name="imagemin-build"
LABEL description="Node Build Image for metalsmith-imagemin"
LABEL maintainer="Ahmad Nassri <email@ahmadnassri.com>"

RUN apk add --update --no-cache zlib nasm
