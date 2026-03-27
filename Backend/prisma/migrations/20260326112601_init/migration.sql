-- CreateTable
CREATE TABLE `order_placement` (
    `order_id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_code` VARCHAR(191) NOT NULL,
    `customer_name` VARCHAR(191) NOT NULL,
    `order_date` DATETIME(3) NOT NULL,
    `product_name` VARCHAR(191) NOT NULL,
    `price` DECIMAL(7, 2) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `total_amount` DECIMAL(10, 2) NOT NULL,
    `payment_method` VARCHAR(191) NOT NULL,
    `order_status` VARCHAR(191) NOT NULL,
    `remarks` VARCHAR(191) NULL,
    `created_by` VARCHAR(191) NULL DEFAULT 'SYSTEM',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `order_placement_order_code_key`(`order_code`),
    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_attachments` (
    `order_attachment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `file_name` VARCHAR(191) NOT NULL,
    `stored_file_name` VARCHAR(191) NOT NULL,
    `file_type` VARCHAR(191) NOT NULL,
    `file_size_kb` DOUBLE NOT NULL,
    `file_path` VARCHAR(191) NOT NULL,
    `uploaded_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`order_attachment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order_attachments` ADD CONSTRAINT `order_attachments_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `order_placement`(`order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
