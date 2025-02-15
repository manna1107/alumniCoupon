-- CreateTable
CREATE TABLE `store` (
    `store_id` INTEGER NOT NULL AUTO_INCREMENT,
    `store_name` VARCHAR(100) NOT NULL,
    `location` VARCHAR(100) NOT NULL,
    `address` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`store_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ticket` (
    `coupon_id` INTEGER NOT NULL AUTO_INCREMENT,
    `store_id` INTEGER NOT NULL,
    `name_coupon` VARCHAR(100) NOT NULL,
    `start_Date` DATE NOT NULL,
    `end_Date` DATE NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `number_of_coupons` INTEGER NOT NULL,
    `details` VARCHAR(255) NOT NULL,

    INDEX `store_id`(`store_id`),
    PRIMARY KEY (`coupon_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ticket` ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE CASCADE ON UPDATE RESTRICT;
