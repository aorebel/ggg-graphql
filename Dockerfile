
FROM hayd/alpine-deno:1.3.0-rc2
WORKDIR /app

# These steps will be re-run upon each file change in your working directory:
COPY . ./

# Added to ENTRYPOINT of base image.
CMD ["run", "--allow-env", "--allow-net", "--allow-read","--allow-write","--allow-plugin", "--allow-unstable", "main.ts"]