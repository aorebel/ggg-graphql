
FROM hayd/alpine-deno:1.0.0-rc2
WORKDIR /app

# These steps will be re-run upon each file change in your working directory:
COPY . ./

## Precache all dependencies
RUN ["deno" , "cache", "server.ts"]

# Added to ENTRYPOINT of base image.
CMD ["run", "--allow-env", "--allow-net", "--allow-read","--allow-write","--allow-plugin", "--allow-unstable", "server.ts"]