

FROM node:16-alpine AS ui-build
WORKDIR /usr/src
COPY frontend/ ./frontend/
RUN cd frontend && npm install && npm run build

FROM node:16-alpine AS api-build
WORKDIR /usr/src
COPY backend/ ./backend/
RUN cd backend && npm install && ENVIROMENT=production npm run build
RUN ls

FROM node:16-alpine 
WORKDIR /root/
COPY --from=ui-build /usr/src/frontend/build ./frontend/build
COPY --from=api-build /usr/src/backend/dist .

EXPOSE 5000
CMD ["node", "bundle.js"]