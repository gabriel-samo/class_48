FROM node:20.14.0-alpine

WORKDIR /usr/src/app

# Enable this if the docker container is taking too much CPU usage.
# ENV GENERATE_SOURCEMAP=false
# ENV NODE_OPTIONS=--max-old-space-size=16384

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 8123 

CMD npm run dev