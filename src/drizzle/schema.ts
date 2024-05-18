import { relations } from 'drizzle-orm';
import { integer, real, sqliteTable, text, unique, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const UserTable = sqliteTable(
  'user',
  {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    age: integer('age'),
    email: text('email').notNull(),
    role: text('role', { enum: ['ADMIN', 'BASIC'] })
      .notNull()
      .$type<'ADMIN' | 'BASIC'>(),
  },
  (table) => {
    return {
      emailIndex: uniqueIndex('emailIndex').on(table.email),
      uniqueNameAndAge: unique('uniqueNameAndAge').on(table.name, table.age),
    };
  },
);

export const UserPreferencesTable = sqliteTable('userPreferences', {
  id: integer('id').primaryKey(),
  emailUpdates: integer('emailUpdates', { mode: 'boolean' }).notNull(),
  userId: integer('userId')
    .notNull()
    .references(() => UserTable.id),
});

export const PostTable = sqliteTable('post', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  averageRating: real('averageRating').notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp' }),
  updatedAt: integer('createdAt', { mode: 'timestamp' }),
  authorId: integer('authorId')
    .notNull()
    .references(() => UserTable.id),
});

export const CategoryTable = sqliteTable('category', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
});

export const PostCategoryTable = sqliteTable('postCategory', {
  postId: integer('postId')
    .notNull()
    .references(() => PostTable.id),
  categoryId: integer('categoryId')
    .notNull()
    .references(() => CategoryTable.id),
});

// relations

export const UserTableRelations = relations(UserTable, ({ one, many }) => {
  return {
    preferences: one(UserPreferencesTable),
    posts: many(PostTable),
  };
});

export const UserPreferencesTableRelations = relations(UserPreferencesTable, ({ one }) => {
  return {
    user: one(UserTable, {
      fields: [UserPreferencesTable.userId],
      references: [UserTable.id],
    }),
  };
});

export const PostTableRelations = relations(PostTable, ({ one, many }) => {
  return {
    author: one(UserTable, {
      fields: [PostTable.authorId],
      references: [UserTable.id],
    }),
    postCategories: many(PostCategoryTable),
  };
});

export const CategoryTableRelations = relations(CategoryTable, ({ many }) => {
  return {
    posts: many(PostCategoryTable),
  };
});

export const PostCategoryTableRelations = relations(PostCategoryTable, ({ one }) => {
  return {
    post: one(PostTable, {
      fields: [PostCategoryTable.postId],
      references: [PostTable.id],
    }),
    category: one(CategoryTable, {
      fields: [PostCategoryTable.categoryId],
      references: [CategoryTable.id],
    }),
  };
});
