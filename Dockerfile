FROM kkarczmarczyk/node-yarn
MAINTAINER zhangyuan
ADD . /app/
WORKDIR /app
RUN yarn
ENV NODE_ENV production
EXPOSE 8084
CMD sleep 3s
CMD node index.js
