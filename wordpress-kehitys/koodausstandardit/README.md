# Koodausstandardit

Dude käyttää [squizlabs/PHP\_CodeSniffer](https://github.com/squizlabs/PHP\_CodeSniffer)in WordPress-standardeja taustatekniikoiden sekä teemojen kehityksessä ja [Automattic/\_s](https://github.com/Automattic/\_s) standardia frontend-kehityksessä. WordPress VIP -sääntöjä emme noudata ja osa WordPress-säännöistä on excludettu hyvin perustein.

[digitoimistodude/air](https://github.com/digitoimistodude/air)-pohjateeman kehityksessä suositaan underscoresin tapaa tehdä asioita. Automaattiset testit ajetaan [Travisilla](https://travis-ci.org/digitoimistodude/air).

#### phpcs.xml

Excludettavia sääntöjä voi ehdottaa lisää, mutta ehdotuksen pitää olla perusteltavissa. Sääntöihin voi tehdä Pull Requesteja tai committeja suoraan [digitoimistodude/air](https://github.com/digitoimistodude/air)-repositorion [phpcs.xml](https://github.com/digitoimistodude/air/blob/master/phpcs.xml) -tiedostoon.

#### PHP Code Beautifier and Fixer (phpcbf)

Phpcbf:llä on nopea refaktoroida koodia. Teemakansiossa komento ajetaan seuraavasti:

```bash
phpcbf --standard=phpcs.xml page.php
```

#### Indentointi ja linttaus

Koodin tulee olla selkeää ja dokumentoitua. Indentaatiossa käytämme 2 merkin väliä.

PHP-puolella tulee aina noudattaa phpcs.xml:ää. Jos tarvitsee ignorata sääntöjä, lisätään ne projektikohtaisesti kunkin projektin teemakansion alla olevaan phpcs.xml:ään tai seuraavasti koodiin:

```php
<?php // phpcs:disable
```

Jos taas ignorettavaa on SCSS-puolella, lisää seuraava ignorettavaa riviä ennen (huomaa disable-sanan jälkeen ignoroitava määre):

```scss
// scss-lint:disable SelectorFormat
```

Disabloinnille/ignoroinnille pitää aina olla hyvä syy, lähtökohtaisesti varoitukset korjataan aina.

#### Editorin linter

Sublime Textille linter-asetukset ja exclude löytyvät GitHubista: [SublimeLinter.sublime-settings](https://github.com/digitoimistodude/sublime-settings/blob/master/Library/Application%20Support/Sublime%20Text%203/Packages/User/SublimeLinter.sublime-settings).
