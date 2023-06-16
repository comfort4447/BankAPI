/*
  Warnings:

  - Changed the type of `receiver` on the `Transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "receiver",
ADD COLUMN     "receiver" INTEGER NOT NULL;
