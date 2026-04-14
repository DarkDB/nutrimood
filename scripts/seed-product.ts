import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  const product = await db.product.upsert({
    where: { slug: "moodcalm" },
    update: {},
    create: {
      name: "MoodCalm",
      slug: "moodcalm",
      description:
        "Suplemento en polvo con KSM-66 Ashwagandha, L-Theanine y Magnesio Glicinato para el control del estrés.",
      price: 3200, // €32.00 en céntimos
      stock: 100,
      lowStockAlert: 20,
      active: true,
    },
  });

  console.log("Producto creado/actualizado:", product.name, `(€${product.price / 100})`);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
