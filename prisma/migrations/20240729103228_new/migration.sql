/*
  Warnings:

  - Added the required column `role` to the `register_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "register_user" ADD COLUMN     "role" TEXT NOT NULL;
