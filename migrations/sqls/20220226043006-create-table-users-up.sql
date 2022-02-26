CREATE TABLE IF NOT EXISTS users (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `salt` TEXT NOT NULL,
    `password` TEXT NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`)
);