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

-- Indexes for table `student_file_records`
--
ALTER TABLE `student_file_records`
  ADD PRIMARY KEY (`record_id`),
  ADD KEY `fk_record_file` (`file_id`);


-- AUTO_INCREMENT for table `student_file_records`
--
ALTER TABLE `student_file_records`
  MODIFY `record_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

-- Constraints for table `student_file_records`
--
ALTER TABLE `student_file_records`
  ADD CONSTRAINT `fk_record_file` FOREIGN KEY (`file_id`) REFERENCES `student_files` (`file_id`) ON DELETE CASCADE;

