/*
  Warnings:

  - Added the required column `account_Number` to the `Accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accounts" ADD COLUMN     "account_Number" INTEGER NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL;
