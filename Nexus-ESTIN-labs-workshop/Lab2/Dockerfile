FROM node:20

WORKDIR /usr/src/app

COPY ./challenge/package*.json ./

RUN npm install

COPY ./challenge/ ./

COPY flag.txt /
RUN FLAG_NAME=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 12)  && cp /flag.txt "/flag_${FLAG_NAME}_.txt" && rm /flag.txt

EXPOSE 3000

CMD ["npm", "start"]

#sudo docker build -t lab2-nexus .
#sudo docker run -p 3000:3000 lab2-nexus