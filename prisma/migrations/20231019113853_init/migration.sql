-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ORDINARY_USER', 'ADMIN', 'SUPPORT', 'RESIDENT');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "telegramId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "registration_form_full_name" TEXT,
    "registration_form_contact_data" TEXT,
    "registration_form_password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'ORDINARY_USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
