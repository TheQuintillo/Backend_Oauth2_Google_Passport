-- DropForeignKey
ALTER TABLE "pedidos" DROP CONSTRAINT "pedidos_producto_fkey";

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_producto_fkey" FOREIGN KEY ("producto") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
