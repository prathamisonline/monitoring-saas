import prisma from './src/lib/db';

async function main() {
  const projects = await prisma.project.findMany();
  console.log(projects);
}

main();
