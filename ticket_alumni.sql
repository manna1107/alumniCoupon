-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 07, 2025 at 06:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ticket_alumni`
--

-- --------------------------------------------------------

--
-- Table structure for table `saved_coupons`
--

CREATE TABLE `saved_coupons` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `coupon_id` int(11) NOT NULL,
  `saved_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `coupon_used_at` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `saved_coupons`
--

INSERT INTO `saved_coupons` (`id`, `user_id`, `coupon_id`, `saved_at`, `coupon_used_at`) VALUES
(1, 2, 1, '2025-02-23 15:55:11', 'ใช้แล้ว'),
(2, 3, 1, '2025-02-23 15:55:55', 'ยังไม่ได้ใช้งาน'),
(3, 2, 3, '2025-02-24 00:41:31', 'ยังไม่ได้ใช้งาน'),
(4, 2, 6, '2025-02-25 23:29:43', 'ใช้แล้ว'),
(11, 2, 9, '2025-03-03 19:03:05', 'ใช้แล้ว');

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `store_id` int(11) NOT NULL,
  `store_name` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`store_id`, `store_name`, `location`, `address`) VALUES
(1, 'ร้านชงเข้ม', 'สงขลา', '64 ถ.640'),
(2, 'ร้านขนมหวาน', 'สตูล', '68 ม.3'),
(3, 'i have IT', 'กรุงเทพ', '67 ม.66'),
(4, 'ร้านกินจุชาบู', 'ตรัง', '11 ม.11');

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `coupon_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `name_coupon` varchar(100) NOT NULL,
  `start_Date` datetime NOT NULL DEFAULT current_timestamp(),
  `end_Date` datetime NOT NULL,
  `type` varchar(50) NOT NULL,
  `number_of_coupons` int(11) NOT NULL,
  `details` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`coupon_id`, `store_id`, `name_coupon`, `start_Date`, `end_Date`, `type`, `number_of_coupons`, `details`) VALUES
(1, 2, 'ส่วนลด 30 บาท', '2025-02-23 21:27:00', '2025-02-27 21:27:00', 'อาหาร', 2, 'สั่งซื้ออาหารจากร้านขนมหวาน สามารถใช้ส่วนลดนี้ได้ 1 คูปอง ต่อ 1 ใบเสร็จ'),
(3, 2, 'ส่วนลด 20%', '2025-02-23 21:27:00', '2025-02-27 21:27:00', 'อาหาร', 5, 'สั่งซื้ออาหารจากร้านขนมหวาน สามารถใช้ส่วนลดนี้ได้ 1 คูปอง ต่อ 1 ใบเสร็จ'),
(6, 1, 'ส่วนลด 30 บาท', '2025-02-04 00:00:00', '2025-04-04 00:00:00', 'เครื่องดื่ม', 15, 'สั่งซื้อเครื่องดื่มจากร้านชงเข้ม สามารถใช้ส่วนลดนี้ได้ 1 คูปอง ต่อ 1 ใบเสร็จ'),
(7, 4, 'โปรโมชั่นมา 4 จ่าย 3 เพียงคนละ 299 บาท ', '2025-02-24 06:02:00', '2025-02-28 06:02:00', 'อาหาร', 10, 'ทานชาบูที่ร้านกินจุชาบูคนละ 299 บาทมา 4 จ่าย 3 '),
(9, 2, 'ส่วนลด 200 บาท', '2025-03-04 01:51:00', '2025-03-08 01:51:00', 'อาหาร', 10, 'เพียงซื้อขนมหวานหรือสินค้าจากทางร้านขนมหวานครบ 1,000บาท ก็สามารถใช้ส่วนลด 200บาท  1 คูปอง ต่อ 1 ใบเสร็จ');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(191) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
(1, 'Admin', 'admin@test.com', '$2b$10$bN/DlcsqOdn2Xbjj8QUex.b4xeqCVcV35zOmnsN4KEo96bLB5Tc4K', 'admin'),
(2, 'Manna', 'manna@test.com', '$2b$10$gJRX5MsIDAOBKK/sOhNAAO7Lj9oWQKeb89DOXp3LCJOYf4mPVd34i', 'user'),
(3, 'Minny', 'minny@test.com', '$2b$10$NcwlUdBy6CTVd4eWq7Ymj.9GpQXT.u0uYTpj7al6YZdwLinWSqtW6', 'user'),
(4, 'Manny', 'manny@test.com', '$2b$10$YbWlB7p1pML1kh0S702Kgej.HNZRV3P5hLCbwtCMwsuiLFyn7DH2m', 'user'),
(5, 'Montree', 'montree@test.com', '$2b$10$BkB138lhkbOumyzBkeuzlOth2OnfDLnngYaNBbHz7Ocy0F2BtDfFC', 'user'),
(6, 'Mona', 'mona@test.com', '$2b$10$O5WyxRjCmj9Nx6mHTMaQsuAPwCTFF0gjrKqv2AxjRXlUNzux4rbjG', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('18e16eee-0e2c-44e6-bba2-37cbefe1964d', 'f096c53fcf04553a73590be49be7dacc4dce1e0c38b108655c3cf8e4fd5987a1', '2025-02-23 21:17:49.351', '20250215043737_init', NULL, NULL, '2025-02-23 21:17:49.337', 1),
('4890723d-7e33-489f-832b-c0b9525eafbd', 'fe2081ea59c3eff4654c3066a2791e95c813a66a15065fc34adbc28c20c20142', '2025-02-23 21:17:49.174', '20250205032427_add_coupons', NULL, NULL, '2025-02-23 21:17:49.054', 1),
('4c04c97f-12a3-446b-9b13-a1714a63bd81', '6534182c52e0e409d9a744f01c189c98c6a0f472ee1973a55d52cbad076c1f43', '2025-02-23 21:17:49.463', '20250220141708_init', NULL, NULL, '2025-02-23 21:17:49.454', 1),
('57d082f4-d003-45fa-870a-96edd3baa346', '013e7afdd0dded9a631237f807d63d08e443a50202725277c5bdf65b0e61286d', '2025-02-23 21:17:49.453', '20250220141558_init', NULL, NULL, '2025-02-23 21:17:49.442', 1),
('ae1ebd86-7104-4ff9-9887-306b23a4026f', '7e0af68a4cc0214c3e2301b1d16a5197ce8853128c39e02079ecca961bed0f65', '2025-02-23 21:17:49.489', '20250220145008_init', NULL, NULL, '2025-02-23 21:17:49.464', 1),
('b75ed951-1752-4ea3-9e6b-18bb51adda5a', '85125048878c487a5a2ef01bd9e063abc54489620b1a376f3b1278ab3daee3ac', '2025-02-23 21:17:49.335', '20250215041935_init', NULL, NULL, '2025-02-23 21:17:49.176', 1),
('be479f92-862c-479b-9844-5058a57a2464', 'dc2760e5f9407bb2f7adc33775b12ae51c37b2fffb2fbcba163bf6765d92400e', '2025-02-23 21:17:49.440', '20250220141435_init', NULL, NULL, '2025-02-23 21:17:49.352', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `saved_coupons`
--
ALTER TABLE `saved_coupons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coupon_id` (`coupon_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`store_id`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`coupon_id`),
  ADD KEY `store_id` (`store_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `saved_coupons`
--
ALTER TABLE `saved_coupons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `store_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `coupon_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `saved_coupons`
--
ALTER TABLE `saved_coupons`
  ADD CONSTRAINT `saved_coupons_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `saved_coupons_ibfk_2` FOREIGN KEY (`coupon_id`) REFERENCES `ticket` (`coupon_id`);

--
-- Constraints for table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
