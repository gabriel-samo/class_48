CREATE SCHEMA stimatzki_db;

USE stimatzki_db;

CREATE TABLE `stimatzki_db`.`authors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(15) NULL,
  `lastName` VARCHAR(15) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idauthors_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `stimatzki_db`.`books` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `authorId` INT NULL,
  `bookName` VARCHAR(200) NULL,
  `pagesNumber` INT NULL,
  `bookPrice` DECIMAL(5,2) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idbooks_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `authorId_idx` (`authorId` ASC) VISIBLE,
  CONSTRAINT `authorId`
    FOREIGN KEY (`authorId`)
    REFERENCES `stimatzki_db`.`authors` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

INSERT INTO `stimatzki_db`.`authors` (`id`, `firstName`, `lastName`) VALUES ('1', 'Chinua', 'Achebe');
INSERT INTO `stimatzki_db`.`authors` (`id`, `firstName`, `lastName`) VALUES ('2', 'Hans Christian', 'Andersen');
INSERT INTO `stimatzki_db`.`authors` (`id`, `firstName`, `lastName`) VALUES ('3', 'Dante', 'Alighieri');
INSERT INTO `stimatzki_db`.`authors` (`id`, `firstName`, `lastName`) VALUES ('4', 'Jane', 'Austen');
INSERT INTO `stimatzki_db`.`authors` (`id`, `firstName`, `lastName`) VALUES ('5', 'Samuel', 'Beckett');

INSERT INTO `stimatzki_db`.`books` (`id`, `authorId`, `bookName`, `pagesNumber`, `bookPrice`) VALUES ('1', '1', 'Things Fall Apart', '209', '19.58');
INSERT INTO `stimatzki_db`.`books` (`id`, `authorId`, `bookName`, `pagesNumber`, `bookPrice`) VALUES ('2', '1', 'Fairy tales', '784', '18.36');
INSERT INTO `stimatzki_db`.`books` (`id`, `authorId`, `bookName`, `pagesNumber`, `bookPrice`) VALUES ('3', '2', 'The Divine Comedy', '928', '13.15');
INSERT INTO `stimatzki_db`.`books` (`id`, `authorId`, `bookName`, `pagesNumber`, `bookPrice`) VALUES ('4', '2', 'Pride and Prejudice', '226', '18.13');
INSERT INTO `stimatzki_db`.`books` (`id`, `authorId`, `bookName`, `pagesNumber`, `bookPrice`) VALUES ('5', '3', 'Molloy, Malone Dies, The Unnamable, the trilogy', '256', '19.52');

