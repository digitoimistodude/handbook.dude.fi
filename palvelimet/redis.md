# Redis

Palvelimilla on asennettuna [Redis](https://redis.io) object-cache joka nopeuttaa sivustojen toimintaa huomattavasti. Kaikilla vanhoilla sivustoilla ei ole Redistä käytössä ja uusissakin projekteissa se otetaan käyttöön tarvekohtaisen harkinnan perusteella.

Rediksen käyttämiseksi sivustolle on asennettava [Redis Object Cache](https://wordpress.org/plugins/redis-cache/) -lisäosa (automaattisesti uusissa projekteissa), `config/application.php` tiedostoon lisättävä Rediksen [asetukset](https://github.com/digitoimistodude/dudestack/blob/master/config/application.php) (automaattisesti uusissa projekteissa) sekä `.env` tiedostoon lisättävä Rediksen salasana. `.env`-tiedot löytyvät tarvittaessa myös 1Passwordista nimellä **Object Cache Pro .env entries**.

Asenna object-cache-pro composerin kautta [seuraamalla virallisia ohjeita](https://objectcache.pro/docs/composer-installation/). Nämä voi ajaa suoraan tuotantopalvelimella deploy/current-kansiossa (craft/ghost).

### Hyödyllisiä komentoja

Laita Object cache drop-in päälle ajamalla tämä tuotantopalvelimen deploy/current-kansiossa:

```bash
wp redis enable --force
```

Nollaa cache ajamalla deploy/current-kansiossa:

```bash
wp redis flush
```

#### Monitorointi

Rediksen käyttöönoton jälkeen sen toimintaa kannattaa tarkkailla hetki komennolla

```bash
redis-cli -a PASSWORD monitor
```



\
