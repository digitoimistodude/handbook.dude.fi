# Uuden projektin luominen Timelyyn

### Yksittäiset tehtävät

Height-integraatio luo uuden tehtävän Timelyyn aina kun **Projekti Timelyyn** -attribuuttiin on valittu **Kyllä**:

{% hint style="info" %}
**Huom!** Kannattaa lisätä ensin Projekti Timelyyn -attribuutti ja sitten vasta Kyllä. Joskus rajapinta ei nimittäin havaitse muutosta. Toinen vaihtoehto on tehdä uudestaan jokin pieni muutos tehtävään. Rajapinta ei lisää projektia uudelleen, jos Timely-projektin nimestä löytyy Height Task ID (T-jotain).
{% endhint %}

<div align="left">

<figure><img src="../../../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

</div>

Projektin luomisesta tulee Height-tehtävään kommentti "Timely-projekti luotu".

<div align="left">

<figure><img src="../../../.gitbook/assets/image (1) (1).png" alt=""><figcaption></figcaption></figure>

</div>

Tästä tulee myös ilmoitus Slackin #timely-kanavalle. Tällöin projektit menevät "Needs update" clientin alle Timelyssä.

<div align="left">

<figure><img src="../../../.gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure>

</div>

Ei haittaa, vaikka projektin tietoja ei ehditä heti päivittämään, kun niihin voi lähteä heti kellottamaan aikaa.

Jos "Needs update" alta löytyy kuitenkin projekteja, näihin on projektipäällikön on täydennettävä tiedot:

* Asiakasyrityksen koko nimi (mukaan Oy, ry, sr, jne., esimerkiksi Gofore Oyj)
* Asiakkaan brändiväri (tämän voi poimia esim. asiakkaan verkkosivuilta [ColorSnapper](https://colorsnapper.com/) tai ilmaisella [Pika](https://github.com/superhighfives/pika)-työkalulla)
* Vaaditaan aina kuvaus seurattavalle asialle: **Require note when logging to project**

<figure><img src="../../../.gitbook/assets/image (2) (1) (1).png" alt=""><figcaption></figcaption></figure>

* Default billable rate: Individual rates

<figure><img src="../../../.gitbook/assets/image (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

* Height-taskissa oleva budjetti, joka sovittu asiakkaan kanssa.

<figure><img src="../../../.gitbook/assets/image (3) (1).png" alt=""><figcaption></figcaption></figure>

### Ylläpitoprojektit

* Projektin nimi muotoa "Verkkotunnus ylläpito" eli esim. "Sivusto.fi ylläpito" tai esim. "Sivusto.fi Multisite ylläpito", **ylläpito** kirjoitetaan pienellä
* Asiakasyrityksen koko nimi (mukaan Oy, ry, sr, jne., esimerkiksi Gofore Oyj)
* Vaaditaan aina kuvaus seurattavalle asialle: **Require note when logging to project**

<figure><img src="../../../.gitbook/assets/image (1) (1) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

* Ylläpitoprojektin budjetti on kuukausittainen ja valinnat tehdään seuraavasti. Katso kuukausilaskutussumma [Ylläpitoasiakkaat -excelistä](https://docs.google.com/spreadsheets/d/1Z0V7aShadlQDsQ3TtHKSKmD7jlvkJ3v4cWHUEEsobDA/edit#gid=0).

{% hint style="warning" %}
Huom! Kuukausilaskutusprojektien budjettia ei voi enää muuttaa luomisen jälkeen, vaan projektin budjetti lukitaan. Tässä kohtaa kannattaa olla siis esim. summan suhteen tarkkana.
{% endhint %}

<figure><img src="../../../.gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure>

* Valitaan tagiryhmät, asiakasprojekteihin ja ylläpitoprojekteihin **Projektit ja tehtävät**, Duden omiin: Duden sisäiset. Vaaditaan valitsemaan vähintään yksi tägi: **Require at least one tag to be added to an hour**

<figure><img src="../../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

### Pääprojektit

Kokonaan uusissa projekteissa kaikki menee muuten tutulla kaavalla, mutta budjettiin merkitään **myydyt tunnit** seuraavasti:

<figure><img src="../../../.gitbook/assets/image (8).png" alt=""><figcaption></figcaption></figure>
