# Handoff suunnittelijalta koodarille

Kun suunnittelija on saanut visuaalisen suunnittelun päätökseen, tulee hänen toimittaa koodareille tarvittavat materiaalit.

### Hand off palaveri

Palaverin aikana käydään läpi ulkoasut ja tehdään niistä tehtävät devaajille Favroon. Palaveriin osallistuu yksi (1) taustakehittäjä ja yksi (1) fronttikehittäjä. Nämä henkilöt ovat he, jotka muutenkin aloittaisivat projektin. Koko tiimin ei tarvitse osallistua palaveriin vaan palaverissa olija briiffaa tarvittaessa muut tiimiläiset.

### Ulkoasut

Suunnittelijan on varmistettava, että uusin hyväksytty versio löytyy aina Figmasta (työkalusta lisää kohdassa [Työkalut & Workflow](https://handbook.dude.fi/tyoskenteleminen-dudella/tyokalut-workflow)).

### Valokuvat

Kuvat löytyy Figmasta ladattavina assetteina. Suunnittelijan on huolehdittava, että kaikki asiat on mahdollista ladata. Kuvat ovat valmiiksi leikattuja ja syvättyjä. Tarvittaessa suunnittelija voi toimittaa devaajalle valokuvia zip-paketissa.

### Fontit

Emme käytä Adobe/Typekit/Google -upotuksia, vaan fontit olisi hyvä olla tiedostoina paremman toimivuuden, hallinnan ja latausnopeuksien vuoksi, näin säästymme ylimääräiseltä ulkoiselta HTTP-kutsulta.

Paikallisilla fonteilla varaudumme myös, että sivusto toimii ilman JS:ää eikä Adblockerit tai muut tietoturvatyökalut blokkaa fonttien latautumista. Jos muita webfonttimuotoja ei ole saatavilla, .ttf riittää.

### Logo sekä kuvakkeet

Logoista ja kuvakkeista tarvitaan taittoa varten **SVG**-versiot, jotta sivustolle saadaan retinaa tukeva moderni versio, joka näkyy joka laitteella terävästi. Logot ja kuvakkeet on ladattavissa Figmasta suoraan.

Joissakin tapauksissa logot tai kuvakkeet voidaan toimittaa suoraan koodarille. Tällöin ne tulee tallentaa vektorityökalun kautta niin että skaalautuvuuden mahdollistama viewBox-määritys tulee mukaan. Illustratorissa SVG-kuva tulee oikeaan muotoon kun käytetään `Presentation attributes` -asetusta, jolloin SVG-tiedostoon ei tule ylimääräisiä inline style-määritteitä. Filleinä tai strokeina tulee olla currentColor-arvo hexan sijaan, näin väri saadaan määriteltyä koodeitse helpommin.

Tarvittaessa, monimutkaisempien SVG-kuvakkeiden kohdalla voidaan käyttää muita määrityksiä kuten style-attributes, mutta nämä varmistellaan aina erikseen.
