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


-- Indexes for table `student_files`
--
ALTER TABLE `student_files`
  ADD PRIMARY KEY (`file_id`),
  ADD KEY `fk_student_file_user` (`uploaded_by`);


  -- AUTO_INCREMENT for table `student_files`
--
ALTER TABLE `student_files`
  MODIFY `file_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;


  - Constraints for table `student_files`
--
ALTER TABLE `student_files`
  ADD CONSTRAINT `fk_student_file_user` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
