-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "telegramId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "registration_form_full_name" TEXT,
    "registration_form_login" TEXT,
    "registration_form_password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'ORDINARY USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
