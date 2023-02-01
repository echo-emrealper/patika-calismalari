-- 1. city tablosu ile country tablosunda bulunan şehir (city) ve ülke (country) isimlerini birlikte görebileceğimiz INNER JOIN sorgusunu yazınız.

SELECT country.country, city.city from city
INNER JOIN country ON city.country_id = country.country_id
ORDER BY country.country, city.city;

-- 2. customer tablosu ile payment tablosunda bulunan payment_id ile customer tablosundaki first_name ve last_name isimlerini birlikte görebileceğimiz INNER JOIN sorgusunu yazınız.

SELECT c.first_name, c.last_name, p.payment_id FROM payment AS p
INNER JOIN customer AS c ON p.customer_id = c.customer_id
ORDER BY c.first_name, c.last_name, p.payment_id;

-- 3. customer tablosu ile rental tablosunda bulunan rental_id ile customer tablosundaki first_name ve last_name isimlerini birlikte görebileceğimiz INNER JOIN sorgusunu yazınız.
SELECT c.first_name, c.last_name, r.rental_id FROM rental AS r
INNER JOIN customer AS c ON r.customer_id = c.customer_id
ORDER BY c.first_name, c.last_name, r.rental_id;

