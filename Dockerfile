# Build jest wykonywany LOKALNIE (`npm run build`), obraz tylko serwuje ./build.
# Dzięki temu serwer nie musi odpalać react-scripts (duże zużycie RAM).
FROM node:22-alpine

WORKDIR /app

RUN npm install -g serve

COPY build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
