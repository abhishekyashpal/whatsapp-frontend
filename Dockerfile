FROM node:19-alpine3.15

WORKDIR /whatsapp-frontend

COPY . /whatsapp-frontend
RUN npm install

EXPOSE 3000
CMD ["npm","run","dev"]