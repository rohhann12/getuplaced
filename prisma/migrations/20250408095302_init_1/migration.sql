-- CreateTable
CREATE TABLE "founders" (
    "email" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "ctoName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hits" INTEGER DEFAULT 2,
    "referalCode" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "founders_email_key" ON "founders"("email");

-- CreateIndex
CREATE UNIQUE INDEX "founders_companyName_key" ON "founders"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "founders_ctoName_key" ON "founders"("ctoName");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_referalCode_key" ON "user"("referalCode");
