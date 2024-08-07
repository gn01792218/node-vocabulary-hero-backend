import {
  TestPaperCreateRequest,
  TestPaperUpdateRequest,
  UpdateTestPaperMCQsRequest,
} from "../types/testPaper";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default class testPaperRepository {
  constructor() {}
  async add(user_id: number, payload: TestPaperCreateRequest) {
    const data = await prisma.testPaper.create({
      data: {
        ...payload,
        user_id,
      },
    });
    return data;
  }
  async update(id: number, payload: TestPaperUpdateRequest) {
    const data = await prisma.testPaper.update({
      where: {
        id,
      },
      data: payload,
    });
    return data;
  }
  async updateMCQs(id: number, payload: UpdateTestPaperMCQsRequest) {
    const data = await prisma.testPaper.update({
      where: {
        id,
      },
      data: {
        MCQs: {
          set: payload.ids.map((id) => ({ id })),
        },
      },
      include: {
        MCQs: {
          include: { options: true },
        },
      },
    });
    return data;
  }
  async delete(id: number) {
    const deleteData = await prisma.testPaper.delete({
      where: { id },
    });
    return deleteData;
  }
  async getAll() {
    return await prisma.testPaper.findMany({
      include: { MCQs: { include: { options: true } } },
    });
  }
  async getById(id: number) {
    const data = await prisma.testPaper.findUnique({
      where: { id },
      include: { MCQs: { include: { options: true } } },
    });
    if (!data) return null;
    return data;
  }
}
