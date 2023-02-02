-- 1. city tablosu ile country tablosunda bulunan şehir (city) ve ülke (country) isimlerini birlikte görebileceğimiz LEFT JOIN sorgusunu yazınız.

SELECT co.country, ci.city FROM city AS ci
LEFT JOIN country AS co ON co.country_id = ci.country_id
ORDER BY co.country, ci.city;

-- 2. customer tablosu ile payment tablosunda bulunan payment_id ile customer tablosundaki first_name ve last_name isimlerini birlikte görebileceğimiz RIGHT JOIN sorgusunu yazınız.

SELECT c.first_name, c.last_name, p.payment_id FROM customer AS c
RIGHT JOIN payment AS p ON p.customer_id = c.customer_id
ORDER BY c.first_name, c.last_name, p.payment_id;

-- 3. customer tablosu ile rental tablosunda bulunan rental_id ile customer tablosundaki first_name ve last_name isimlerini birlikte görebileceğimiz FULL JOIN sorgusunu yazınız.

SELECT c.first_name, c.last_name, r.rental_id FROM customer AS c
FULL JOIN rental AS r ON r.customer_id = c.customer_id
ORDER BY c.first_name, c.last_name, r.rental_id;
