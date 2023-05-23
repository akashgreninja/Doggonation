-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 23, 2023 at 08:11 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `doggonation`
--

-- --------------------------------------------------------

--
-- Table structure for table `bannedusers`
--

CREATE TABLE `bannedusers` (
  `id` int(200) NOT NULL,
  `ip_address` int(200) NOT NULL,
  `reason` varchar(200) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `user_id` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `msg_id` int(100) NOT NULL,
  `sender_id` int(100) NOT NULL,
  `recipient_id` int(100) NOT NULL,
  `text` varchar(10000) NOT NULL DEFAULT '[]',
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`msg_id`, `sender_id`, `recipient_id`, `text`, `time`) VALUES
(1, 29, 2, '[{\'sender\': {29}, \'message\': {\'first one\'}, \'time\': {\'2023-05-16 23:55:29\'}}, {\'sender\': {29}, \'message\': {\'second\'}, \'time\': {\'2023-05-16 23:55:48\'}}]', '0000-00-00 00:00:00'),
(2, 55, 2, '[{\'sender\': {55}, \'message\': {\'https://firebasestorage.googleapis.com/v0/b/doggonation-612e8.appspot.com/o/posts%2Fandog.jpg?alt=media&token=9e68acd9-88dd-41dd-8242-781236585506\'}, \'time\': {\'2023-05-18 19:24:23\'}}, {\'sender\': {55}, \'message\': {\'https://firebasestorage.googleapis.com/v0/b/doggonation-612e8.appspot.com/o/posts%2Fandog.jpg?alt=media&token=386a959d-9535-4203-99d9-d20524d2acd9\'}, \'time\': {\'2023-05-18 19:25:20\'}}]', '0000-00-00 00:00:00'),
(3, 56, 2, '[{\'sender\': \'56\', \'message\': \'https://firebasestorage.googleapis.com/v0/b/doggonation-612e8.appspot.com/o/posts%2Fandog.jpg?alt=media&token=c468eb28-8825-409b-9f5f-c845c3f47c0a\', \'time\': \'2023-05-23 23:36:23\'}]', '0000-00-00 00:00:00'),
(4, 56, 56, '[]', '0000-00-00 00:00:00'),
(5, 56, 55, '[{\'sender\': \'56\', \'message\': \'hello\', \'time\': \'2023-05-21 00:55:24\'}, {\'sender\': \'56\', \'message\': \'hello\', \'time\': \'2023-05-23 18:32:53\'}]', '0000-00-00 00:00:00'),
(6, 0, 56, '[]', '0000-00-00 00:00:00'),
(7, 57, 56, '[{\'sender\': \'57\', \'message\': \'hello\', \'time\': \'2023-05-21 00:59:40\'}, {\'sender\': \'56\', \'message\': \'chat done\', \'time\': \'2023-05-21 00:59:57\'}, {\'sender\': \'57\', \'message\': \'ok \', \'time\': \'2023-05-21 01:00:15\'}]', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` varchar(1000) NOT NULL,
  `liked` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `post_id`, `user_id`, `comment`, `liked`) VALUES
(1, 24, 29, 'new comment', 0),
(2, 30, 29, 'wooow', 0),
(3, 30, 29, 'new', 0),
(4, 30, 29, 'naya', 0),
(5, 30, 29, '+1', 0),
(6, 28, 29, 'new', 0),
(7, 29, 29, 'new comment', 0),
(8, 28, 29, 'comment', 0),
(9, 30, 29, 'new', 0),
(10, 29, 29, 'second comment', 0),
(11, 30, 29, 'number', 0),
(12, 29, 29, 'new', 0),
(13, 29, 29, 'naya', 0),
(14, 28, 29, 'new', 0),
(15, 30, 29, 'new ', 0),
(16, 42, 29, 'naya', 0),
(17, 47, 29, 'naya', 0),
(18, 47, 29, '', 0),
(19, 47, 29, '', 0),
(20, 47, 29, '', 0),
(21, 47, 29, '', 0),
(22, 47, 29, '', 0),
(23, 47, 29, 'wwww', 0),
(24, 47, 29, 'new one again', 0),
(25, 47, 29, 'bonjour', 0),
(26, 45, 29, 'new comment', 0),
(27, 45, 29, 'tera baap ', 0),
(28, 45, 29, 'kutta', 0),
(29, 45, 29, 'कुत्ते ', 0),
(30, 39, 29, 'new comment', 0),
(31, 50, 29, 'tags', 0),
(32, 53, 29, 'new comment', 0),
(33, 53, 29, 'bonjour', 0),
(34, 53, 29, 'djfs', 0),
(35, 52, 29, 'dgsfdfg', 0),
(36, 52, 29, 'bonjour', 0),
(37, 43, 29, 'bonjour', 0),
(38, 2, 56, 'bonjour', 0);

-- --------------------------------------------------------

--
-- Table structure for table `follow`
--

CREATE TABLE `follow` (
  `follower` int(11) NOT NULL,
  `following` int(11) NOT NULL,
  `sl` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `follow`
--

INSERT INTO `follow` (`follower`, `following`, `sl`) VALUES
(2, 3, 3),
(2, 25, 5),
(2, 3, 6),
(3, 2, 7),
(55, 56, 8),
(56, 55, 9),
(56, 57, 10),
(57, 56, 11);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `pic` varchar(1000) NOT NULL,
  `caption` varchar(500) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `liked` int(11) NOT NULL,
  `location` varchar(500) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `reported` int(11) NOT NULL,
  `likes` int(11) NOT NULL DEFAULT 0,
  `comments` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`pic`, `caption`, `post_id`, `user_id`, `liked`, `location`, `time`, `reported`, `likes`, `comments`) VALUES
('https://firebasestorage.googleapis.com/v0/b/doggonation-612e8.appspot.com/o/posts%2Fandog.jpg?alt=media&token=c468eb28-8825-409b-9f5f-c845c3f47c0a', 'Unleashing boundless happiness and unconditional love with my beloved four-legged companion. From morning cuddles to playful adventures, every moment spent with this loyal and playful bundle of fur is a reminder of the joy and companionship that dogs bring into our lives. With their wagging tail and soulful eyes, they teach us the true meaning of loyalty, resilience, and living in the present moment. This little ball of fur has stolen my heart and transformed my world into a haven of laughter, s', 1, 56, 0, 'bengaluru', '2023-05-23 17:46:45', 0, 0, 0),
('https://firebasestorage.googleapis.com/v0/b/doggonation-612e8.appspot.com/o/posts%2Fandog.jpg?alt=media&token=c468eb28-8825-409b-9f5f-c845c3f47c0a', 'Unleashing boundless happiness and unconditional love with my beloved four-legged companion. From morning cuddles to playful adventures, every moment spent with this loyal and playful bundle of fur is a reminder of the joy and companionship that dogs bring into our lives. With their wagging tail and soulful eyes, they teach us the true meaning of loyalty, resilience, and living in the present moment. This little ball of fur has stolen my heart and transformed my world into a haven of laughter, s', 2, 55, 1, 'bengaluru', '2023-05-23 18:05:56', 0, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `razorpay`
--

CREATE TABLE `razorpay` (
  `id` int(200) NOT NULL,
  `user_id` int(200) NOT NULL,
  `razorpayOrderId` varchar(200) DEFAULT NULL,
  `razorpaySignature` varchar(200) DEFAULT NULL,
  `razorpayPaymentId` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `reason` varchar(1000) NOT NULL,
  `post_id` int(11) NOT NULL,
  `report_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`reason`, `post_id`, `report_id`) VALUES
('dghdhshsdhsdhdshgsdgsdf', 23, 3),
('dghdhshsdhsdhdshgsdgsdf', 23, 4),
('dghdhshsdhsdhdshgsdgsdf', 23, 5);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `tag` varchar(100) NOT NULL,
  `post_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`tag`, `post_id`, `tag_id`) VALUES
('husky', 1, 1),
('Eskimo dog', 1, 2),
('husky', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(1000) DEFAULT NULL,
  `name` varchar(200) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `profile_pic` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `password`, `name`, `gender`, `dob`, `profile_pic`) VALUES
(3, 'akashuhulekal@gmail.com', 'pbkdf2:sha256:260000$c94hjUTTfSkgezZt$4fe17f88eb7e5719b69e444d6d79c6d871c2a40f95fd04ab333c89df2ebcd285', 'akash uday', 'male', '2023-05-02', 'https://lh3.googleusercontent.com/a/AGNmyxarRlktc-zutv4aoL9hY3YvnAUCUyF9V6v-mhe3bA=s96-c'),
(55, 'akashuhulekal@gmail.com', 'pbkdf2:sha256:260000$c94hjUTTfSkgezZt$4fe17f88eb7e5719b69e444d6d79c6d871c2a40f95fd04ab333c89df2ebcd285', 'akash uday', 'male', '2023-05-02', 'https://lh3.googleusercontent.com/a/AGNmyxarRlktc-zutv4aoL9hY3YvnAUCUyF9V6v-mhe3bA=s96-c'),
(56, 'kartikhegde.2002@gmail.com', 'pbkdf2:sha256:260000$T35Y7rtI8YTH0lLA$0c1d6bed6184844dcb0e193a43c9b04226281ebb4e86919faf0b6f574b0f0c6d', 'Kartik hegde', 'male', '2023-05-02', 'https://lh3.googleusercontent.com/a/AGNmyxY18XrlQCpeV6JG5DQWkaV6D1gbrNePJa-x3D7FYw=s96-c'),
(57, 'kartikhegde.1996@gmail.com', 'pbkdf2:sha256:260000$yDAVawZZW3Yc4L6I$ed9b75b826afba3f2407814531ff489b7947e4e65d846b5d4256eb9f49fe4fb9', 'Kartik Hegde', 'male', '2023-05-02', 'https://lh3.googleusercontent.com/a/AGNmyxbj81B_GOublX6NfAY_LBoE8qhZeUtx7VQXS0Yj=s96-c'),
(200, 'akashuhulekal@gmail.com', 'pbkdf2:sha256:260000$c94hjUTTfSkgezZt$4fe17f88eb7e5719b69e444d6d79c6d871c2a40f95fd04ab333c89df2ebcd285', 'akash uday', 'male', '2023-05-02', 'https://lh3.googleusercontent.com/a/AGNmyxarRlktc-zutv4aoL9hY3YvnAUCUyF9V6v-mhe3bA=s96-c');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bannedusers`
--
ALTER TABLE `bannedusers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`msg_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`sl`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`report_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tag_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bannedusers`
--
ALTER TABLE `bannedusers`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `msg_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `follow`
--
ALTER TABLE `follow`
  MODIFY `sl` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `tag_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
