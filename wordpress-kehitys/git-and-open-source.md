# Git & open source

Dude käyttää versionhallintaan gitiä, vuodesta 2013 vuoteen 2018 asti Bitbucketia, vuodesta 2019 eteenpäin GitHubia. Kaikki oleellinen koodi tulisi säilyttää git-repositoriossa, mutta arkaluontoiset tiedot kuten tunnukset .env-tiedostossa.

**Kaikki minkä voi, tulee julkaista open sourcena**, avoimena täysin julkisena [Duden GitHub-tilin alla](https://github.com/digitoimistodude). Näitä voivat olla omat tekniikat, WordPress-teemat tai -lisäosat, joita voisi kuvitella muidenkin käyttävän. Asiakasprojektit ja muut ei-julkiset kehityskohteet julkaistaan GitHubissa Private repositoriossa, jotka näkyvät ainoastaan Duden tiimille.

### Gitin käyttö asiakasprojekteissa

Committeja ei saa jättää jemmaan, vaan ne tulee pushata aina hyvissä ajoin, etenkin silloin kun kun tietää olevansa poissa ruudulta. Omat branchit tulee mergetä pääbranchiin aina kun tarvitsee viedä muutoksia muiden käyttöön ja jos ei niin merge tehdään viimeistään työpäivän päätteeksi. Etenkin projektin aktiivisessa kehitysvaiheessa tämä on tärkeää ja suurempien muutosten jälkeen edellytys. Näin projektin jatkokehittäjä eli työkaveri saa uusimmat muutokset ajoissa, eikä pääse syntymään merge conflicteja, jossa useampi taho on muokannut samaa kohtaa vahingossa.

Muutoksia voi niputtaa samaan committiin, esimerkiksi ”Improving readability”, jossa voi olla useampi typografiamuutos samassa. Nyrkkisääntönä sopiva toiminto-/ tai tyylittelyvälin etappi. Näissä on suotavaa käyttää omaa maalaisjärkeään.

### Git-pikaohje komentorivillä

```bash
git status
```

Näe nykyisen edistymisesi tila, mitä on committaamatta, mitä lisättynä, missä mennään. Tälle komennolle on luotu elämää helpottamaan alias `s` (tämän sivun alalaidassa).

```bash
git add --all
```

Lisää kaikki tiedostot ja alikansioiden tiedostot gittiin. Eli sen jälkeen kun olet tehnyt mitä tahansa muutoksia, kannattaa ajaa tämä. Muutosten suuruus ja laajuus on kiinni sinusta, mutta pidä muutosten vientiväli järkevänä. Esimerkiksi: olet lisännyt värit elementeille tai napeille ja haluat viedä ne muutokset muille devaajille. Tälle komennolle on luotu elämää helpottamaan alias `a` (tämän sivun alalaidassa).

```bash
git commit -m 'Some really fancy and descriptive commit message'
```

Commit-viestien tulee olla selkeitä ja kuvaavia, jotka kertovat mitä muutoksia commitin mukana tulee. Massiivisia committeja (esim. yksi commit joka sisältää puolen päivän työt yhdessä commitissa) tulisi välttää ja pyrkiä committaamaan sen sijaan jokainen toiminto erikseen. Pienetkin tyylimuutokset pitää pyrkiä committaamaan (esim. nappien tyylit tai fonttien säädöt) ja pushaamaan mahdollisimman aikaisessa vaiheessa, jotta vältytään konflikteilta. **Ei hillota committeja!** Tämä tarkoittaa sitä että tehdään esimerkiksi 3-6 committia ja pushataan ne sitten GitHubiin. Keskeneräisyydellä ei ole väliä, ellei muutos ole menossa suoraan tuotantoon.

```bash
git push -u origin HEAD
```

Pushaa eli ”työnnä” muutokset muiden nähtäville ja työstettäville. Push-viestit menevät myös Slackiin, jotta koko työyhteisö näkee edistymisen. Dude **ei käytä** push-to-deploy tapaa, joten ei ole vaaraa siitä että muutokset menisivät minnekään tuotantoympäristöön näkyville. Muistathan kuitenkin tarkistaa mitä pushaat. Tälle komennolle on luotu elämää helpottamaan alias `p` (tämän sivun alalaidassa).

### Branchit

Jokaisella dudella on oma branchinsa eli ”kehitysoksansa” kun työskennellään samassa projektissa. Omassa työstövaiheessa luodaan branch muotoa `wip-omanimi`, esimerkiksi Ronin työstö tapahtuu koko ajan branchissa `wip-roni` (_wip_ as in Work in Progress). Jos vain ja ainoastaan yksi kehittäjä kehittää projektia koko projektin ajan tai tekee yksittäisen muutoksen esimerkiksi julkaisun jälkeen, voi tarvittaessa muutokset tehdä suoraan `master`-branchiin.

Isompia ominaisuuksia tai leiskoja rakentaessa luodaan oma branch, muotoon `feature-featurennimi` tai `layout-viewinnimi`. Ominaisuuden branch voi olla esimerkiksi `feature-events-2018` tai `feature-shop-integrations` kun taas uuden layoutin branch voi olla `layout-new-staffmembers`.

### Branchin luominen projektin alussa

Branchin luominen gitissä on yksinkertaista. Seuraavalla komennolla näet mitä brancheja on tällä hetkellä saatavilla ja missä olet:

```bash
git branch
```

Seuraavalla komennolla luot oman branchisi:

```bash
git branch branchisinimi
```

Seuraavalla komennolla siirryt omaan branchiisi:

```bash
git checkout branchisinimi
```

Muista että voit tarkistaa missä olet komennolla `git status` (tai aliaksella `s`).

### Branchien mergeäminen eli yhdistäminen

Brancheja pitäisi kehityksen aikana mergetä mahdollisimman tiuhaan masteriin, mutta mielellään aina silloin kun ei ole isompia kesken. Mergeily kannattaa myös keskeneräisissä tilanteissa erityisesti silloin kun muukin tiimi tarvitsisi mergettävää asiaa.

**Huom!** Erityisesti frontin koodailun puolella muista tappaa gulp-prosessi ctrl + C -näppäinyhdistelmällä ennen branchista poistumista. Jos gulp on ajossa, watch-task rullaa muuttuneita scss ja js-tiedostoja, jolloin tulee turhia muutoksia välissä.

Muista kommunikaatio, varmista että työkaveri on mergennyt oman branchinsa masteriin. Sitten, hae masterista uusin versio menemällä master branchiin:

```bash
git checkout master
```

Tämän jälkeen hae masterista uusin versio:

```bash
git pull
```

Sitten mergeä master omaan branchiisi:

```bash
git merge branchisinimi
```

Pushaa merge (komennolla alla tai aliaksella `s`):

```bash
git push
```

Tämän jälkeen voit siirtyä omaan branchiisi takaisin:

```bash
git checkout branchisinimi
```

Mergeä vielä mahdollisesti muuttunut master omaan branchiisi:

```bash
git merge master
```

Pushaa merge (komennolla alla tai aliaksella `s`):

```bash
git push
```

### Merge conflict

Tuliko merge conflicti? Yleensä merge conflict on helppo selvittää. Merge conflictin tullessa tärkeintä on selvittää mitä tiedostoja on muokattu ja mikä muokkaus on uusin. Muuttuneet tiedostot saat näkyviin tuttuun tapaan `git status` (tai aliaksella `s`).

Jos merge conflictissa on _global.min.css_, voit vain kääntää tyylit uudestaan komennolla `gulp styles`. Jos merge conflictissa on mukana _all.js_ tai _dist/front-end.js_, compilaa js komennolla `gulp js` niin se ratkaisee tämän tiedoston conflictin. Jos mukana on muita konfliktaavia tiedostoja, avaa tiedosto Visual Studio Codeen. VSCode osaa ehdottaa merge konfliktiin ratkaisuja automaattisesti. Yhdistä koodi tai hyväksy joko nykyinen tai kommitissa tuleva muutos. Tämän voi tehdä myös manuaalisesti esim. nanolla etsimällä tiedostosta ”<<<<<<<< branchinnimi”, joka osoittaa mihi muutos päättyy ja mihin se loppuu ja poista ”<<<<<<<<” -kommentit. Korjausten jälkeen lisää muutokset (`git add --all` tai `a`), committaa ne (`git commit 'Fix merge conflicts'` tai `c 'Fix merge conflicts'`) ja pushaa ne (`git push` tai `p`). Tämän jälkeen kaikki on kunnossa ja merge on tehty onnistuneesti. Voit vielä tarkistaa mergeämällä uudestaan niin voit varmistua siitä että kaikki on mergetty eikä uusia muutoksia tule.

### Aliaksia

Tuntuuko työläältä kirjoittaa aina kaikki komennot käsin? komennot on päätetty tehdä kirjoittamalla eikä esim jotain appia käyttämällä, koska silloin pysyy parhaiten kärryillä muutoksista kun ne ”hyväksyy” itse. Elämää kuitenkin helpottaa huomattavasti seuraavat aliakset. Muokkaa tietokoneesi \~/.bashrc -tiedostoa esim. komennolla `nano ~/.bashrc` tai avaamalla tiedoston editoriisi (huom. tiedosto voi olla piilotettuna):

```bash
alias s='git status'
alias a='git add --all'
alias c='git commit -m'
alias p='git push -u origin HEAD'
```

Tämän jälkeen voit katsoa tilanteen kirjoittamalla `s`, lisätä kaikki muutokset kirjoittamalla `a`, committaa muutokset kirjoittamalla `c` ja pushata muutokset kirjoittamalla `p`.
