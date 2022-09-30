# Selection ve Insertion Sort Projesi

Bu repo [Kodluyoruz](https://www.kodluyoruz.org) [Patika-Veri Yapıları ve Algoritmalar](https://app.patika.dev/courses/veri-yapilari-ve-algoritmalar) eğitimleri kapsamında hazırlanmıştır.

>**Not:** Eğitim videolarında **insertion sort** başlığı altında **selection sort** anlatıldığı için kasıtın selection sort olduğu düşünülerek ilgili algoritma üzerinden çalışılmıştır. 

**Dizi: [22,27,16,2,18,6] -> Selection Sort (Notu okuyunuz):**

>##### 1. Yukarı verilen dizinin sort türüne göre aşamalarını yazınız:

+ I01: [2,27,16,22,18,6]
+ I02: [2,6,16,22,18,27]
+ I03: [2,6,16,18,22,27]

>##### 2. Big-O gösterimini yazınız:
+ O(n^2)

>##### 3. Time Complexity:

+ Worst Case: [n*(n+1/2)] -> n^2 
+ Average Case: n^2
+ Best Case: n^2

>##### 4. Dizi sıralandıktan sonra 18 sayısı hangi case kapsamına girer? 

+ Average case: Aradığımız sayının ortada olması
+ Sıralanmış dizi: [2,6,16,**18**,22,27]
+ 18 ortaya yakınsak olduğu için **avarage case** konusudur. 


>##### 5. [7,3,5,8,2,9,4,15,6] dizisinin Selection Sort'a göre ilk 4 adımını yazınız.:

+ I01: [2,3,5,8,7,9,4,15,6]
+ I02: [2,3,4,8,7,9,5,15,6]
+ I03: [2,3,4,5,7,9,8,15,6]
+ I04: [2,3,4,5,6,9,8,15,7]
...
---
>##### 6. [7,3,5,8,2,9,4,15,6] dizisinin Insertion Sort'a göre ilk 4 adımını yazınız.:

+ I01: [3,7,5,8,2,9,4,15,6]
+ I01: [3,5,7,8,2,9,4,15,6]
+ I01: [2,3,5,7,8,9,4,15,6]
+ I01: [2,3,4,5,7,8,9,15,6]
...