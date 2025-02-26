FROM node:14

WORKDIR /app

COPY ./challenge/package*.json ./

RUN npm install

COPY ./challenge .

RUN npm run build

FROM nginx:alpine

COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

#sudo docker build -t lab3-nexus .
#sudo docker run -p 8082:80 lab3-nexus