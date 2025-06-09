import { initTRPC, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { ZodError } from "zod";

type Context = Awaited<ReturnType<typeof createContext>>;

export async function createContext(
  opts: trpcExpress.CreateExpressContextOptions
) {
  const context = {
    req: opts.req,
    res: opts.res,
    user: null,
    accessToken: null,
  };

  const authHeader = opts.req.headers.authorization;

  if (!authHeader) {
    return context;
  }

  return context;
}

export const t = initTRPC.context<Context>().create({
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

// Create protected procedure
const authMiddleware = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated",
    });
  }

  return next({
    ctx: {
      ...ctx,
      // Ready to be used in procedures
      user: null,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(authMiddleware);
