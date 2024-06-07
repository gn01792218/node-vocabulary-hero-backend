import { PrismaClient } from "@prisma/client";
import {
  CreateNoteRequest,
  UpdateNoteRequest,
  UpdateNoteVocabularysRequest,
} from "../types/note";
const prisma = new PrismaClient();
export default class NoteGroupRepository {
  constructor() {}
  async createByUser(userId: number, payload: CreateNoteRequest) {
    const note = await prisma.note.create({
      data: {
        title: payload.title,
        description: payload.description,
        userId,
      },
    });
    return note;
  }
  async update(id: number, payload: UpdateNoteRequest) {
    const note = await prisma.note.update({
      where: {
        id,
      },
      data: {
        title: payload.title || undefined,
        description: payload.description || undefined,
      },
    });
    return note;
  }
  async updateVocabularys(id: number, payload: UpdateNoteVocabularysRequest) {
    const note = await prisma.note.update({
      where: {
        id,
      },
      data: {
        vocabularys: {
          set: payload.vocabularys_id.map((id) => ({ id })),
        },
      },
      include: {
        vocabularys: {
          include: { examples: { include: { sentences: true } } },
        },
      },
    });
    return note;
  }
  async delete(id: number) {
    try {
      const deletenote = await prisma.note.delete({
        where: { id },
      });
      return deletenote;
    } catch (error) {
      return console.log(error);
    }
  }
  async getAllIncludeVocabularyAndExample() {
    return await prisma.note.findMany({
      include: { vocabularys: { include: { examples: true } } },
    });
  }
  async getByIdIncludeAllData(id: number) {
    const note = await prisma.note.findUnique({
      where: { id },
      include: {
        vocabularys: {
          include: { examples: { include: { sentences: true } }, notes:true },
        },
      },
    });
    if (!note) return null;
    return note;
  }
  async getById(id: number) {
    const note = await prisma.note.findUnique({
      where: { id },
    });
    if (!note) return null;
    return note;
  }
}
