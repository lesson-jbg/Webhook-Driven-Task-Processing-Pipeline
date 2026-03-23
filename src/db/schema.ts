import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  integer,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const pipelines = pgTable('pipelines', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  webhookPath: text('webhook_path').notNull().unique(),
  actionType: text('action_type').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const subscribers = pgTable('subscribers', {
  id: uuid('id').defaultRandom().primaryKey(),
  pipelineId: uuid('pipeline_id')
    .notNull()
    .references(() => pipelines.id, { onDelete: 'cascade' }),
  callbackUrl: text('callback_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const jobs = pgTable('jobs', {
  id: uuid('id').defaultRandom().primaryKey(),
  pipelineId: uuid('pipeline_id')
    .notNull()
    .references(() => pipelines.id, { onDelete: 'cascade' }),
  payload: jsonb('payload').notNull(),
  status: text('status').notNull().default('pending'),
  processedPayload: jsonb('processed_payload'),
  errorMessage: text('error_message'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const deliveries = pgTable('deliveries', {
  id: uuid('id').defaultRandom().primaryKey(),
  jobId: uuid('job_id')
    .notNull()
    .references(() => jobs.id, { onDelete: 'cascade' }),
  subscriberId: uuid('subscriber_id')
    .notNull()
    .references(() => subscribers.id, { onDelete: 'cascade' }),
  status: text('status').notNull().default('pending'),
  attemptCount: integer('attempt_count').notNull().default(0),
  lastError: text('last_error'),
  lastAttemptAt: timestamp('last_attempt_at'),
  deliveredAt: timestamp('delivered_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const pipelinesRelations = relations(pipelines, ({ many }) => ({
  subscribers: many(subscribers),
  jobs: many(jobs),
}));

export const subscribersRelations = relations(subscribers, ({ one, many }) => ({
  pipeline: one(pipelines, {
    fields: [subscribers.pipelineId],
    references: [pipelines.id],
  }),
  deliveries: many(deliveries),
}));

export const jobsRelations = relations(jobs, ({ one, many }) => ({
  pipeline: one(pipelines, {
    fields: [jobs.pipelineId],
    references: [pipelines.id],
  }),
  deliveries: many(deliveries),
}));

export const deliveriesRelations = relations(deliveries, ({ one }) => ({
  job: one(jobs, {
    fields: [deliveries.jobId],
    references: [jobs.id],
  }),
  subscriber: one(subscribers, {
    fields: [deliveries.subscriberId],
    references: [subscribers.id],
  }),
}));
