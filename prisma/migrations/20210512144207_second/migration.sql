/*
  Warnings:

  - You are about to alter the column `updatedAt` on the `post` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `birthday` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `description` TEXT NOT NULL,
    MODIFY `updatedAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `birthday` DATETIME NOT NULL,
    MODIFY `updatedAt` TIMESTAMP NOT NULL;
