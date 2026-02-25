
CREATE DATABASE autokdb 
DEFAULT CHARACTER SET utf8
COLLATE utf8_hungarian_ci;

USE autokdb;

CREATE TABLE auto(
	id INT PRIMARY KEY AUTO_INCREMENT,
    marka VARCHAR(100),
    modell VARCHAR(100),
    gyartas INT,
    alvazszam VARCHAR(100),
    loero INT,
    kilometer FLOAT,
    uzemanyag VARCHAR(100),
    fogyasztas FLOAT,
    allas FLOAT
);

