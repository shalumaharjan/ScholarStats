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
