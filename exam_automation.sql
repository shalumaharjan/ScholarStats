-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2026 at 09:17 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `exam_automation`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `log_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `activity` varchar(255) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `ip_address` varchar(50) DEFAULT NULL,
  `log_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fetch_jobs`
--

CREATE TABLE `fetch_jobs` (
  `job_id` int(11) NOT NULL,
  `file_id` int(11) NOT NULL,
  `job_status` enum('Pending','Running','Completed','Failed') DEFAULT 'Pending',
  `total_records` int(11) DEFAULT 0,
  `processed_records` int(11) DEFAULT 0,
  `failed_records` int(11) DEFAULT 0,
  `started_at` datetime DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fetch_job_items`
--

CREATE TABLE `fetch_job_items` (
  `item_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `record_id` int(11) NOT NULL,
  `fetch_status` enum('Pending','Success','Failed') DEFAULT 'Pending',
  `retry_count` int(11) DEFAULT 0,
  `error_message` text DEFAULT NULL,
  `fetched_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `result_id` int(11) NOT NULL,
  `record_id` int(11) NOT NULL,
  `exam_year` year(4) DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  `gpa` decimal(3,2) DEFAULT NULL,
  `cgpa` decimal(3,2) DEFAULT NULL,
  `result_status` enum('Pass','Fail') DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `fetched_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `semester_analysis`
--

CREATE TABLE `semester_analysis` (
  `analysis_id` int(11) NOT NULL,
  `semester` int(11) DEFAULT NULL,
  `exam_year` year(4) DEFAULT NULL,
  `total_students` int(11) DEFAULT NULL,
  `passed_students` int(11) DEFAULT NULL,
  `failed_students` int(11) DEFAULT NULL,
  `highest_gpa` decimal(3,2) DEFAULT NULL,
  `lowest_gpa` decimal(3,2) DEFAULT NULL,
  `average_gpa` decimal(3,2) DEFAULT NULL,
  `generated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_files`
--

CREATE TABLE `student_files` (
  `file_id` int(11) NOT NULL,
  `uploaded_by` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `original_file_name` varchar(255) DEFAULT NULL,
  `file_type` varchar(20) DEFAULT NULL,
  `total_students` int(11) DEFAULT 0,
  `upload_status` varchar(30) DEFAULT 'Uploaded',
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_files`
--

INSERT INTO `student_files` (`file_id`, `uploaded_by`, `file_name`, `original_file_name`, `file_type`, `total_students`, `upload_status`, `uploaded_at`) VALUES
(1, 1, 'students.xlsx', 'students.xlsx', 'xlsx', 2, 'Uploaded', '2026-07-10 02:48:10');

-- --------------------------------------------------------

--
-- Table structure for table `student_file_records`
--

CREATE TABLE `student_file_records` (
  `record_id` int(11) NOT NULL,
  `file_id` int(11) NOT NULL,
  `symbol_no` varchar(30) NOT NULL,
  `registration_no` varchar(30) DEFAULT NULL,
  `student_name` varchar(150) NOT NULL,
  `faculty` varchar(100) DEFAULT NULL,
  `program` varchar(100) DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `processing_status` varchar(30) DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_file_records`
--

INSERT INTO `student_file_records` (`record_id`, `file_id`, `symbol_no`, `registration_no`, `student_name`, `faculty`, `program`, `semester`, `username`, `password`, `processing_status`, `created_at`) VALUES
(1, 1, '2301001', 'PU001', 'Ram Sharma', 'Science', 'BCA', 4, '2301001', 'ram123', 'Pending', '2026-07-10 02:48:54'),
(2, 1, '2301002', 'PU002', 'Sita Karki', 'Science', 'BCA', 4, '2301002', 'sita123', 'Pending', '2026-07-10 02:48:54');

-- --------------------------------------------------------

--
-- Table structure for table `subject_results`
--

CREATE TABLE `subject_results` (
  `subject_result_id` int(11) NOT NULL,
  `result_id` int(11) NOT NULL,
  `subject_code` varchar(20) DEFAULT NULL,
  `subject_name` varchar(150) DEFAULT NULL,
  `credit_hours` decimal(3,1) DEFAULT NULL,
  `internal_marks` decimal(5,2) DEFAULT NULL,
  `external_marks` decimal(5,2) DEFAULT NULL,
  `total_marks` decimal(5,2) DEFAULT NULL,
  `grade` varchar(5) DEFAULT NULL,
  `grade_point` decimal(3,2) DEFAULT NULL,
  `result` enum('Pass','Fail') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `email`, `password_hash`, `role`, `created_at`) VALUES
(1, 'Administrator', 'admin@gmail.com', 'admin123', 'admin', '2026-07-10 02:44:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `fk_activity_user` (`user_id`);

--
-- Indexes for table `fetch_jobs`
--
ALTER TABLE `fetch_jobs`
  ADD PRIMARY KEY (`job_id`),
  ADD KEY `fk_fetch_file` (`file_id`);

--
-- Indexes for table `fetch_job_items`
--
ALTER TABLE `fetch_job_items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `fk_job_item` (`job_id`),
  ADD KEY `fk_record_item` (`record_id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `fk_result_record` (`record_id`);

--
-- Indexes for table `semester_analysis`
--
ALTER TABLE `semester_analysis`
  ADD PRIMARY KEY (`analysis_id`);

--
-- Indexes for table `student_files`
--
ALTER TABLE `student_files`
  ADD PRIMARY KEY (`file_id`),
  ADD KEY `fk_student_file_user` (`uploaded_by`);

--
-- Indexes for table `student_file_records`
--
ALTER TABLE `student_file_records`
  ADD PRIMARY KEY (`record_id`),
  ADD KEY `fk_record_file` (`file_id`);

--
-- Indexes for table `subject_results`
--
ALTER TABLE `subject_results`
  ADD PRIMARY KEY (`subject_result_id`),
  ADD KEY `fk_subject_result` (`result_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fetch_jobs`
--
ALTER TABLE `fetch_jobs`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fetch_job_items`
--
ALTER TABLE `fetch_job_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `semester_analysis`
--
ALTER TABLE `semester_analysis`
  MODIFY `analysis_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_files`
--
ALTER TABLE `student_files`
  MODIFY `file_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `student_file_records`
--
ALTER TABLE `student_file_records`
  MODIFY `record_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `subject_results`
--
ALTER TABLE `subject_results`
  MODIFY `subject_result_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD CONSTRAINT `fk_activity_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL;

--
-- Constraints for table `fetch_jobs`
--
ALTER TABLE `fetch_jobs`
  ADD CONSTRAINT `fk_fetch_file` FOREIGN KEY (`file_id`) REFERENCES `student_files` (`file_id`) ON DELETE CASCADE;

--
-- Constraints for table `fetch_job_items`
--
ALTER TABLE `fetch_job_items`
  ADD CONSTRAINT `fk_job_item` FOREIGN KEY (`job_id`) REFERENCES `fetch_jobs` (`job_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_record_item` FOREIGN KEY (`record_id`) REFERENCES `student_file_records` (`record_id`) ON DELETE CASCADE;

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `fk_result_record` FOREIGN KEY (`record_id`) REFERENCES `student_file_records` (`record_id`) ON DELETE CASCADE;

--
-- Constraints for table `student_files`
--
ALTER TABLE `student_files`
  ADD CONSTRAINT `fk_student_file_user` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `student_file_records`
--
ALTER TABLE `student_file_records`
  ADD CONSTRAINT `fk_record_file` FOREIGN KEY (`file_id`) REFERENCES `student_files` (`file_id`) ON DELETE CASCADE;

--
-- Constraints for table `subject_results`
--
ALTER TABLE `subject_results`
  ADD CONSTRAINT `fk_subject_result` FOREIGN KEY (`result_id`) REFERENCES `results` (`result_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
