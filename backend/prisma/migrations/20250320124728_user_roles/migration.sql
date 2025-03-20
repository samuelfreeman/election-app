-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'ADMIN';

-- AlterTable
ALTER TABLE "voters" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';
