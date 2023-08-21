import { prisma } from "@/server/db";
import { Prisma } from "@prisma/client";

class ExampleRepository {
  async create(data: Prisma.ExampleCreateInput) {
    const example = await prisma.example.create({
      data,
    });
    return example;
  }

  async getAll() {
    const examples = await prisma.example.findMany();
    return examples;
  }

  async getOne(id: string) {
    const example = await prisma.example.findUnique({
      where: { id },
    });
    return example;
  }

  async update(id: string, data: Prisma.ExampleUpdateInput) {
    const example = await prisma.example.update({
      where: { id },
      data,
    });
    return example;
  }

  async delete(id: string) {
    const example = await prisma.example.delete({
      where: { id },
    });
    return example;
  }
}

export const exampleRepository = new ExampleRepository();
