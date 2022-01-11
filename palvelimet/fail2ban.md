# fail2ban



Pääsy palvelimille on rajoitettu sekä tehty muita tietoturvaa parantavia toimenpiteitä. Yksi näistä toimenpiteistä on palvelimille asennettu [fail2ban](https://github.com/fail2ban/fail2ban) joka tarkkailee erilaisia lokitiedostoja ja tarvittaessa estää IP-osoitteen josta tulee haitalliselta vaikuttavaa liikennettä tai hyökkäys. Fail2ban monitoroi mm. WordPressin kirjautumisyrityksiä sekä yleisesti http(s) pyyntöjen määrää. Asetetut estot nollautuvat automaattisesti määrätyn ajan kuluttua.

### Hyödyllisiä komentoja

Alla on listattu yleisimmin käytetyt hyödylliset komennot. Täyden listan mahdollisista komennoista löydät fail2banin [wikistä](https://www.fail2ban.org/wiki/index.php/Commands).

#### Listaa käytössä olevat tarkistukset

```bash
sudo fail2ban-client status
```

#### Aktiivisten estojen tarkistaminen

Listaa estot tarkistuskohtaisesti:

```bash
sudo fail2ban-client status JAILNAME
```

Listaa kaikki aktiiviset estot:

```bash
sudo iptables --list-rules
```

#### Eston poistaminen

```bash
sudo fail2ban-client set JAILNAME unbanip IP
```

#### Eston manuaalinen asettaminen

```bash
sudo fail2ban-client set JAILNAME banip IP
```
