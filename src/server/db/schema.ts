import { relations, sql } from "drizzle-orm";
import { index, mysqlTableCreator, primaryKey } from "drizzle-orm/mysql-core";
import { type AdapterAccount } from "next-auth/adapters";
import {
  boolean,
  datetime,
  int,
  json,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator((name) => `js_lms_${name}`);

export const posts = createTable(
  "post",
  (d) => ({
    id: d.bigint({ mode: "number" }).primaryKey().autoincrement(),
    name: d.varchar({ length: 256 }),
    createdById: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: d
      .timestamp()
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp().onUpdateNow(),
  }),
  (t) => [
    index("created_by_idx").on(t.createdById),
    index("name_idx").on(t.name),
  ],
);

export const users = createTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  image: varchar("image", { length: 255 }),
  bio: text("bio"),
  role: varchar("role", { length: 50 }).default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  connections: many(userConnections),
  postedJobs: many(jobs),
  jobApplications: many(jobApplications),
  createdCourses: many(courses),
  courseEnrollments: many(courseEnrollments),
}));

export const accounts = createTable(
  "account",
  (d) => ({
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
    type: d.varchar({ length: 255 }).$type<AdapterAccount["type"]>().notNull(),
    provider: d.varchar({ length: 255 }).notNull(),
    providerAccountId: d.varchar({ length: 255 }).notNull(),
    refresh_token: d.text(),
    access_token: d.text(),
    expires_at: d.int(),
    token_type: d.varchar({ length: 255 }),
    scope: d.varchar({ length: 255 }),
    id_token: d.text(),
    session_state: d.varchar({ length: 255 }),
  }),
  (t) => [
    primaryKey({
      columns: [t.provider, t.providerAccountId],
    }),
    index("account_user_id_idx").on(t.userId),
  ],
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  (d) => ({
    sessionToken: d.varchar({ length: 255 }).notNull().primaryKey(),
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
    expires: d.timestamp({ mode: "date" }).notNull(),
  }),
  (t) => [index("session_user_id_idx").on(t.userId)],
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  (d) => ({
    identifier: d.varchar({ length: 255 }).notNull(),
    token: d.varchar({ length: 255 }).notNull(),
    expires: d.timestamp({ mode: "date" }).notNull(),
  }),
  (t) => [primaryKey({ columns: [t.identifier, t.token] })],
);

export const userConnections = createTable("user_connections", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  connectedUserId: varchar("connected_user_id", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const jobs = createTable("jobs", {
  id: varchar("id", { length: 255 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }),
  type: varchar("type", { length: 50 }),
  salary: varchar("salary", { length: 100 }),
  requirements: json("requirements"),
  postedBy: varchar("posted_by", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});

export const jobApplications = createTable("job_applications", {
  id: varchar("id", { length: 255 }).primaryKey(),
  jobId: varchar("job_id", { length: 255 }).notNull(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).default("pending"),
  coverLetter: text("cover_letter"),
  resumeUrl: varchar("resume_url", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});

export const jobsRelations = relations(jobs, ({ one, many }) => ({
  postedBy: one(users, {
    fields: [jobs.postedBy],
    references: [users.id],
  }),
  applications: many(jobApplications),
}));

export const courses = createTable("courses", {
  id: varchar("id", { length: 255 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  instructorId: varchar("instructor_id", { length: 255 }).notNull(),
  price: int("price").default(0),
  duration: varchar("duration", { length: 100 }),
  level: varchar("level", { length: 50 }),
  category: varchar("category", { length: 100 }),
  thumbnailUrl: varchar("thumbnail_url", { length: 255 }),
  isPublished: boolean("is_published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});

export const courseEnrollments = createTable("course_enrollments", {
  id: varchar("id", { length: 255 }).primaryKey(),
  courseId: varchar("course_id", { length: 255 }).notNull(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  progress: int("progress").default(0),
  status: varchar("status", { length: 50 }).default("enrolled"),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  completedAt: datetime("completed_at"),
});

export const courseModules = createTable("course_modules", {
  id: varchar("id", { length: 255 }).primaryKey(),
  courseId: varchar("course_id", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  order: int("order").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});

export const courseLessons = createTable("course_lessons", {
  id: varchar("id", { length: 255 }).primaryKey(),
  moduleId: varchar("module_id", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  videoUrl: varchar("video_url", { length: 255 }),
  duration: int("duration"),
  order: int("order").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});

export const coursesRelations = relations(courses, ({ one, many }) => ({
  instructor: one(users, {
    fields: [courses.instructorId],
    references: [users.id],
  }),
  modules: many(courseModules),
  enrollments: many(courseEnrollments),
}));
