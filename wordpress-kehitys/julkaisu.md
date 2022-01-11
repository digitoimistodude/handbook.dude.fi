# Julkaisu

Dudella ei tehdä julkaisuja lähtökohtaisesti iltapäivisin ja perjantaisin. Jos jokin menee pieleen, on hyvä että toimistolla on vielä työntekijöitä ja kukaan ei joudu korjailemaan asioita liiaksi työaikojen ulkopuolella. Paras julkaisuajankohta on aamusta tai aamupäivästä ma-ke-akselilla.

Huomaathan, että tätä opasta käytetään ainoastaan silloin kun asiakkaan sivut julkaistaan [Duden palvelimella](https://handbook.dude.fi/palvelimet). Muussa tapauksessa toimitaan tilannekohtaisesti.

#### Miten deploy toimii

Deployn automatisointi tapahtuu [Capistranon](https://capistranorb.com) avulla, joka on osa [digitoimisto/dudestack](https://github.com/digitoimistodude/dudestack)-kokonaisuutta. Ensimmäinen deploy suoritetaan aina Capistranon työkalulla, mutta esim. pienet teemapäivitykset hoidetaan suoralla sftp- tai rsync-yhteydellä.

#### Julkaisut vanhaan projektiin

Jatkokehitykset, freesaukset yms. hoidetaan suoralla sftp- tai rsync-yhteydellä jo aiemmin deployattuun projektiin. Isommat releaset tehdään uudella cap production deploylla.

Muutosten myötä tulee muistaa ngx-pagespeed-välimuistin tyhjennys:

```bash
sudo rm -rf /tmp/pgsp/v3/domain.fi
```

#### Uuden julkaisun vaiheet

Duden julkaisutoimenpiteet eli deploy on monivaiheinen ja varsinaista tiedonsiirtoa ja kansiorakennetta lukuunottamatta ([Capistrano](https://capistranorb.com)) enimmäkseen manuaalinen. Käsipelillä asioiden tekemisellä pyrimme varmistamaan että kaikki on varmistettu ja menee oikein. Kokonaisuudessaan vaiheisiin kuluu testausta lukuunottamatta aikaa noin varttitunti.

26.4.2018 eteenpäin vaiheet 1, 2 on automatisoitu scripteihin (huomaathan käyttää **bashia** _sh_ sijaan, sillä ubuntun sh ei tue read-komentoa).

**1. Deploy-asetustiedoston luominen paikalliseen ympäristöön**

[digitoimisto/dudestack](https://github.com/digitoimistodude/dudestack)in aloitusscripti (lisää kohdassa [Projektin aloitus](https://handbook.dude.fi/wordpress-kehitys/projektin-aloitus)) määrittää oletuskonffit valmiiksi, mutta tuotannon conffiin saattaa joskus tulla muutoksia, joten se tarkistetaan aina erikseen.

Avaa projektikansion sisällä oleva **config/deploy/production.rb**. Jos tiedostoa, ei ole, luo oletustiedostot menemällä Terminalilla projektikansioosi, esimerkiksi `cd ~/Projects/project` ja ajamalla `cap install`. Tämän jälkeen nappaa uusin deployconfig [Cacherista](https://www.cacher.io). Valitse kaikki, kopioi ja liitä projektin alla olevaan avattuun production.rb-tiedostoon.

Korvaa tiedostosta kaikki **DOMAIN** -tekstit projektin oikealla päädomainilla, esim. asiakas.fi. Täytä myös käyttäjätunnuksesi ja salasanasi.

Tuplatsekkaa, että komennot ovat kunnossa, etenkin testiympäristön ja staging (vaiheessa.fi) osoitteet.

**2. Alustavan deployn ajaminen**

Siirry Terminalilla projektikansioosi, esimerkiksi `cd ~/Projects/project` ja aja deploy-komento seuraavasti:

```bash
cap production deploy
```

Saat viestin: **ERROR linked file /var/www/asiakas.fi/deploy/shared/.env does not exist**, tämä on normaalia ja kuuluu asiaan.

**3. Tuotantoympäristön asettaminen tietokantaa varten**

1\. Avaa paikallisen projektin **.env**-tiedosto ja muokkaa siitä **WP\_ENV**=production **DB\_HOST**=ghostin tai craftin paikallinen IP-osoite tähän (craftin tietokantapalvelin on beardfish ja paikallinen IP on 192.168.0.4, ghostin tietokantapalvelin on faith ja paikallinen IP on 192.168.0.6).\
2\. Lisää **DB\_USER** ja **DB\_NAME**-kohtiin esimerkiksi projektin nimi. Jätä salasana toistaiseksi tyhjäksi. Vaihda **WP\_HOME** ja **WP\_SITEURL** -kohtiin projektin oikea tuotanto-osoite, **huom!** http:// tässä vaiheessa, ei https://. SSL-sertifikaatti nimittäin asennetaan myöhemmässä vaiheessa, sitten kun sivut näkyy ulkomaailmalle.

Tässä vaiheessa .env-tiedoston pitäisi näyttää jotakuinkin tältä:

```bash
DB_NAME=projektinnimi
DB_USER=projektinnimi
DB_PASSWORD=
DB_HOST=192.168.0.6

WP_ENV=production
WP_HOME=https://www.asiakas.fi
WP_SITEURL=https://www.asiakas.fi/wp
AUTH_KEY=...
```

Älä tallenna tiedostoa paikallisen tiedostosi päälle, ota se vaan talteen! jätä auki tässä vaiheessa, luodaan seuraavaksi kannan salasana .env-tiedostoa varten.

3\. Seuraavaksi kirjaudu tietokantapalvelimelle seuraavasti. Kirjaudu ensin valitulle edustapalvelimelle (_ghost.dude.fi_, _craft.dude.fi_), aliaksella `craft` tai `ghost`, jos olet luonut sellaisen, jos taas et, perinteisesti `ssh käyttäjänimesi@185.87.110.9` (ghost), `ssh käyttäjänimesi@185.87.110.7` (craft).

4\. Kirjauduttuasi edustapalvelimelle, kirjaudu sitä kautta tietokantapalvelimelle. Jos käytät craftia, kirjaudu beardfish-tietokantapalvelimelle komennolla `ssh käyttäjätunnus@192.168.0.4`, jos taas ghostia, kirjaudu faith-tietokantapalvelimelle komennolla `ssh käyttäjätunnus@192.168.0.6`.

Kun olet palvelimella, kirjaudu tietokannan komentorivitulkille komennolla:

```bash
mysql -u root -p
```

Tämän jälkeen aja seuraavat komennot (ylöspäin painaminen helpottaa, sillä historiasta saat pohjan myös).

Luodaan ensin tietokanta projektille:

```sql
CREATE USER 'projektinnimi'@'192.168.0.7' IDENTIFIED BY 'TÄHÄN_1PASSWORDISSA_GENEROITU_VAIKEA_SALASANA';
```

**Huom!** IP-osoitteeksi tulee paikallinen IP, craftin on 192.168.0.5 ja ghostin 192.168.0.7.

Sitten lisätään oikeudet projektikohtaiselle käyttäjälle:

```sql
GRANT ALL PRIVILEGES ON projektinnimi.* TO 'projektinnimi'@'192.168.0.7';
```

Otetaan muutokset käyttöön:

```sql
FLUSH PRIVILEGES;
```

4\. Tässä vaiheessa kopioi salasana talteen. Tätä salasanaa ei tallenneta mihinkään, edes 1Passwordiin. Liitä salasana auki jättämääsi tallentamattoman .env-tiedoston **DB\_PASSWORD** -kohtaan.

5\. Ellet jo ole, kirjaudu edustapalvelimelle (_ghost.dude.fi_, _craft.dude.fi_), aliaksella `craft` tai `ghost`, jos olet luonut sellaisen, jos taas et, perinteisesti `ssh käyttäjänimesi@185.87.110.9` (ghost), `ssh käyttäjänimesi@185.87.110.7` (craft).

Avaa muokkaukseen tiedosto, josta deploy-komento aiemmin herjasi, tämän näköisellä komennolla:

```bash
nano /var/www/asiakas.fi/deploy/shared/.env
```

Valitse kaikki auki olevasta .env-tiedostostasi ja liitä sisältö komentorivi-ikkunassasi auki olevaan tyhjään .env-tiedostoon. Tallenna näppäinyhdistelmällä ctrl + O ja poistu ctrl + X.

**4. Tietokannan luominen ja tuominen**

1\. Avaa **Sequel Pro**. Kirjaudu gunship -nimiselle staging palvelimelle (tunnukset ja Sequel Pro -asetukset 1Passwordista ja kollegoilta), valitse työstössä olevan projektin tietokanta, valikosta **File > Export…**.

2\. Kirjaudu valitasemallesi tuotantopalvelimelle (craft tai ghost, mainittu aiemmin), valitse vasemman ylälaidan pudotusvalikko ja sieltä **Add Database…**, kirjoita projektin nimi (sama mikä .env **DB\_NAME** kohdassa), valitse kanta ja tuo kanta valikosta **File > Import…**.

Tietokanta on nyt kunnossa ja voidaan siityä eteenpäin.

**5. Projektin koodipohjan julkaiseminen (deploy) palvelimelle**

Aja uudestaan deploy-komento:

```bash
cap production deploy
```

Tällä kertaa komento meneee läpi sujuvasti. Komento ajaa WordPressin, teemat ja lisäosat sisään, sekä korvaa dev- ja staging-urlit tuotannon urlilla (WP-CLI).

Sillä välin kun deployscripti on ajossa, voidaan siirtyä mediakirjaston siirtämiseen.

**6. Mediakirjaston vieminen palvelimelle**

1\. Avaa FileZilla (tai muu käyttämäsi SFTP-ohjelma) ja kirjaudu staging-palvelimelle (gunship). Mene **/var/www/projektinnimi/shared/media** ja kopioi uusimmat mediakirjaston tiedostot sekä backup-kansio paikalliseen projektiisi.

2\. Vedä media-kansion kuvat (ei backup) [ImageOptimin](https://imageoptim.com/mac) läpi.

3\. Kirjaudu tuotantopalvelimelle, jonne projekti on deployattu (craft tai ghost) ja kopioi mediatiedostot tuotantoon **/var/www/asiakas.fi/public\_html/media**.

**7. Virtualhostin luominen tuotantopalvelimelle**

Tässä vaiheessa sivuston tiedostot ja tietokanta ovat paikallaan, mutta mikään muu web-palvelimella ei ole vielä kunnossa tai vastaa osoitteisiin, koska vhostia ei ole luotu. Se tapahtuu automatisoidusti seuraavasti:

```bash
sudo bash /etc/bin/release-site.sh
```

Scripti käytännössä kysyy pelkästään päädomainia ilman www:tä (esimerkiksi asiakas.fi) ja luo nginxiä varten tiedostot kansioihin /etc/nginx/sites-available/, symlinkittää ne käyttöön /etc/nginx/sites-enabled/, luo poolin php-fpm:lle ja käynnistää palvelimet uudestaan sen jälkeen kun on kysynyt sinulta näkyikö testikomennoilla virheitä.

**8. Sivuston toiminnan testaaminen paikallisesti**

Ennen sivut julkaistaan maailmalle päivittämällä domainin nimipalvelintietueita, on hyvä tehdä lopputestaukset ja varmistaa että vhost toimii. Se tehdään muokkaamalla omalla koneella hosts-tiedostoa:

```bash
sudo nano /etc/hosts
```

Lisää tiedoston pohjalle IP (ghost tai craft) ja sen perään asiakkaalla käytössä olevat domainit. Craftin tapauksessa rivi näyttäisi tältä:

```bash
185.87.110.7 asiakas.fi www.asiakas.fi
```

Tallenna näppäinyhdistelmillä ctrl + O ja poistu ctrl + X näppäimillä.

Nyt sinun pitäisi päästä katsomaan sivustoa kun menet selaimella asiakkaan domainiin. Saattaa vaatia selaimen refreshausta tai jopa ihan tuoretta selainta, ei välttämättä ihan heti haista muutosta hosts-tiedostosta.

**10. Oikeudet kuntoon**

Deploy-komennon myötä saattaa usein jäädä esimerkiksi mediakirjaston oikeudet eri käyttäjälle, joten kannattaa ajaa automatisoitu oikeudenkorjaus script (joka pyörii säännöllisesti cronissa, mutta vain kaksi kertaa päivässä):

```bash
sudo bash /etc/bin/correct-permissions.sh
```

**11. Ajolista**

Käy sivut läpi niin edustan puolella kuin wp-adminissakin ja katso että kaikki toimii. Sitten siirry käymään tarkistuslistaa läpi.

Ennen julkaisua ja julkaisun jälkeen käydään aina tarkistuslista huolellisesti läpi. Listaa päivitetään Favroon, josta tulee automaattisesti mukaan uusiin projekteihin.

Tarkistuslista löytyy julkisena Favrosta. [Tässä suora linkki](https://favro.com/organization/3b45e73eaf083f68fefef368/8dc2dfaae17c4b8adbf44eab).

![Ajolista Favrossa](https://handbook.dude.fi/media/xScreen-Shot-2020-12-04-14-26-40.85.png.pagespeed.ic.Gwon6-XkDX.png)

**12. Domainin ja nimipalvelinten ohjaus**

Kun ajolista on käyty läpi, on aika julkaista sivusto maailmalle. Tämä vaihe koskee vain ylläpitoasiakkaita, joiden domain on Duden hallinnassa.

1\. Kirjaudu [Cloudflareen](https://www.cloudflare.com). Mene kohdasta **Menu > domainisi.fi**.\
2\. Kirjaudu [registry.domain.fi](https://registry.domain.fi) tai jos domain on jonkun muun kuin .fi päätteinen, [namecheap.com/myaccount/login](https://www.namecheap.com/myaccount/login). Mene domainin asetuksiin ja päivitä nimipalvelimet ohjeiden mukaisesti (_chan.ns.cloudflare.com_ ja _cody.ns.cloudflare.com_).\
3\. Paina Cloudflaren kautta Re-Check -nappia.\
4\. Poista tässä vaiheessa **/etc/hosts** -tiedostostasi aiemmin asetettu rivi. Tässä vaiheessa odotellaan että sivusto tulee näkyviin.\
5\. Lisää A-recordit. @ ja www -tietueet laitetaaan osoittamaan valitulle palvelimelle (craft: _185.87.110.7_ tai ghost: _185.87.110.9_).\
6\. Odota kun domain tulee voimaan.

**13. HTTPS-sertifikaatin asentaminen**

Kun sivusto näkyy maailmalle ja nimipalvelimet ovat päivittyneet (tämän voit tarkistaa kirjautumalla craftille tai ghostille ja pingaamalla domainia komennolla `ping asiakas.fi`, jos IP ei ole craftin tai ghostin, ei muutos ole vielä voimassa)

Tämäkin työ on automatisoitu ja homman saa hoidettua yhdellä komennolla:

```bash
sudo bash /etc/bin/ssl.sh
```

Seuraa ohjeita tarkasti. Komento generoi sertifikaatin Let’s Encryptillä, eli käytännössä ajaa certbot-auto-komennon listatuille domaineille.

Kun komento on ajettu, sivusto toimii oikein https-osoitteella ja ohjaa http:n https:ään automaattisesti.

**14. Ohjaa asiakas.vaiheessa.fi tuotantoon**

Jos sivustoa ei heti jatkokehitetä, kannattaa staging-osoite ohjata tuotantoon siltä varalta että asiakas menee vahingossa tekemään näyttöversioon muutoksia, jotka eivät tule voimaan tuotantoversioon.

Ohjaus tehdään simppelillä php-tiedostolla, jonka saat kopioitua esimerkiksi edellisestä projektista. Kirjaudu gunshipille komentorivillä ja kopioi edellisestä projektista tai alta tiedosto **redirect-to-production.php** projektin mu-plugins -kansioon:

```php
<?php
/**
 * Redirect staging site to production. Place this file to mu-plugins directory.
 *
 * Plugin Name: Redirect site to production
 * Plugin URI:
 * Description:
 * Version: 1.0.0
 * Author: Digitoimisto Dude Oy, Timi Wahalahti
 * Author URI: https://www.dude.fi
 * Requires at least: 4.7
 * Tested up to: 5.2
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 *
 * @Author:                         sippis, Digitoimisto Dude Oy (https://www.dude.fi)
 * @Date:                           2019-05-15 11:48:23
 * @Last Modified by:   sippis
 * @Last Modified time: 2019-05-15 11:50:20
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit();
}

add_action( 'init', function() {
    wp_redirect( 'https://asiakas.fi' );
} );
```

**15. Loppusilaukset ja viimeiset testaukset**

Tässä vaiheessa on hyvä rämpätä vielä sivusto kertaalleen läpi. Katso myös [ajolistan](https://handbook.dude.fi/wordpress-kehitys/julkaisu#tarkistuslista) **Julkaisun jälkeen** listan kohdat.

Onnittelut, olet juuri julkaissut sivuston!

#### Uuden Air-light teemaversion julkaisuprosessi

Uuden pohjateeman version julkaisussa noudatetaan [air-light](https://github.com/digitoimistodude/air-light#releasing-a-new-version-on-git-and-tagging-principles-staff-only) -repositoryn [julkaisukäytänteitä](https://github.com/digitoimistodude/air-light#releasing-a-new-version-staff-only).
