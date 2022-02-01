# Stagingiin vieminen

Kun sivuston saatu siihen pisteeseen, että sitä voi selata, se laitetaan testiin ja näytille testipalvelimelle, jota myös näyttöpalvelimeksi (engl. _staging server_) kutsutaan. Duden staging-sivustot sijaitsevat aina omassa domainissaan, joka on muotoa [asiakas.vaiheessa.fi](https://asiakas.vaiheessa.fi). Tietokantapalvelin staging-sivustoille on nimeltään gunship ja sijaitsee osoitteessa gunship.dude.fi.

#### 1. Työkalujen asentaminen

Varmista että sinulla on oikea versio Capistranosta kirjoittamalla projektin juuressa:

```bash
bundle install
```

Jos ylläoleva [bundler](https://bundler.io/man/bundle-install.1.html)-komento ei lähde syystä tai toisesta pelittämään, voit asentaa paketit myös käsin seuraavasti:

```bash
sudo gem install capistrano
sudo gem install capistrano-composer
```

#### 2. Tietokannan luominen (jos ei jo luotu)

Huom! Voit skipata tämän vaiheen, jos olet luonut tietokannan Gunshipille jo [projektin luomisvaiheessa](https://handbook.dude.fi/wordpress-kehitys/projektin-aloitus#luodaan-ensin-tietok).

Kanta täytyy olla Gunshipillä. Kannan luominen: Mene Sequel Pro:hon, avaa localhost, exporttaa lokaali kanta, **File > Export**. Avaa yhteys Gunshipin tietokantapalvelimeen, **Choose Database > Add database > projektinnimi, File > Import**, _kannan sql-tiedosto_.

Tietokantatunnareiden luominen: Kirjaudu ssh:lla:

```bash
ssh tunnus@gunship.dude.fi
```

Sitten kirjoita:

```bash
mysql -u root -p
```

Katso 1Passwordin gunshipistä MySQL root pass. Luo kanta seuraavasti:

```bash
CREATE USER 'projektinnimi'@'%' IDENTIFIED BY '1passwordissa generoitu salasana';
```

Anna oikeudet komennolla:

```bash
GRANT ALL PRIVILEGES ON projektinnimi.* TO 'projektinnimi'@'%';
```

Ota oikeudet käyttöön:

```bash
FLUSH PRIVILEGES;
```

Huom: Jatkoa ajatellen paina ylöspäin niin saat aiemmat komennot ja voit kopata niistä mallia. Älä sulje MySQL-komentoriviä vaan kopioi salasana ja lisää se projektin juureen, .env-tiedoston **DB\_PASSWORD** -kohtaan.

#### 3. Tiedostojen vieminen staging-palvelimelle

1. Mene komentorivillä projektiin, cd \~/Projects/projektinnimi ja varmista että kaikki muutokset ovat masterissa, siirry master branchiin git checkout master ja mergeä tarvittaessa.
2.  Kirjoita `cap install`

    Jos saat _Permission denied (publickey)_ -ilmoituksen, varmista että sinulla on oikeudet käyttää palvelimella GitHubia kirjautumalla sisään ssh:lla: tunnus@gunship.dude.fi ja luomalla avainpari komennolla:

    ```bash
    ssh-keygen -t rsa
    ```

    Tämän jälkeen avainpari haetaan komennolla:

    ```bash
    cat ~/.ssh/id_rsa.pub
    ```

    Sitten GitHubiin, klikkaa avataria ja **Settings > SSH and GPG keys > Title:** _gunship.dude.fi_, **Key**, copy paste komentoriviltä.

    Jos et ole tehnyt stageen deployamista aiemmin, sinun täytyy myös autentikoida githubiin composerin avulla, muuten saat deployssa virheen `Could not authenticate against github.com`. Tämän voit tehdä luomalla tokenin [täällä](https://github.com/settings/tokens/new). Laita nimeksi vaikka Gunship ja ruksaa kaikki oikeudet. Älä sulje sivua, ota token-koodi talteen. Sen jälkeen aja seuraava gunshipillä kirjautumalla sisään ssh:lla: tunnus@gunship.dude.fi:

    ```bash
    composer config github-oauth.github.com TÄHÄN_TOKEN_KOODISI
    ```
3. Avaa config/deploy/staging.rb, `code` tai `nano` komennolla tai avaamalla suoraan editoristasi. Korvaa tiedoston sisältö uusimmalla staging.rb deploy-configilla (löytyy Cacherista, [tässä suora linkki](https://snippets.cacher.io/snippet/85f4dcc54b67f7d12888)).
4. Korvaa **USERNAME\_HERE** omalla gunship.dude.fi-käyttäjätunnuksella (1Password) ja **PASSWORD\_HERE** omalla gunship-dude.fi-salasanalla (1Password). Korvaa **PROJECT\_NAME\_HERE** projektin nimellä (eli pääkansion nimi Projects tai /var/www/ -kansion alla), (⌘ + ⌥ + F). Tarkista että wp-cli komentojen urlit ovat oikein, pitäisi olla _https://projektinnimi.test_ ja _https://projektinnimi.vaiheessa.fi_. Tallenna tiedosto.
5. Tarkista vertaamalla esimerkiksi edellisen julkaisun projektin reposta, että _config/deploy.rb_ näyttää oikealta ja git osoittaa oikeaan paikkaan.
6. Mene komentoriville projektikansioon ja aja `cap staging deploy`
7. Saat viestin: **ERROR linked file /var/www/projektinnimi/shared/.env does not exist**, kuuluu asiaan. Kirjaudu palvelimelle tunnuksillasi `ssh tunnus@gunship.dude.fi`, kopioi polku virheilmoituksesta ja aja komento seuraavasti: `nano /var/www/projektinnimi/shared/.env` (kopioi polku virheilmoituksesta)
8.  Avaa projektin paikallinen .env ja muokkaa tiedostosta seuraavat kohdat kuntoon:

    ```bash
    DB_NAME=projektinnimi
    DB_USER=projektinnimi
    DB_PASSWORD=gunship-kannan salasana tähän
    DB_HOST=185.87.110.10

    WP_ENV=staging
    WP_HOME=https://projektinnimi.vaiheessa.fi
    WP_SITEURL=https://projektinnimi.vaiheessa.fi/wp
    ```

    Saltit ja muut mahdolliset ympäristömuuttujat samat kuin lokaalissa.
9. Poistu palvelimelta komennolla `exit`. Aja uudestaan komento `cap staging deploy`.
10. Mene FileZillaan. Siirrä mediatiedostot kansioon _/var/www/projektinnimi/shared/media_
11. Määrittele kertakäyttösalasana muokkaamalla tiedostoa _/var/www/projektinnimi/shared/.staging\_password_. Lisää salasana Trelloon ja 1Passwordiin.

Lopuksi testaa sivustoa projektin virallisessa osoitteessa projektinnimi.vaiheessa.fi ja ilmoita linkki muille, joiden tarvitsee päästä testaamaan.
