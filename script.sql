-- Login as root
CREATE DATABASE recipe;

-- Create a user and give access to recipe database
-- with `%` wildcard the recipe user can connect remotely from any machine
CREATE USER 'recipe'@'%' IDENTIFIED BY 'secret';
-- Grant full access to recipe user over recipe database
GRANT ALL PRIVILEGES ON recipe.* TO 'recipe'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- login as recipe user
USE recipe;

-- application users
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phoneNumber` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- users bookmarked recipes 
CREATE TABLE `bookmark` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `recipeId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `bookmark_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;