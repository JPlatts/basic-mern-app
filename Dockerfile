FROM node:18-alpine3.15

RUN mkdir -p /home/app

COPY . /home/app

# set default dir so that next commands executes in /home/app dir
WORKDIR /home/app/client

RUN npm install

RUN npm run build

# set default dir so that next commands executes in /home/app dir
WORKDIR /home/app

# will execute npm install in /home/app because of WORKDIR
RUN npm install


# no need for /home/app/server.js because of WORKDIR
CMD ["node", "server.js"]

