/*
  Warnings:

  - You are about to drop the column `fullName` on the `Accounts` table. All the data in the column will be lost.
  - Added the required column `AccountName` to the `Accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accounts" DROP COLUMN "fullName",
ADD COLUMN     "AccountName" TEXT NOT NULL;
