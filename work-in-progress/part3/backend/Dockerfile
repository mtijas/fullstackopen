FROM debian:bullseye-slim

EXPOSE 3001

WORKDIR /app

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y npm nodejs

RUN useradd -ms /bin/bash appuser

COPY . ./

RUN chown -R appuser:appuser /app

USER appuser
RUN npm install

CMD ["npm", "run", "start"]
