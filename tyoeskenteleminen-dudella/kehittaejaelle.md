# Kehittäjälle

Kun kohdan [Aloittaminen](https://handbook.dude.fi/tyoskenteleminen-dudella/aloittaminen) yleiset tunnukset on luotu ja otettu käyttöön, luodaan tunnukset seuraaviin palveluihin:

1. [GitHub](https://github.com)-tunnus
2. [GitHub Teamin](https://github.com/digitoimistodude) owner-oikeudet
3. [Cacher](https://www.cacher.io) (tähän kutsu ylläpitäjältä)

Tee tässä kohtaa myös GitHubin käyttöönotto, [alkuperäisen ohjeen](https://docs.github.com/en/get-started/getting-started-with-git/setting-your-username-in-git) mukaan seuraavasti:

```bash
git config --global user.name "Etunimesi Sukunimesi"
```

Mene GitHubin asetuksiin ja aseta oletussähköpostiosoitteeksi omanimi@dude.fi [tämän ohjeen mukaisesti](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-user-account/managing-email-preferences/setting-your-commit-email-address#about-commit-email-addresses). Sen jälkeen aja seuraava komento:

```bash
git config --global user.email "omanimi@dude.fi"
```

Luo SSH-avain koneellesi komennolla

```bash
ssh-keygen -t rsa
```

Paina enteriä salasanakyselyissä.

Hae ssh-avain, kopioi se leikepöydälle:

```bash
cat ~/.ssh/id_rsa.pub
```

Seuraavaksi mene GitHubin asetuksissa kohtaan [SSH & GPG keys](https://github.com/settings/keys) ja lisää SSH key vihreästä napista. Laita selitteeksi vaikkapa MacBook Pro ja liitä avain sille varattuun kenttään.

Aja komentorivillä seuraava komento:

```bash
ssh -T git@github.com
```

Onnea, olet GitHubissa!

#### Asennettavat ohjelmat koodarille

Tärkeimmistä ohjelmista on avattu lisää osiossa [Työkalut & Workflow](https://handbook.dude.fi/tyoskenteleminen-dudella/tyokalut-workflow). Asenna kuitenkin seuraavat (MacOS päivitysten jälkeen):

* [Homebrew](https://brew.sh/index\_fi)
* [Firefox](https://www.firefox.com)
* [Google Chrome](https://www.google.com/chrome/)
* [Visual Studio Code](https://code.visualstudio.com)
* [Resilio Sync](https://www.resilio.com/individuals/)
* [Sequel Pro (Nightly Test Build)](https://sequelpro.com/test-builds)
* [Simplenote](https://simplenote.com)

### Työntekoon vaaditut komentorivikomponentit

Terminal -komentorivitulkin selkeyttämiseksi suositellaan [Dracula-teemaa](https://draculatheme.com/terminal/) ja [Hack-fonttia](https://sourcefoundry.org/hack/) (12pt). Nämä saa asennettua [Dracula Themen ohjeiden](https://draculatheme.com/terminal/) mukaisesti.

1\. Vaihdetaan macOs Catalinan zsh term bashiksi ja poistetaan zsh:sta nalkuttava viesti:

```bash
chsh -s /bin/bash
```

Lisätään vaaditut tiedostot:

```bash
touch ~/.aliases && touch ~/.aliases_private
```

Käynnistä tässä kohtaa terminal uudestaan tappamalla se näppäinyhdistelmällä ⌘ cmd + Q ja avaamalla uudestaan. Seuraavaksi luodaan .bash\_profile-tiedosto seuraavasti:

```bash
nano ~/.bash_profile
```

Lisää tiedostoon copy-pastettamalla seuraava:

```bash
# Silence Catalina zsh notification
export BASH_SILENCE_DEPRECATION_WARNING=1

# Editor
export EDITOR=nano

# Title bar - "user@host: ~"
title="\u@\h: \w"
titlebar="\[\033]0;"$title"\007\]"

# Define colors
black="\[$(tput setaf 0)\]"
red="\[$(tput setaf 1)\]"
green="\[$(tput setaf 2)\]"
yellow="\[$(tput setaf 3)\]"
blue="\[$(tput setaf 4)\]"
magenta="\[$(tput setaf 5)\]"
cyan="\[$(tput setaf 6)\]"
white="\[$(tput setaf 7)\]"

# Git branch
git_branch() {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)\ /';
}

# Clear attributes
clear_attributes="\[$(tput sgr0)\]"

# Dracula bash prompt for regular user - "➜  ~ (master) "
export PS1="${titlebar}${green}\h ${blue}\W ${cyan}\$(git_branch)${clear_attributes}"

# Autocorrect typos in path names when using `cd`
shopt -s cdspell;

# Add tab completion for many Bash commands
if which brew > /dev/null && [ -f "$(brew --prefix)/share/bash-completion/bash_completion" ]; then
    source "$(brew --prefix)/share/bash-completion/bash_completion";
elif [ -f /etc/bash_completion ]; then
    source /etc/bash_completion;
fi;

# Load other dotfiles
source $HOME/.aliases_private
source $HOME/.aliases

PATH="$HOME/.composer/vendor/bin:$PATH"
```

Tallennus ctrl + O, nanosta poistuminen ctrl + X.

2\. Xcoden komponentit (saattaa olla jo asennettuna, mutta varmistetaan ensin):

```bash
xcode-select --install
```

3\. Homebrewn päivitykset:

Jos ei ole vielä asennettu [brew.sh](https://brew.sh/index\_fi) sivuston komennon kautta, ensin asennus ja sitten päivitykset komennolla:

```bash
brew update
```

4\. Node ja npm:

Asenna nvm (node version manager):

```bash
brew install nvm
```

Luo .nvm-kansio paketeille:

```bash
mkdir ~/.nvm 
```

Avaa .bash\_profile:

```bash
code ~/.bash_profile
```

Lisää ensimmäiselle riville:

```bash
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

Tallenna tiedosto.

Lataa muutokset Terminaliin:

```bash
source ~/.bash_profile
```

Asenna noden käytössä oleva versio:

```bash
nvm install 15.14.0
nvm use 15.14.0
```

Ja sitten testaus, että versiot näkyy:

```bash
npm -v && node -v
```

5\. Disabloidaan automaattinen salasanakysely komentorivillä:

```bash
sudo nano /etc/sudoers
```

Lisätään alimmaiseksi:

```bash
# root and users in group wheel can run anything on any machine as any user
root            ALL = (ALL) ALL
%admin          ALL = (ALL) NOPASSWD: ALL
```

Tallennus ctrl + O, nanosta poistuminen ctrl + X.

6\. Composerin asennus [sivustolla listattujen](https://getcomposer.org/download/) komentojen kautta. Eli käytännössä rimpsu joka sisältää php -r, composer-setup jne. Tämän jälkeen aja seuraava:

```bash
sudo mv composer.phar /usr/local/bin/composer
```

Testaus:

```bash
composer --version
```

7\. Gulpin asentaminen globaaliksi paketiksi:

```bash
npm install gulp -g
```

8\. Capistranon asentaminen globaaliksi paketiksi:

```bash
sudo gem install capistrano
```

9\. PHPCodeSnifferin asennus WordPress Coding Standardeilla ja toiminnan testaus (ohjeet myös [air-light](https://github.com/digitoimistodude/air-light#how-to-install-for-gulp) repossa):

```bash
mkdir -p ~/Projects && cd ~/Projects && git clone -b master --depth 1 https://github.com/squizlabs/PHP_CodeSniffer.git phpcs
git clone -b master https://github.com/PHPCompatibility/PHPCompatibility
git clone -b master --depth 1 https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards.git wpcs
```

Korvaa _omanimi_ omalla järjestelmän käyttäjänimellä:

```bash
sudo ln -s /Users/omanimi/Projects/phpcs/bin/phpcs /usr/local/bin/phpcs && sudo chmod +x /usr/local/bin/phpcs
```

Korvaa _omanimi_ omalla järjestelmän käyttäjänimellä:

```bash
phpcs --config-set installed_paths "/Users/omanimi/Projects/wpcs","/Users/omanimi/Projects/PHPCompatibility"
```

Testaa:

```bash
phpcs -i
```

Pitäisi näkyä:

```bash
The installed coding standards are PEAR, Zend, PSR2, MySource, Squiz, PSR1, PSR12, PHPCompatibility, WordPress, WordPress-Extra, WordPress-Docs and WordPress-Core
```

10\. Stylelintin ja eslintin asennus:

```bash
npm i stylelint eslint -g
```

Testaus:

```bash
stylelint -v && eslint -v
```

Jos tulee versiot, asennus on mennyt oikein läpi.

11\. [Visual Studio Coden](https://code.visualstudio.com) teemat, fontit ja värit saat asettaa oman makusi mukaan, mutta jos preferenssiä ei ole, voit käyttää [vscode-settings](https://github.com/ronilaukkarinen/vscode-settings) repon asetuksia. [Suora linkki asentamisohjeisiin](https://github.com/ronilaukkarinen/vscode-settings#usage).

12\. Paikallisen kehitysympäristön asentaminen onnistuu noudattamalla [macos-lemp-setup](https://github.com/digitoimistodude/macos-lemp-setup#installation-steps) -asennusohjeita. **Huom!** nginx, php-fpm on ajettava roottina sudo-komennon kanssa, mutta mariadb on ajettava käyttäjän alla.

13\. Projektikehitysstackin asentaminen onnistuu noudattamalla [dudestack](https://github.com/digitoimistodude/dudestack#installation) -asennusohjeita.

Päivitetty viimeksi 9.11.2021.
