DROP DATABASE IF EXISTS `legos_db`;
CREATE DATABASE `legos_db`;
USE `legos_db`;
CREATE TABLE `legos` (
    `id` INTEGER(11) AUTO_INCREMENT NOT NULL,
    `lego` VARCHAR(30) NOT NULL,
    `built` BOOLEAN DEFAULT false,
    PRIMARY KEY (`id`)
);

INSERT INTO `legos` (lego) VALUES ('truck');
INSERT INTO `legos` (lego) VALUES ('robot');

SELECT * FROM `legos`;