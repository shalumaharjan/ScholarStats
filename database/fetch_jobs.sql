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
