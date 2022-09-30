# Binary Search Tree Projesi

Bu repo [Kodluyoruz](https://www.kodluyoruz.org) [Patika-Veri Yapıları ve Algoritmalar](https://app.patika.dev/courses/veri-yapilari-ve-algoritmalar) eğitimleri kapsamında hazırlanmıştır.

##### Dizi: [7, 5, 1, 8, 3, 6, 0, 9, 4, 2] -> Binary Search Tree

>**1. Şematik Gösterim**

```
# L00  :            6 (Root)
                  /  \
# L01  :         5    7
                /      \
# L02  :       1        8
              / \        \
# L03  :     0   3        9
                / \    
# L04  :       2   4   

```
>**2. Aşamalar (Seviyelendirilmiş)**

>**L00:**  [7,5,1,8,3,**6**,0,9,4,2] (Seviyelenenler: 6)
+ 6 Root olarak atanır. *(seviyesinde, yerinde)*
>**L01:**  [**7**,**5**,1,8,3,6,0,9,4,2] (Seviyelenenler: 6,7,5)
+ 7 > 6 => 6' nın sağına ata *(seviyesinde, yerinde)*
+ 5 < 6 => 6' nın soluna ata *(seviyesinde, yerinde)*
>**L02:** [7,5,**1**,**8**,3,6,0,9,4,2] (Seviyelenenler: 6,7,5,1,8)
+ 1 < 6 => 6' nın soluna ata
+ 1 < 5 => 5' in soluna ata *(seviyesinde, yerinde)*
+ 8 > 6 => 6' nın sağına ata
+ 8 > 7 => 7' nin sağına ata *(seviyesinde, yerinde)*
>**L03:** [7,5,1,8,**3**,6,**0**,**9**,4,2] (Seviyelenenler: 6,7,5,1,8,3,0,9)
+ 3 < 6 => 6' nın soluna ata
+ 3 < 5 => 5' in soluna ata
+ 3 > 1 => 1' in sağına ata *(seviyesinde, yerinde)*
+ 0 < 6 => 6' nın soluna ata
+ 0 < 5 => 5' in soluna ata
+ 0 < 1 => 1' in soluna ata *(seviyesinde, yerinde)*
+ 9 > 6 => 6' nın sağına ata
+ 9 > 7 => 7' nin sağına ata
+ 9 > 8 => 8' in sağına ata *(seviyesinde, yerinde)*
>**L04:** [7,5,1,8,3,6,0,9,**4**,**2**] (Seviyelenenler: 6,7,5,1,8,3,0,9,4,2)
+ 4 < 6 => 6' nın soluna ata
+ 4 < 5 => 5' in soluna ata
+ 4 > 1 => 1' in sağına ata
+ 4 > 3 => 3' ün sağına ata *(seviyesinde, yerinde)*
+ 2 < 6 => 6' nın soluna ata
+ 2 < 5 => 5' in soluna ata
+ 2 > 1 => 1' in sağına ata
+ 2 < 3 => 3' ün soluna ata *(seviyesinde, yerinde)* 
```
