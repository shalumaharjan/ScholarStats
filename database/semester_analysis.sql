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


-- Indexes for table `semester_analysis`
--
ALTER TABLE `semester_analysis`
  ADD PRIMARY KEY (`analysis_id`);

  -- AUTO_INCREMENT for table `semester_analysis`
--
ALTER TABLE `semester_analysis`
  MODIFY `analysis_id` int(11) NOT NULL AUTO_INCREMENT;
