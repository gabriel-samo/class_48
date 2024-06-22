FROM node:20.14.0-alpine

WORKDIR /usr/src/app

# Enable this if the docker container is taking too much CPU usage.
# ENV GENERATE_SOURCEMAP=false
# ENV NODE_OPTIONS=--max-old-space-size=16384
ENV PORT=8123
ENV HOST=localhost
ENV CAR_URL=https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=
ENV BIKE_URL=https://data.gov.il/api/3/action/datastore_search?resource_id=bf9df4e2-d90d-4c0a-a400-19e15af8e95f&q=
ENV TRUCK_URL=https://data.gov.il/api/3/action/datastore_search?resource_id=cd3acc5c-03c3-4c89-9c54-d40f93c0d790&q=
ENV HANDICAP_URL=https://data.gov.il/api/3/action/datastore_search?resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e&q=
ENV OFFROAD_URL=https://data.gov.il/api/3/action/datastore_search?resource_id=f6efe89a-fb3d-43a4-bb61-9bf12a9b9099&q=
ENV RECALL_URL=https://data.gov.il/api/3/action/datastore_search?resource_id=36bf1404-0be4-49d2-82dc-2f1ead4a8b93&q=
ENV JWT_SECRET=92f4afe3ff56de877615b805fee66aff8f27fae17c2f722d5489c7017b96a5053028a5610cb3c7a2effce988bcd67d1112a9a158042f0cb97a455b647b27330f
ENV JWT_EXPIRES=1h

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 8123 

CMD npm run dev