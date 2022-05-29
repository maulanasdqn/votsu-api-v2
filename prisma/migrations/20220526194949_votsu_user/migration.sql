-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "departement" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "is_chosen" BOOLEAN NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "role_name" TEXT,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_student_id_unique_constraint" ON "user"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_unique_constraint" ON "user"("email");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
