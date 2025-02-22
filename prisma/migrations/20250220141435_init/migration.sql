-- AlterTable
ALTER TABLE `saved_coupons` ADD COLUMN `coupon_used_at` VARCHAR(20) NULL;

-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `image` BLOB NULL,
    MODIFY `start_Date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `end_Date` DATETIME(0) NOT NULL;
