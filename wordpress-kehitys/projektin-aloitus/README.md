# Projektin aloitus



Dude-ympäristön pystytysohjeet uudelle tietokoneelle löytyy GitHubista, [dudestack/instructions](https://github.com/digitoimistodude/dudestack-instructions).

Vaikka projektin aloitustoimenpiteemme ovatkin enimmäkseen automatisoituja, on jonkin verran manuaalista työtä, sillä kaikkea ei voi eikä kannata automatisoida huolellisuuden kustannuksella. Projektiin myöhemmin mukaan hyppäävät eivät voi käyttää aloituskomentoja, näin ollen asioita on tehtävä käsin [myöhemmin projektiin mukaan tulevat -ohjeen](https://handbook.dude.fi/wordpress-kehitys/projektin-aloitus/myohemmin-projektiin-mukaan-tulevat) mukaisesti.

#### Ensimmäisen aloittajan tehtävät

1\. Ensimmäinen projektin parissa aloittava dude aloittaa projektin ajamalla aloituskomennon (ensimmäisellä kerralla `cd /var/www/dudestack/bin && bash macos.sh`):

```bash
createproject
```

Scripti kysyy oleelliset tiedot projektista, kuten projektin nimen. Sen jälkeen automaatio luo projektin raamit ([digitoimistodude/dudestack](https://github.com/digitoimistodude/dudestack)), luo devausympäristöön ([digitoimistodude/macos-lemp-setup](https://github.com/digitoimistodude/macos-lemp-setup)) virtualhostin sekä WordPress-stackin asiakkaan projektia varten.

2\. Seuraavaksi ajetaan Air-light-teeman alta `bash newtheme.sh` (kloonaa [digitoimistodude/air-light](https://github.com/digitoimistodude/air-light) koneellesi ja mene cd-komennolla bin-kansioon). Tämä tarpeelliset tiedot kysyttyään luo projektiimme aloitusteeman.

3\. Ensimmäinen aloittaja luo seuraavaksi tietokannan kehityspalvelimelle (gunship) seuraavasti. Tämä siksi, että sivustolla tehdyt muutokset pysyy samaan aikaan syncassa asiakkaalla ja kaikilla devaajilla ilman että tarvitsee jatkuvasti harrastaa import-export-import-rallia.

```bash
ssh tunnuksesi@gunship.dude.fi
```

```bash
mysql -u root -p
```

Luodaan ensin tietokanta projektille (gunship), **huom! Älä sulje komentorivi-ikkunaa, jotta salasana jää tässä kohtaa talteen**:

```sql
CREATE USER 'projektinnimi'@'%' IDENTIFIED BY 'TÄHÄN_1PASSWORDISSA_GENEROITU_VAIKEA_SALASANA';
```

Sitten lisätään oikeudet projektikohtaiselle käyttäjälle:

```sql
GRANT ALL PRIVILEGES ON projektinnimi.* TO 'projektinnimi'@'%';
```

Otetaan muutokset käyttöön:

```sql
FLUSH PRIVILEGES;
```

4\. Uploadaa createprojectin kautta luotu paikallinen tietokanta gunshipille Sequel Prolla ja vaihda tiedot .env-tiedostoon.

5\. Tämän jälkeen projektin aloittaja tallentaa .env- määritykset sekä [Resilio Sync](https://www.resilio.com/individuals/) -linkin 1Passwordiin Secure Noteksi. Tarvittaessa aloittajadevaaja jakaa tunnareita Slackin tai Trellon kautta muille projektissa mukana oleville devaajille.

6\. Avaa projekti editoriisi käyttämäsi editorin komennolla, esim. `code ~/Projects/projektinnimitähän` (Visual Studio Code) tai `subl ~/Projects/projektinnimitähän` (Sublime Text). Tämän jälkeen tallenna projekti nimellä painamalla ⌘ + ⇧ + P ja kirjoittamalla **Add New Project** ja enter. Nimeä projekti samalla nimellä kuin kansio, eli uudelleen enter. Tämän jälkeen löydät projektisi jatkossa kun painat ⌘ + + ⇧ + O (jos ei toimi niin varmista että [keybindings.json](https://github.com/ronilaukkarinen/vscode-settings/blob/01ad756ad23364365543bc0268cf61da08359465/keybindings.json#L8) on käytössä, tämän saat varmistettua kun haet ⌘ + ⇧ + P ”Preferences: Open Keyboard Shortcuts (JSON)” ja katsot löytyykö kyseinen näppäinkomento).

#### WordPress Network / Multisite

Jos projektissa tullaan hyödyntämään WordPressin Network (vanhalta nimeltään Multisite) toiminnallisuuksia, seuraavat lisävaiheet on vaadittuja.

1\. Salli Network asennuksen luominen lisäämällä `config/application.php` tiedostoon rivit ennen Redisksen asetuksia

```php
/* Multisite */
Config::define( 'WP_ALLOW_MULTISITE', true );
```

2\. Navigoi hallintapaneelissa kohtaan **Työkalut** > **Verkon asennus**. Asenna verkko käyttäen asiakkaan/projektin nimeä, yleistä Duden tunnuksen sähköpostiosoitetta sekä alihakemistoja.

3\. Onnistuneen asennuksen jälkeen lisää hallintapaneelissa näkyvät rivit `config/application.php` tiedostoon heti aiemman `WP_ALLOW_MULTISITE` lisäyksen perään.

4\. Muokkaa projektin nginx-vhost konfiguraatiota siten, että ensimmäisen `server` blokin lopussa on seuraavat rivit. Ilman näitä muutoksia verkon hallinta ja muut sivustot eivät tule toimimaan.

```nginx
# Rewrites for Bedrock multisite subdomain setup
# network and base site
rewrite /wp-admin$ $scheme://$host$uri/ last;
rewrite ^/(wp-.*.php)$ /wp/$1 last;
rewrite ^/(wp-(content|admin|includes).*) /wp/$1 last;

# sites in subdirectories
if (!-e $request_filename) {
  rewrite /wp-admin$ $scheme://$host$uri/ permanent;
  rewrite ^/[_0-9a-zA-Z-]+(/wp-.*) /wp$1 last;
  rewrite ^/[_0-9a-zA-Z-]+(/.*\.php)$ /wp$1 last;
}
```

Tiedoston pitäisis näyttää kokonaisuudessaan kutakuinkin tältä:

```nginx
server {
    listen 443 ssl http2;
    include php7.conf;
    include global/wordpress.conf;
    root /var/www/project;
    index index.html index.htm index.php;
    server_name project.test;

    ssl_certificate /var/www/certs/project.test.pem;
    ssl_certificate_key /var/www/certs/project.test-key.pem;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_dhparam /etc/ssl/certs/dhparam.pem;
    ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_stapling_verify on;
    add_header Strict-Transport-Security max-age=15768000;
	
	# Rewrites for Bedrock multisite subdomain setup
    # network and base site
    rewrite /wp-admin$ $scheme://$host$uri/ last;
    rewrite ^/(wp-.*.php)$ /wp/$1 last;
    rewrite ^/(wp-(content|admin|includes).*) /wp/$1 last;

    # sites in subdirectories
    if (!-e $request_filename) {
     rewrite /wp-admin$ $scheme://$host$uri/ permanent;
     rewrite ^/[_0-9a-zA-Z-]+(/wp-.*) /wp$1 last;
        rewrite ^/[_0-9a-zA-Z-]+(/.*\.php)$ /wp$1 last;
    }
}

server {
    listen 80;
    server_name project.test;
    return 301 https://$host$request_uri;
}
```

Tämän jälkeen käynnistä web-palvelin uudelleen komennolla:

```bash
sudo brew services restart nginx
```

Tai jos sinulla on [alias](https://github.com/digitoimistodude/macos-lemp-setup#use-linux-style-aliases), käytä seuraavaa samoin kuin käyttäisit staging/production-palvelimella:

```bash
sudo service nginx restart
```

**Huom!** komennon ajaminen sudolla on tässä tärkeää, muuten muutokset eivät tule voimaan.

5\. Jotta WordPress osaa ladata verkon hallinnan ja muut sivustot oikein, lisää projektissa `content` hakemistoon [Cacherista löytyvä](https://snippets.cacher.io/snippet/0ab9ba42bbfb15b8cfe6) `sunrise.php` tiedosto. Muista korvata kaikki ”projectname” tekstit projektin nimellä.

6\. Jotta kaikkien sivustojen mediakirjastot toimisivat oikein, lisää projektissa `content/mu-plugins` hakemistoon [Cacherista](https://snippets.cacher.io/snippet/4fc7a00cf0c2650e473b) `0-air-helper-media-fix.php` nimellä löytyvä lisäosa.

7\. Jotta pääsivun osoitteen lopussa ei ole ”/wp” hakemistopolkua, lisää projektissa `content/mu-plugins` hakemistoon [Cacherista](https://snippets.cacher.io/snippet/663e1414f12c7a5bc98d) `5-network-main-site-url-fixer.php` nimellä löytyvä lisäosa.

8\. Salli edellä lisättyjen tiedostojen vienti git-repositoryyn lisäämällä `.gitignore` tiedostoon rivit

```
!content/mu-plugins/0-air-helper-media-fix.php
!content/mu-plugins/5-network-main-site-url-fix.php
```
