DROP TABLE `permissions`;--> statement-breakpoint
ALTER TABLE `roles` DROP INDEX `roles_title_unique`;--> statement-breakpoint
ALTER TABLE `roles` MODIFY COLUMN `title` varchar(100);--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `createdAt` datetime;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `updatedAt` datetime;--> statement-breakpoint
ALTER TABLE `roles` ADD `user_id` varchar(100);