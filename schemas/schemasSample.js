// Important Command and Others
// Migration file (migrations/xxxxx_init/migration.sql) এর একদম শুরুতে এই line টা manually add করো: CREATE EXTENSION IF NOT EXISTS pgcrypto;

//Command
// npx prisma migrate dev --name .....
// npx prisma migrate reset
// npx prisma generate
// npx prisma studio
// npx prisma db push
//rm -rf node_modules/.prisma
//rm -rf node_modules/.prisma/client
//rm -rf prisma/migrations
//npx prisma migrate reset
//⚠️ Important: migrate reset করলে database এর সব existing data মুছে যাবে। Development এ এটা সমস্যা না, কিন্তু production এ কখনো করবে না।

/* model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  age       Int?
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")


  // Relations
  posts     Post[]
  profile   Profile?


  @@map("users")
}


model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  avatar String?


  // Foreign key
  userId Int     @unique @map("user_id")
  user   User    @relation(fields: [userId], references: [id], onDelete: Cascade)


  @@map("profiles")
}


model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now()) @map("created_at")


  // Foreign key
  authorId  Int      @map("author_id")
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)


  // Many-to-many with Category
  categories Category[]


  @@map("posts")
}


model Category {
  id    Int    @id @default(autoincrement())
  name  String @unique


  posts Post[]


  @@map("categories")
} aitay uuid kivabe use korbo */
