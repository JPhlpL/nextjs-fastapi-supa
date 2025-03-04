CREATE TABLE `employees` (
	`id` char(36) NOT NULL,
	`employeeId` varchar(150) NOT NULL,
	`firstName` varchar(90) NOT NULL,
	`lastName` varchar(255) NOT NULL,
	`department` varchar(150) NOT NULL,
	`section` varchar(150) NOT NULL,
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime NOT NULL,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`),
	CONSTRAINT `employees_employeeId_unique` UNIQUE(`employeeId`)
);
--> statement-breakpoint
CREATE TABLE `permissions` (
	`id` char(36) NOT NULL,
	`description` varchar(100) NOT NULL,
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime NOT NULL,
	CONSTRAINT `permissions_id` PRIMARY KEY(`id`),
	CONSTRAINT `permissions_description_unique` UNIQUE(`description`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` char(36) NOT NULL,
	`title` varchar(100) NOT NULL,
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime NOT NULL,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `roles_title_unique` UNIQUE(`title`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(30) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `username` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `firstName` varchar(60) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `lastName` varchar(60) NOT NULL;