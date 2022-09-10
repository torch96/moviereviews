
FROM node:16-alpine
RUN npm install --global nodemon

WORKDIR /usr/src
COPY frontend/ ./frontend/
RUN cd frontend && npm install && npm run build

RUN cd ..


COPY backend/ ./backend/
RUN cd backend && npm install && npm install --global nodemon
RUN ls

WORKDIR /usr/src/backend
EXPOSE 5000
CMD ["npm", "run", "dev"]