import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { exampleRepository } from "../repositories";
import { Example } from "../DTOs";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure.input(Example.hello).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  create: publicProcedure.input(Example.create).mutation(({ input }) => {
    return exampleRepository.create({ ...input });
  }),

  update: publicProcedure.input(Example.update).mutation(({ input }) => {
    return exampleRepository.update(input.id, { ...input });
  }),

  delete: publicProcedure.input(Example.id).mutation(({ input }) => {
    return exampleRepository.delete(input.id);
  }),

  getOne: publicProcedure.input(Example.id).query(({ input }) => {
    return exampleRepository.getOne(input.id);
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
