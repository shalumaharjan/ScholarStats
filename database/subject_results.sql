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



-- Indexes for table `subject_results`
--
ALTER TABLE `subject_results`
  ADD PRIMARY KEY (`subject_result_id`),
  ADD KEY `fk_subject_result` (`result_id`);


-- AUTO_INCREMENT for table `subject_results`
--
ALTER TABLE `subject_results`
  MODIFY `subject_result_id` int(11) NOT NULL AUTO_INCREMENT;


  -- Constraints for table `subject_results`
--
ALTER TABLE `subject_results`
  ADD CONSTRAINT `fk_subject_result` FOREIGN KEY (`result_id`) REFERENCES `results` (`result_id`) ON DELETE CASCADE;
COMMIT;
