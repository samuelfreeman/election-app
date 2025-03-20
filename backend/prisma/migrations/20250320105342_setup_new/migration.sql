-- CreateTable
CREATE TABLE "voters" (
    "studentId" TEXT NOT NULL,
    "studentName" TEXT,
    "email" TEXT,
    "telephone" TEXT,
    "password" TEXT,
    "del_flg" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "voters_pkey" PRIMARY KEY ("studentId")
);

-- CreateTable
CREATE TABLE "positions" (
    "id" TEXT NOT NULL,
    "positionName" TEXT NOT NULL,
    "description" TEXT,
    "del_flg" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidates" (
    "id" TEXT NOT NULL,
    "candidateName" TEXT NOT NULL,
    "telephone" TEXT,
    "profile" TEXT,
    "positionId" TEXT,
    "del_flag" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voting" (
    "id" TEXT NOT NULL,
    "positionId" TEXT,
    "candidateId" TEXT,
    "voterId" TEXT,

    CONSTRAINT "voting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "voters_email_key" ON "voters"("email");

-- CreateIndex
CREATE UNIQUE INDEX "positions_positionName_key" ON "positions"("positionName");

-- CreateIndex
CREATE UNIQUE INDEX "candidates_candidateName_key" ON "candidates"("candidateName");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "positions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voting" ADD CONSTRAINT "voting_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "positions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voting" ADD CONSTRAINT "voting_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voting" ADD CONSTRAINT "voting_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "voters"("studentId") ON DELETE SET NULL ON UPDATE CASCADE;
