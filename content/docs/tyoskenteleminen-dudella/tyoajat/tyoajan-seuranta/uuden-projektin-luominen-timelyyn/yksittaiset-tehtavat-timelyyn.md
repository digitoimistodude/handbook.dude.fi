---
title: "Yksittäiset tehtävät Timelyyn"
lastModified: "2026-06-18T20:51:59.551Z"
---

> [!NOTE]
> Huom! Keväällä 2024 päätimme, että lisätään yksittäisten tehtävien sijaan projekti "Asiakas Oy - Laskutettavat tunnit", koska seuraamme tehtävien ajankäyttöä ja kannattavuutta **Timely Tasks** toiminnallisuuden kautta. Tämän vuoksi alla oleva ohje ei enää päde ja on täällä vain arkistollisista syistä.

### Yksittäiset tehtävät Timelyyn integraation kautta

Height-integraatio luo uuden tehtävän Timelyyn aina kun **Projekti Timelyyn** -attribuuttiin on valittu **Kyllä**:

> [!NOTE]
> **Huom!** Kannattaa lisätä ensin Projekti Timelyyn -attribuutti ja sitten vasta Kyllä. Joskus rajapinta ei nimittäin havaitse muutosta. Toinen vaihtoehto on tehdä uudestaan jokin pieni muutos tehtävään. Rajapinta ei lisää projektia uudelleen, jos Timely-projektin nimestä löytyy Height Task ID (T-jotain).

 ![](/assets/301c8ae3-1a05-4eb9-bdd6-279e45497139.png)

Projektin luomisesta tulee Height-tehtävään kommentti "Timely-projekti luotu".

 ![](/assets/aa0d45dc-193f-4a2a-8da6-c64f885a9b74.png)

Tästä tulee myös ilmoitus Slackin #timely-kanavalle. Tällöin projektit menevät "Needs update" clientin alle Timelyssä.

 ![](/assets/815474b3-e2d8-439f-8d58-2ac7517a114b.png)

Ei haittaa, vaikka projektin tietoja ei ehditä heti päivittämään, kun niihin voi lähteä heti kellottamaan aikaa.

Jos "Needs update" alta löytyy kuitenkin projekteja, näihin on projektipäällikön on täydennettävä tiedot:

* Asiakasyrityksen koko nimi (mukaan Oy, ry, sr, jne., esimerkiksi Gofore Oyj)
* Asiakkaan brändiväri (tämän voi poimia esim. asiakkaan verkkosivuilta [ColorSnapper](https://colorsnapper.com/) tai ilmaisella [Pika](https://github.com/superhighfives/pika)-työkalulla)
* Vaaditaan aina kuvaus seurattavalle asialle: **Require note when logging to project**

 ![](/assets/f6c57310-0663-4780-9d7e-b38d03222aa4.png)

* Default billable rate: Individual rates

 ![](/assets/be112544-16f2-4a43-b69f-82015030bcee.png)

* Height-taskissa oleva budjetti, joka sovittu asiakkaan kanssa.

 ![](/assets/5d5d00bf-ff42-4c5d-bcfd-2271be1b7b8a.png)
