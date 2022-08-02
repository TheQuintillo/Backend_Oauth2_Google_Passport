-- CreateEnum
CREATE TYPE "color" AS ENUM ('Red', 'Green', 'Blue');

-- CreateEnum
CREATE TYPE "size" AS ENUM ('Small', 'Medium', 'Large', 'XLarge');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photos" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT[],
    "price" DOUBLE PRECISION NOT NULL,
    "colors" "color"[],
    "sizes" "size"[],
    "photos" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" SERIAL NOT NULL,
    "color" "color" NOT NULL,
    "size" "size" NOT NULL,
    "shippingaddress" TEXT[],
    "billingaddress" TEXT[],
    "usuario" INTEGER NOT NULL,
    "producto" INTEGER NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_usuario_fkey" FOREIGN KEY ("usuario") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_producto_fkey" FOREIGN KEY ("producto") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
