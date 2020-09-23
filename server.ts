import { Application } from "./config/deps.ts";
import { GraphQLService } from "./graphql/schema.ts";

const app = new Application();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

const port = 8080;
console.log(`Server started on http://localhost:${port}`);
await app.listen({ port });
