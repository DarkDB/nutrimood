import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  const args = process.argv.slice(2);
  const emailArg = args.find((a) => a.startsWith("--email="));
  const passwordArg = args.find((a) => a.startsWith("--password="));

  if (!emailArg || !passwordArg) {
    console.error("Usage: npx tsx scripts/create-admin.ts --email=<email> --password=<password>");
    process.exit(1);
  }

  const email = emailArg.split("=")[1];
  const password = passwordArg.split("=")[1];

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await db.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  console.log(`Admin creado/actualizado: ${admin.email}`);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
