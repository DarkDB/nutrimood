import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  // Admin user
  const email = process.env.ADMIN_EMAIL ?? "admin@nutrimood.es";
  const password = process.env.ADMIN_PASSWORD ?? "changeme123";
  const passwordHash = await bcrypt.hash(password, 12);

  await db.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  console.log(`✓ Admin creado: ${email}`);

  // Producto MoodCalm
  await db.product.upsert({
    where: { slug: "moodcalm" },
    update: {},
    create: {
      name: "MoodCalm",
      slug: "moodcalm",
      price: 3200,
      stock: 150,
      active: true,
      description: "300 mg KSM-66® Ashwagandha · 400 mg L-Theanine · 100 mg Magnesio Glicinato · 1000 UI Vitamina D3",
    },
  });

  console.log("✓ Producto MoodCalm creado");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
