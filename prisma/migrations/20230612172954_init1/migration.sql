/*
  Warnings:

  - You are about to drop the column `userId` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `account` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `pin` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `signOut` on the `users` table. All the data in the column will be lost.
  - Added the required column `AccountId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_userId_fkey";

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "userId",
ADD COLUMN     "AccountId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "account",
DROP COLUMN "pin",
DROP COLUMN "signOut";

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_AccountId_fkey" FOREIGN KEY ("AccountId") REFERENCES "Accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
