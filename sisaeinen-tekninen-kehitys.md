# Sisäinen tekninen kehitys

Dudelle on tärkeää kehittää omia työkaluja ja toimintamalleja tehokkaammaksi jo päivä- tai viikkotasolla. Tämä sivu koskee sisäistä tekniikkaa ja toimintatapaa.

Keskisimpiä sisäisiä projekteja ja työkaluja voivat olla esimerkiksi:

* [dudestack](https://github.com/digitoimistodude/dudestack)
* [macos-lemp-setup](https://github.com/digitoimistodude/macos-lemp-setup)
* [devpackages](https://github.com/digitoimistodude/devpackages)
* [air-light](https://github.com/digitoimistodude/air-light)
* [air-helper](https://github.com/digitoimistodude/air-helper)
* [dude](https://github.com/digitoimistodude/dude)
* [vscode-settings](https://github.com/ronilaukkarinen/vscode-settings)

### Kehityksen toimintamalli

Pohjateemaa ([air-light](https://github.com/digitoimistodude/air-light)) ja tukilisäosaa ([air-helper](https://github.com/digitoimistodude/air-helper)) on tarkoitus päivittää aina kun vastaan tulee perusteltavissa oleva asia, jota esimerkiksi käyttää jokaisessa projektissa. Kehityksen toimintamalli on hyvinkin nopeatempoinen ja joustava, jossa erityisesti [pohjateemaan](https://github.com/digitoimistodude/air-light) muutoksia lisätään sitä mukaa kun niitä tulee vastaan. Tarvittaessa muutoksia käydään läpi ja iteroidaan devitsekissä.

Lähtökohtaisesti sisäisessä kehityksessä noudatetaan [Duden tuttuja git-käytänteitä](<.gitbook/assets/git open source>).

Nyrkkisääntö muutoksiin: On parempi että _jatkuvaa_ kehitystä syntyy kuin että se jää paikoilleen odottamaan ”sopivaa hetkeä”.

### Releaset

**Pienet ei-breaking change muutokset:** Relesointia voi tehdä GitHub-versioon, jos sille on hyvät perusteet. Muissa tapauksissa, kuten isommissa pompseissa muutoksia tai perusteellisempaa tutkailua vaativissa asioissa on syytä tehdä Pull Request tai oma branch.
