FROM node:14.10.0

RUN ln -sf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime

RUN echo "America/Sao_Paulo" > /etc/timezone

WORKDIR /mei-associate

COPY microservices/mei-associate/package.json /mei-associate

RUN yarn install

COPY microservices/mei-associate /mei-associate

COPY .env /mei-associate/.env

EXPOSE 3000

EXPOSE 9229

CMD [ "yarn", "debug" ]
