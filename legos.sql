USE w11sjwb6wneuok7a;
CREATE `legos` (
 `id` INTEGER(11) AUTO_INCREMENT NOT NULL,
 `lego` VARCHAR(50) NOT NULL,
 `built` BOOLEAN DEFAULT false,
 PRIMARY KEY (`id`)
 );
 INSERT INTO `legos` (lego) VALUES ('robot');
 INSERT INTO `legos` (lego) VALUES ('castle');
 