---
description: Digitoimisto Dude + WordPress = Duden optimoitu palvelinympäristö.
---

# Palvelimet

Me [Dudella](https://www.dude.fi/) uskomme, että verkkosivut ja palvelin kulkevat käsi kädessä. Hyvää laatua ei synny ilman molempia puolia. Jokainen verkkosivusto ansaitsee alleen toimivan moottorin. Alasta poiketen Dude hostaa ja ylläpitää palvelimiaan itse ilman varsinaista kumppania. Taka-alalla palvelee sysop-tiimin kyljessä Multim Oy:n datasalin vahdit.

### Sijainti

Duden **WordPress-optimoidut** dedikoidut rautapalvelimet sijaitsevat fyysisesti [Multim Oy:n](https://www.multim.fi/) datacenterissä Ulvilassa, [Ficolo Oy:n/Vernen Suomen armeijan vanhaan peruskallioluolastoon rakennetussa korkean turvaluokituksen konesalissa](https://finland.verneglobal.com/fi/konesalit/the-rock/)

### Verkkokartta

Duden verkon takaa neljä isointa Internet-palveluntarjoajaa. Jos yksi verkko kaatuu, ei koko infrastruktuuri jää tavoittamattomiin vaan voidaan hyödyntää toisen palveluntarjoajan verkkoa. **Private** [**vlan**](https://fi.wikipedia.org/wiki/Virtuaalil%C3%A4hiverkko) on Duden hopealuoti niin nopean suorituskyvyn, äärimmäisen tietoturvan kuin korkean tason saatavuudenkin osalta.

### Vastuullisuus

Duden palvelimet hyödyntävät [100% vihreää energiaa](https://www.dude.fi/vihreaa-hostingia-100-green-web-hosting). Tästä osoituksena Dudella on päästövapaan [Green Web Foundationin](https://www.thegreenwebfoundation.org/green-web-check/?url=https%3A%2F%2Fwww.dude.fi) virallinen sertifiointi.

### Rauta

Palvelimet on räätälöity perusteita myöten Multim Oy:n kanssa vuonna 2016 Duden tarpeisiin mahdollisimman sopivaksi, WordPress-optimoidusti ja suorituskyky edellä. Kehitys on jatkuvaa.

Rautapalvelimen sisällä on uusimmat suorittimet ja keskusmuistia niin paljon, että se ei lopu kesken. Virtuaalipalvelin hyödyntää SSD-levyjärjestelmää, joka on tavalliseen HDD:seen verrattuna huomattavasti nopeampi suorituskyvyltään.

### Palvelintekniikka

Käyttöjärjestelmänä käytetään uusinta tuettua Ubuntu-serverijakelua, jossa ns. pitkän ajan tuki (LTS). Web-palvelintekniikkana toimii LEMP (Linux, Nginx + ngx-pagespeed, MariaDB, php-fpm), lähtökohtaisesti uusimmat versiot Nginxistä, MariaDB:stä sekä PHP:sta.

Välimuistituksessa on käytössä uusin [ngx-pagespeed](https://developers.google.com/speed/pagespeed/module), joka tekee lukuisia toimenpiteitä suoraan RAM-muistiin, kuten lazylaodaa, pakkaa ja muuntaa sivustojen kuvat uuden sukupolven webp-muotoon fallbackeineen, minifoi HTML:n, CSS:n, JS:n, kuvakkeet ja näin ollen nopeuttaa kaikkia sivustoja. Kannan välimuistituksessa WP:n sisäänrakennettujen transientien ja cache-pluginien lisäksi käytössä on palvelintasolla [Redis](https://redis.io/) ja [ngx\_http\_fastcgi\_module](https://nginx.org/en/docs/http/ngx\_http\_fastcgi\_module.html).

### Päivitykset

WordPress-päivitykset hoidetaan joka **maanantai** ja **torstai** ja [WPSCAN](https://wpscan.org/)-tarkistukset ajetaan päivittäin WordPress-lisäosien haavoittuvuuksien varalta.

Palvelinten huoltoikkuna on joka kuukauden toinen tiistai. Lisää tietoa huolloista ja palvelinten tilasta löytyy osoitteesta [status.dude.fi](https://status.dude.fi/).

### Varmuuskopiot

Varmuuskopiot otetaan aina ennen muutoksia dev-staging-production ympäristöjen välillä, yleisesti tuotannon tietokannoista (.sql) **tunnin välein**, koko sivuston snapshot eli tiedostot ja mediakirjastot (.zip) kerran päivässä. Varmuuskopiontisijainteja ovat ulkoinen verkkolevy, sisäinen verkkolevy sekä ulkoinen pilvipalvelu.

### Tietoturva

Palvelimille on asennettu lukuisia sovelluksia ja komponentteja, jotka seuraavat, tunnistavat ja estävät murtautumisia ja haavoittuvuuksia. Tämän lisäksi Dudella on erilaisia protokollia tietoturvan korkean tason säilyttämiseksi.

### Nimipalvelut ja domainit

Dude on virallinen Traficomin verkkotunnusvälittäjä. Domaineissa Dude luottaa [Suomen viestintävirastoon](https://registry.domain.fi/) (.fi-domainit), [Namecheapiin](https://www.namecheap.com/) (.com, .net, .info ja muut ulkomaiset päätteet) sekä [iwantmynameen](https://iwantmyname.com/) (ulkomaiset ja erikoisemmat päätteet, esim. .business tai .coffee).

Nimipalvelimet (DNS) Dudelle tarjoaa [Cloudflare](https://www.cloudflare.com/).

### Sähköpostivälitys

Sähköpostiliikenteessä välittäjänä käytämme [Mailgunia](https://www.mailgun.com/).

### Aiheeseen liittyviä bloggauksia

{% embed url="https://www.dude.fi/wordpress-optimoitu-palvelin" %}
