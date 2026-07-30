FROM node:20-alpine

WORKDIR /app
COPY index.html server.js ./

EXPOSE 8080
ENV PORT=8080

CMD ["node", "server.js"]
