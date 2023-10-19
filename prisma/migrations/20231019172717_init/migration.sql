-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ORDINARY_USER', 'ADMIN', 'SUPPORT', 'RESIDENT');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Accepted', 'Declined');

-- CreateTable
CREATE TABLE "Application" (
    "application_id" SERIAL NOT NULL,
    "meeting_room_number" INTEGER NOT NULL,
    "booking_time" TIMESTAMP(3) NOT NULL,
    "status" "Status",
    "author_telegram_id" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("application_id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_author_telegram_id_fkey" FOREIGN KEY ("author_telegram_id") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;
