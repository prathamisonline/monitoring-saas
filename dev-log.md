## ✅ Day 1 - Set Up User & Project Schema

- Set up PostgreSQL with Prisma and Supabase for my DevOps Monitoring SaaS.
- Defined core models: `User` and `Project`
  - Each user can own multiple projects (1:N relationship)
  - Each project has `name`, `description`, timestamps, and an `ownerId`
- This sets the foundation for everything:
  - All logs, metrics, alerts will be scoped to a project
  - Future: Invite teammates, manage integrations per project

```prisma
model User {
  id        String    @id @default(uuid())
  email     String    @unique
  projects  Project[]
}

model Project {
  id        String   @id @default(uuid())
  name      String
  owner     User     @relation(fields: [ownerId], references: [id])
  ownerId   String
}
