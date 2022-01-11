# Myöhemmin projektiin mukaan tulevat

Jos projekti on jo aloitettu ja tulet siihen mukaan myöhemmässä vaiheessa, tai otat vanhan projektin työstöön, saat sen toimintaan seuraavilla vaiheilla.

1\. Muut mukaan tulevat devaajat menevät [Duden Githubiin](https://github.com/digitoimistodude/), josta valitsevat aloitetun projektin kloonaavat projektin **Code**-nappulan avulla `~/Projects` -hakemistoon (Terminalissa: `cd ~/Projects` ja sen jälkeen git clone _url_).

![Ohjeistuskuva, paina ensin Code-nappia](https://handbook.dude.fi/media/Screen-Shot-2021-01-21-13-29-22.56.png)

2\. Luo uusi tiedosto projektikansion alle nimeltä `.env` (esim. `code .env` tai `nano ~/Projects/projektinnimi/.env`) ja lisää sinne saamasi tiedot. Tyypillinen .env-tiedosto näyttää tältä:

```properties
DB_NAME=tässä_on_oikea_tietokannan_nimi
DB_USER=tässä_on_oikea_käyttäjätunnus
DB_PASSWORD=tässä_on_oikea_salasana
DB_HOST=tässä_on_oikea_ip

WP_ENV=development
WP_HOME=https://projektinnimi.test
WP_SITEURL=https://projektinnimi.test/wp
AUTH_KEY='ts[h@+i#]w`Zj%$!*+N:b*K$re9;w*mQ:;Y76G@~wx?::9%j@~}i3dmz|Jcl{|'
SECURE_AUTH_KEY='gJ6.c|6+v~`s}0,^945V#uY]TXuW9gV&Po!SnCKJsB2fV-WlLd]629mm~8_;qXL'
LOGGED_IN_KEY='Eu`SWA<^2P_P:1?i|c=541(&QMYM3h[,B$L]az02%He@;c).e#08zEL&*;oGd/AF'
NONCE_KEY='@#p@/&A@jEJeGo|K}0fm`R8NcaQaA @??J:%97[|c>Gr>*eO[qFAe|$h|qhA?)z'
AUTH_SALT=':ov!]~U]=Jqjy.o#*EddJd*Qd,YD=D3~S{ZC%gn7QD*%y+MbwQf5U iX&69:QYP'
SECURE_AUTH_SALT='Ck(dq+!6vNHTF-U1xZt*IBAk.n)+4DH=Nl;4d5xyf4*LLy?8]sLsT@DO]iGOM$H}'
LOGGED_IN_SALT=']CR.^maG`L*oKL?3 qiTTXE2~)b2m>NPFBKhOKNE qSt1R K8+`nOu&Ea*,n6G2'
NONCE_SALT='?8|fjJSNs8=LwJt6dkWrY*.~(# +EpUC]TI,~}HhVzS*9@K$ =+H!{wOYeG>t}rd'

ACF_PRO_KEY=tässä_on_oikea_API_key
SENDGRID_API_KEY=tässä_on_oikea_API_key
IMAGIFY_API_KEY=tässä_on_oikea_API_key
```

3\. Jos **et käytä** gunshippiä vaan paikallista tietokantaa, avaa Sequel Pro, luo tyhjä tietokanta, sitten lataa työkaverilta saamasi tietokanta sisään valikosta File > Import.

4\. Seuraavaksi haetaan riippuvuudet ajamalla projektin juuressa:

```bash
composer install && npm install
```

5\. Sitten teeman riippuvuudet menemällä teemakansioon

```bash
cd ~/Projects/projektinnimi/content/themes/teemannimi
```

Tämän jälkeen asenna paketit komennolla:

```bash
npm install
```

6\. Sitten asetetaan manuaalisesti _/etc/hosts_ -tiedostoon projektin isäntärivi, jotta kehityspalvelin osaa yhdistää oikeaan projektiin, esimerkiksi suoraan komentoriviltä muokkaamalla hosteja seuraavasti:

```bash
sudo nano /etc/hosts
```

IP on Duden natiivilla macOS LEMPillä ([digitoimistodude/macos-lemp-setup](https://github.com/digitoimistodude/macos-lemp-setup)) `127.0.0.1`. Lisää hosts tiedostoon viimeiselle riville seuraavasti:

```bash
127.0.0.1 projektinnimi.test
```

Lisää vhosts-kansioon /etc/nginx/sites-enabled tiedosto `projekti.test` (jos projektisi nimi on ”projekti”) komennolla `sudo nano /etc/nginx/sites-enabled/projektinnimi.test` jonne sisältö:

```nginx
server {
    listen 443 ssl http2;
    root /var/www/project;
    index index.php;    
    server_name project.test;

    include php7.conf;
    include global/wordpress.conf;

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
}

server {
    listen 80;
    server_name project.test;
    return 301 https://$host$request_uri;
}
```

Jos käytössä on Multisite/Network install, vhost on tämän näköinen:

```nginx
server {
    listen 443 ssl http2;
    include php7.conf;
    include global/wordpress.conf;
    root /var/www/project;
    index index.html index.htm index.php;
    server_name project.test;

    # Rewrites for Bedrock multisite subdomain setup
    # network and base site
    rewrite /wp-admin$ $scheme://$host$uri/ last;
    rewrite ^/(wp-.*.php)$ /wp/$1 last;
    rewrite ^/(wp-(content|admin|includes).*) /wp/$1 last;

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

SSL-sertifikaattia varten aja seuraava komento ([mkcert](https://github.com/FiloSottile/mkcert) pitää olla asennettuna):

```bash
mkdir -p /var/www/certs && cd /var/www/certs && mkcert "project.test"
```

Tallenna näppäinyhdistelmällä ctrl + O ja poistu ctrl + X. Seuraavaksi testaa että konffi on oikein:

```bash
sudo nginx -t
```

Tämän pitäisi antaa tulokseksi:

```bash
nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok
nginx: configuration file /usr/local/etc/nginx/nginx.conf test is successful
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

Yllä olevat tukeutuvat täysin siihen, että olet asentanut LEMP-web-palvelimemme oikeaoppisesti ([digitoimistodude/macos-lemp-setup](https://github.com/digitoimistodude/macos-lemp-setup)) JA lisännyt myös aliakset [tämän sivun pohjalta](https://github.com/digitoimistodude/macos-lemp-setup#post-install).

7\. Aseta mediakansio paikalleen Resilio Syncillä (olet saanut projektin aloittajalta linkin tai zip-tiedoston) projektikansion alle `media/` -hakemistoon.

8\. Luo itsellesi branch, [katso ohjeet tästä](https://handbook.dude.fi/wordpress-kehitys/git-open-source#branchin-luominen).

9\. Kirjaudu tarvittaessa sisään käyttämällä 1Passowordista löytyviä tunnuksia tai jos niitä ei ole, luo itsellesi WordPress-tunnus ajamalla wp-cli projektikansiossa (täydennä tähän komentoon tietosi):

```bash
./vendor/wp-cli/wp-cli/bin/wp user create etunimi nimesi@dude.fi --role=administrator --user_pass=TÄHÄN_ONEPASSWORDILLA_GENEROITU_VAIKEA_SALASANA --first_name=Etunimi --last_name=Sukunimi --display_name=Etunimi
```

Näin projektin kollaboraatio saa alkaa!

[Lisää git-käytänteistä.](https://handbook.dude.fi/wordpress-kehitys/git-open-source)

#### Mahdolliset virhetilanteet legacy-projekteissa

Siirryimme käyttämään gulpin versio 4:sta 26.8.2020 ([Migrate to gulp 4, #088bece](https://github.com/digitoimistodude/air-light/commit/088bece978d530b795aaddcb7b134cd8ceb4dbd7#diff-3d7a4d229da48a5168c38ae7c9481d90654c540d6e389128f5d567d76d12ff78)). Tätä edeltävät projektit käyttävät gulp v3:sta. Gulp 3 tukee gulp 4:sta, mutta gulp 4 ei tue gulp 3:sta. Gulp3 ja gulp4 välillä tuli muutamia breaking changeja ja esimerkiksi autoprefixerin 7-versio vaatii vähintään gulp v4:n. Gulp v3 ei toimi node v12 tai uudemmalla, joten nämä voivat aiheuttaa ongelmatilanteita. Tässä pari tyypillisintä:

```bash
ReferenceError: primordials is not defined
```

Jos käytät Gulpin versiota, joka alkaa numerolla 3 ja samanaikaisesti järjestelmässäsi on asennettuna node, jonka versio on uudempi kuin 12, ei gulp lähde käyntiin. Paras tässä kohtaa on downgradettaa node versioon 10.22.0, jolla toimii sekä uudet että vanhat projektit. Oman gulp-versiosi näet komennolla:

```bash
gulp --version
```

Ja node-versiosi komennolla:

```bash
node --version
```

Laske node versioon 10.22.0 seuraavasti:

```bash
sudo npm install -g n
sudo n 10.22.0
```

Jos saat seuraavanlaisen virheen node-sassista tai muusta paketista, se johtuu siitä että noden riippuvuuksia on vielä olemassa uudemmalle nodelle.

```bash
Node Sass could not find a binding for your current environment: OS X 64-bit with Node.js 10.x
```

Tämän voit korjata helposti rebuildaamalla paketin vanhemmalle nodelle:

```bash
npm rebuild node-sass
```

Nyt kaiken pitäisi toimia oikein.
