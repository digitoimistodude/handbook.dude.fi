# Yksittäiset tehtävät Timelyyn

{% hint style="info" %}
Huom! Keväällä 2024 päätimme, että lisätään yksittäisten tehtävien sijaan projekti "Asiakas Oy - Laskutettavat tunnit", koska seuraamme tehtävien ajankäyttöä ja kannattavuutta **Timely Tasks** toiminnallisuuden kautta. Tämän vuoksi alla oleva ohje ei enää päde ja on täällä vain arkistollisista syistä.
{% endhint %}

### Yksittäiset tehtävät Timelyyn integraation kautta

Height-integraatio luo uuden tehtävän Timelyyn aina kun **Projekti Timelyyn** -attribuuttiin on valittu **Kyllä**:

{% hint style="info" %}
**Huom!** Kannattaa lisätä ensin Projekti Timelyyn -attribuutti ja sitten vasta Kyllä. Joskus rajapinta ei nimittäin havaitse muutosta. Toinen vaihtoehto on tehdä uudestaan jokin pieni muutos tehtävään. Rajapinta ei lisää projektia uudelleen, jos Timely-projektin nimestä löytyy Height Task ID (T-jotain).
{% endhint %}

<div align="left">

<figure><img src="../../../../.gitbook/assets/image (1) (1).png" alt=""><figcaption></figcaption></figure>

</div>

Projektin luomisesta tulee Height-tehtävään kommentti "Timely-projekti luotu".

<div align="left">

<figure><img src="../../../../.gitbook/assets/image (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

</div>

Tästä tulee myös ilmoitus Slackin #timely-kanavalle. Tällöin projektit menevät "Needs update" clientin alle Timelyssä.

<div align="left">

<figure><img src="../../../../.gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure>

</div>

Ei haittaa, vaikka projektin tietoja ei ehditä heti päivittämään, kun niihin voi lähteä heti kellottamaan aikaa.

Jos "Needs update" alta löytyy kuitenkin projekteja, näihin on projektipäällikön on täydennettävä tiedot:

* Asiakasyrityksen koko nimi (mukaan Oy, ry, sr, jne., esimerkiksi Gofore Oyj)
* Asiakkaan brändiväri (tämän voi poimia esim. asiakkaan verkkosivuilta [ColorSnapper](https://colorsnapper.com/) tai ilmaisella [Pika](https://github.com/superhighfives/pika)-työkalulla)
* Vaaditaan aina kuvaus seurattavalle asialle: **Require note when logging to project**

<figure><img src="../../../../.gitbook/assets/image (2) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

* Default billable rate: Individual rates

<figure><img src="../../../../.gitbook/assets/image (1) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

* Height-taskissa oleva budjetti, joka sovittu asiakkaan kanssa.

<figure><img src="../../../../.gitbook/assets/image (3) (1).png" alt=""><figcaption></figcaption></figure>
