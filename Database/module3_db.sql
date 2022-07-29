CREATE TABLE city(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
cityName varchar(40),
country varchar(50),
country_id varchar(40) REFERENCES country(country_id),
area INT,
population INT,
GDP INT,
cityDescription VARCHAR(255)
);


SELECT * FROM city;
INSERT INTO 
city(cityName,country,country_id,area,population,GDP,cityDescription) 
VALUES 
	('Hà Nội','Việt Nam',1,10000,8000,5000,'thủ đô của Việt Nam'),
    ('Đà Nẳng','Việt Nam',1,10000,8000,5000,'Thành phố Biển'),
    ('Băng Cóc','Thái Lan',3,10000,8000,5000,'Thủ đô của Thái Lan')
    ;

CREATE TABLE country (
country_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
countryName varchar(40)
);

SELECT * FROM country;
INSERT INTO country(countryName) VALUES ('VietNam'),('Singapore'),('Thái Lan');