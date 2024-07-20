/*
  Warnings:

  - You are about to drop the column `referee` on the `referee` table. All the data in the column will be lost.
  - Added the required column `referrer` to the `Referee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `referee` DROP COLUMN `referee`,
    ADD COLUMN `referrer` VARCHAR(191) NOT NULL;
