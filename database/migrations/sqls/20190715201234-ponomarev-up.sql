/* Replace with your SQL commands */
CREATE TABLE `ponomarev`.`equipment` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `availability` tinyint(4) NOT NULL,
  `owner` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `ponomarev`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(45) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `date` DATE NOT NULL,
  `admin` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `login_UNIQUE` (`login` ASC) VISIBLE);

  insert into `ponomarev`.`equipment` (name,availability,owner) values ('ball',false,'Nick');
  insert into `ponomarev`.`equipment` (name,availability,owner) values ('table',true,'User');
  insert into `ponomarev`.`equipment` (name,availability,owner) values ('pencil',false,'Vasya');