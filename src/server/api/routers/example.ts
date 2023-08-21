import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { exampleRepository } from "../repositories";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      return exampleRepository.create({ ...input });
    }),

  update: publicProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(({ input }) => {
      return exampleRepository.update(input.id, { ...input });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      return exampleRepository.delete(input.id);
    }),

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return exampleRepository.getOne(input.id);
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
