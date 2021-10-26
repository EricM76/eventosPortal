ALTER TABLE `events`.`Events` 
ADD COLUMN `active` TINYINT NULL DEFAULT 1 AFTER `updatedAt`;