# Pävitykset ja ylläpito

Dudelle on tärkeää, ettei pienikään sivusto jää mätänemään. Päivitykset suoritetaan jokaisen viikon maanantai ja torstai ([ManageWP](https://managewp.com)). Ennen päivityksen suorittamista on katsottava Changelogista mitä päivitys pitää sisällään. Jos kyseessä on korjauspäivitys, voi päivityksen suorittaa ilman ennakkotarkistuksia.

Isompia päivityksiä varten otetaan aina tietokannasta varmuuskopio ennen päivittämistä. Automaattiset varmuuskopiot lähtevät kolmelle verkkolevylle joka yö, mutta silti otetaan paikallinen kopio omalle koneelle. Tarvittaessa tehdään rollback-toimenpiteet.

### Vanhan hostingin siirtäminen Duden ylläpitoon

Asiakkaalta tarvitaan siirtoa varten .fi -domaineista _välittäjänvaihtoavain_, ulkomaisista .com-domainista lukituksen poisto sekä _EPP Code_, eli siirtokoodi.

Uudet kotimaiset domainit varataan [Viestintäviraston](https://registry.domain.fi) kautta suoraan, ulkomaiset domainit varataan [Cloudflarelta](https://www.cloudflare.com) tai erikoisemmat TLD:t [iwantmyname.comin](https://iwantmyname.com) kautta.

Jos asiakas haluaa pitää nimipalvelun ja/tai domainin itsellään, on asiakkaalle ilmoitettava IP-osoite A-recordien (@ ja www) päivittämistä varten. Vanhan sivuston varmuuskopionti voidaan myös tehdä, silloin asiakas toimittaa SFTP + MySQL -tunnukset vanhaan hostingpalveluunsa.

Sähköpostit voidaan myös siirtää Dudelle (G Suite) tarvittaessa siirtotyömaksua vastaan.
