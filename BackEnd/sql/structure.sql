-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

DROP SCHEMA IF EXISTS `storydots`;
CREATE SCHEMA IF NOT EXISTS `storydots` DEFAULT CHARACTER SET utf8 ;
USE `storydots`;

-- -----------------------------------------------------
-- Table `storydots`.`brands`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `logo_url` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

LOCK TABLES `brands` WRITE;
INSERT INTO `brands` (`name`, `logo_url`) VALUES ('Marca 1', 'Link 1'), ('Marca 2', 'Link 2'), ('Marca 3', 'Link 3');
UNLOCK TABLES;	

-- -----------------------------------------------------
-- Table `storydots`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `price` INT UNSIGNED NOT NULL,
  `brand_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `brand_id`
    FOREIGN KEY (`brand_id`)
    REFERENCES `brands` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

LOCK TABLES `products` WRITE;
INSERT INTO `products` (`name`, `description`, `image_url`, `price`, `brand_id`) VALUES ('Producto 1', 'Descripcion producto 1', 'Link 1', 100, 1), ('Producto 2', 'Descripcion producto 2', 'Link 2', 200, 2);
UNLOCK TABLES;	

