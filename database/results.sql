- Table structure for table `results`
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



-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `fk_result_record` (`record_id`);


  -- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT;



 Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `fk_result_record` FOREIGN KEY (`record_id`) REFERENCES `student_file_records` (`record_id`) ON DELETE CASCADE;

--