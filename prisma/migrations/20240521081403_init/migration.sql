-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'email',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NoteGroup" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "NoteGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vocabulary" (
    "id" SERIAL NOT NULL,
    "spelling" TEXT NOT NULL,
    "zh" TEXT NOT NULL,
    "pronunciation" TEXT NOT NULL,
    "definitionMissCount" INTEGER NOT NULL,
    "spellMissCount" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "noteGroupIds" INTEGER[],

    CONSTRAINT "Vocabulary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Example" (
    "id" SERIAL NOT NULL,
    "definition" TEXT NOT NULL,
    "vocabularyId" INTEGER NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sentence" (
    "id" SERIAL NOT NULL,
    "en" TEXT NOT NULL,
    "exampleId" INTEGER NOT NULL,

    CONSTRAINT "Sentence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NoteGroupToVocabulary" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vocabulary_userId_key" ON "Vocabulary"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Example_vocabularyId_key" ON "Example"("vocabularyId");

-- CreateIndex
CREATE UNIQUE INDEX "Sentence_exampleId_key" ON "Sentence"("exampleId");

-- CreateIndex
CREATE UNIQUE INDEX "_NoteGroupToVocabulary_AB_unique" ON "_NoteGroupToVocabulary"("A", "B");

-- CreateIndex
CREATE INDEX "_NoteGroupToVocabulary_B_index" ON "_NoteGroupToVocabulary"("B");

-- AddForeignKey
ALTER TABLE "Vocabulary" ADD CONSTRAINT "Vocabulary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_vocabularyId_fkey" FOREIGN KEY ("vocabularyId") REFERENCES "Vocabulary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_exampleId_fkey" FOREIGN KEY ("exampleId") REFERENCES "Example"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NoteGroupToVocabulary" ADD CONSTRAINT "_NoteGroupToVocabulary_A_fkey" FOREIGN KEY ("A") REFERENCES "NoteGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NoteGroupToVocabulary" ADD CONSTRAINT "_NoteGroupToVocabulary_B_fkey" FOREIGN KEY ("B") REFERENCES "Vocabulary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
