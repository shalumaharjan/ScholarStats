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



- Indexes for table `fetch_job_items`
--
ALTER TABLE `fetch_job_items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `fk_job_item` (`job_id`),
  ADD KEY `fk_record_item` (`record_id`);


-- AUTO_INCREMENT for table `fetch_job_items`
--
ALTER TABLE `fetch_job_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT;

  - Constraints for table `fetch_job_items`
--
ALTER TABLE `fetch_job_items`
  ADD CONSTRAINT `fk_job_item` FOREIGN KEY (`job_id`) REFERENCES `fetch_jobs` (`job_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_record_item` FOREIGN KEY (`record_id`) REFERENCES `student_file_records` (`record_id`) ON DELETE CASCADE;
