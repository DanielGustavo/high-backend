FROM node:20.12.2-alpine3.18

WORKDIR /high

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

CMD ["sh", "init.sh"]
