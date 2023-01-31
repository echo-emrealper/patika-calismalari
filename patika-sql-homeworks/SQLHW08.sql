-- 1. test veritabanınızda employee isimli sütun bilgileri id(INTEGER), name VARCHAR(50), birthday DATE, email VARCHAR(100) olan bir tablo oluşturalım.

DROP TABLE IF EXISTS employee;

CREATE TABLE employee (
	id INTEGER,
	name VARCHAR(50),
	birthday DATE,
	email VARCHAR(100)
);

-- 2. Oluşturduğumuz employee tablosuna 'Mockaroo' servisini kullanarak 50 adet veri ekleyelim.

INSERT INTO employee 
	(id, name, birthday, email)
VALUES
	(1, 'Shermie New', '1985-06-15', 'snew0@princeton.edu'),
	(2, 'Ricky Itskovitz', '1981-06-02', 'ritskovitz1@nih.gov'),
	(3, 'Darla Lambeth', '1984-01-20', 'dlambeth2@simplemachines.org'),
	(4, 'Marie Citrine', '1989-01-19', 'mcitrine3@forbes.com'),
	(5, 'Riannon Holsey', '1981-06-11', 'rholsey4@edublogs.org'),
	(6, 'Ron Erskine', '1986-01-24', 'rerskine5@businessweek.com'),
	(7, 'Kally Peploe', '1989-05-09', 'kpeploe6@usa.gov'),
	(8, 'Tore Revitt', '1987-07-31', 'trevitt7@oaic.gov.au'),
	(9, 'Hyacintha Bollon', '1981-07-29', 'hbollon8@usatoday.com'),
	(10, 'Gaylor Sandeford', '1983-08-23', 'gsandeford9@bigcartel.com'),
	(11, 'Bealle Oxbie', '1989-08-17', 'boxbiea@europa.eu'),
	(12, 'Geneva Mildenhall', '1981-02-01', 'gmildenhallb@themeforest.net'),
	(13, 'Corny Fashion', '1987-11-17', 'cfashionc@live.com'),
	(14, 'Kippie Charlet', '1980-05-09', 'kcharletd@acquirethisname.com'),
	(15, 'Andrej Dreye', '1981-01-15', 'adreyee@marketwatch.com'),
	(16, 'Jaine Stother', '1980-11-29', 'jstotherf@imdb.com'),
	(17, 'Yasmeen Stopford', '1983-12-31', 'ystopfordg@wikimedia.org'),
	(18, 'Ilaire McCumesky', '1980-06-27', 'imccumeskyh@uiuc.edu'),
	(19, 'Chastity Peckitt', '1989-08-13', 'cpeckitti@icio.us'),
	(20, 'Leonore Small', '1990-01-16', 'lsmallj@mozilla.com'),
	(21, 'Rosita Tawn', '1987-05-14', 'rtawnk@angelfire.com'),
	(22, 'Ichabod Reast', '1984-06-27', 'ireastl@wiley.com'),
	(23, 'Adella Yellop', '1983-02-01', 'ayellopm@angelfire.com'),
	(24, 'Eloisa Dunn', '1983-07-11', 'edunnn@123-reg.co.uk'),
	(25, 'Sofia Blackesland', '1988-11-09', 'sblackeslando@businessinsider.com'),
	(26, 'Waring Danielis', '1982-11-08', 'wdanielisp@arizona.edu'),
	(27, 'Cordey Kissack', '1988-04-29', 'ckissackq@cloudflare.com'),
	(28, 'Neille Bounde', '1984-07-13', 'nbounder@ftc.gov'),
	(29, 'Denys Duns', '1985-09-04', 'ddunss@hostgator.com'),
	(30, 'Bruno Di Giorgio', '1987-08-29', 'bdit@economist.com'),
	(31, 'Adel Keady', '1986-12-27', 'akeadyu@amazonaws.com'),
	(32, 'Karita Lowres', '1982-10-31', 'klowresv@example.com'),
	(33, 'Garrot Stembridge', '1981-07-01', 'gstembridgew@seesaa.net'),
	(34, 'Venita Jeffcoat', '1983-02-12', 'vjeffcoatx@nyu.edu'),
	(35, 'Ardith Witcher', '1988-09-20', 'awitchery@berkeley.edu'),
	(36, 'Sholom Barnewall', '1989-08-24', 'sbarnewallz@prlog.org'),
	(37, 'Svend Rolls', '1982-03-06', 'srolls10@independent.co.uk'),
	(38, 'Sawyere Snape', '1989-04-21', 'ssnape11@wix.com'),
	(39, 'Ulises Bricham', '1983-05-28', 'ubricham12@yelp.com'),
	(40, 'Wilmer Fabb', '1984-03-18', 'wfabb13@google.pl'),
	(41, 'Arin Hindshaw', '1981-05-03', 'ahindshaw14@jigsy.com'),
	(42, 'Bobbee Winchurch', '1984-03-22', 'bwinchurch15@paypal.com'),
	(43, 'Beilul Fomichkin', '1988-06-22', 'bfomichkin16@rambler.ru'),
	(44, 'Candra Deaves', '1981-07-17', 'cdeaves17@yale.edu'),
	(45, 'Renault Sturrock', '1985-04-15', 'rsturrock18@spiegel.de'),
	(46, 'Maressa Slopier', '1989-10-31', 'mslopier19@sphinn.com'),
	(47, 'Smith Cometson', '1984-12-05', 'scometson1a@scientificamerican.com'),
	(48, 'Oren Putland', '1984-07-19', 'oputland1b@vinaora.com'),
	(49, 'Hanan Grabert', '1988-02-03', 'hgrabert1c@miitbeian.gov.cn'),
	(50, 'Minna Lopez', '1981-09-20', 'mlopez1d@gravatar.com')
RETURNING *;

-- 3. Sütunların her birine göre diğer sütunları güncelleyecek 5 adet UPDATE işlemi yapalım.

UPDATE employee
SET name = 'Snake Plissken'
WHERE name LIKE 'S%'
RETURNING *;

UPDATE employee
SET birthday = '1904-03-22'
WHERE birthday = '1984-03-22'
RETURNING *;

UPDATE employee
SET name = REPLACE(name, 't','X')
WHERE name LIKE '%t%'
RETURNING *;

UPDATE employee
SET email = REPLACE(email, '@angelfire.com','@patika.com.tr')
WHERE email LIKE '%@angelfire.com'
RETURNING *;

UPDATE employee
SET id = id + 100
WHERE id > 40
RETURNING *;

-- 4. Sütunların her birine göre ilgili satırı silecek 5 adet DELETE işlemi yapalım.

DELETE FROM employee
WHERE name LIKE '%X%'
RETURNING *;

DELETE FROM employee
WHERE id > 100
RETURNING *;

DELETE FROM employee
WHERE birthday = '1987-08-29'
RETURNING *;

DELETE FROM employee
WHERE name = 'Snake Plissken'
RETURNING *;

DELETE FROM employee
WHERE MOD(id , 2) = 1
RETURNING *;