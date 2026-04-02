-- Add user_id column to order_placement
ALTER TABLE `order_placement` ADD COLUMN `user_id` INTEGER NULL;
ALTER TABLE `order_placement` ADD CONSTRAINT `order_placement_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
