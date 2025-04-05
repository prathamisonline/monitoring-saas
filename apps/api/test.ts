// test.ts or inside an API route
import prisma from './lib/db';

async function main() {
  const projects = await prisma.project.findMany();
  console.log(projects);
}

main();
