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



-- Indexes for table `fetch_jobs`
--
ALTER TABLE `fetch_jobs`
  ADD PRIMARY KEY (`job_id`),
  ADD KEY `fk_fetch_file` (`file_id`);


  -- AUTO_INCREMENT for table `fetch_jobs`
--
ALTER TABLE `fetch_jobs`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT;



-- Constraints for table `fetch_jobs`
--
ALTER TABLE `fetch_jobs`
  ADD CONSTRAINT `fk_fetch_file` FOREIGN KEY (`file_id`) REFERENCES `student_files` (`file_id`) ON DELETE CASCADE;
