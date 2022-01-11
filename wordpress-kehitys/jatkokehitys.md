# Jatkokehitys

Pääbranchin `main`/`master` tulee aina vastata tilannetta asiakkaan tuotannossa. Tämän takia, kun asiakas tilaa jatkokehitystä, luodaan projektissa uusi branch jossa kaikki kehitys tapahtuu. Branch olisi hyvä nimetä joko ominaisuuden tai ajankohdan mukaan, esimeriksi `feature-area-selfupdate` tai `changes-2021-04`. Jos jatkokehitystä tulee tekemään useampi kehittäjä, myös jokaiselle kehittäjälle luodaan oma branch esimeriksi `feature-area-selfupdate-timi`. Pienemmät ja nopeat muutokset, joita ei tarvitse hyväksyttää erikseen asiakkaalla ja jotka voi siirtää suoraan tuotantoon, voi tehdä pääbranchiin.

Jatkokehityksessä olevat asiat tulee mergetä pääbranchiin vasta sen jälkeen, kun asiakas on katsellut kehitettävät toiminnallisuudet ja niitä ollaan siirtämässä tuotantoon.

Ohjeita branchien luomiseen ja käyttöön löytyy erilliseltä [Git-sivulta](https://handbook.dude.fi/wordpress-kehitys/git-open-source#branchit).
