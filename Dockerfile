
FROM hayd/deno-docker:1.3.0
WORKDIR /app

# These steps will be re-run upon each file change in your working directory:
COPY . ./

## Precache all dependencies
RUN ["deno" , "cache", "main.ts"]

# Added to ENTRYPOINT of base image.
CMD ["run", "--allow-env", "--allow-net", "--allow-read","--allow-write","--allow-plugin", "--allow-unstable", "main.ts"]