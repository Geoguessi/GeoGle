FROM node:20-alpine As base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /usr/app

FROM base As deps

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm install --frozen-lockfile

FROM base As builder

COPY --from=deps --chown=nextjs:nodejs /usr/app/node_modules ./node_modules
COPY . .

RUN pnpm run build

FROM node:20-alpine As runner

WORKDIR /usr/app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN mkdir .next
RUN chown nextjs:nodejs .next

USER nextjs

COPY --chown=nextjs:nodejs --from=builder /usr/app/node_modules ./node_modules
COPY --chown=nextjs:nodejs --from=builder /usr/app/.next/standalone ./
COPY --chown=nextjs:nodejs --from=builder /usr/app/.next/static ./.next/static

EXPOSE 3000

CMD [ "node", "server.js" ]