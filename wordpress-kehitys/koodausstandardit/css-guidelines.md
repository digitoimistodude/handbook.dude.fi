# CSS Guidelines



Dude käyttää tyylipuolella (SCSS) [SMACSS (Scalable and Modular Architecture for CSS)](https://smacss.com) ja [WordPressin Gutenbergiin](https://css-tricks.com/styling-the-gutenberg-columns-block/) pohjautuvaa nimeämiskäytäntöä (`is-*` ja `has-*` selectorit).

Noudatamme lukuisia stylelint-standardeja. Koko [stylelint-määretiedosto](https://github.com/digitoimistodude/air-light/blob/master/.stylelintrc) löytyy air-light-teeman juuresta. Koska stylelintrc:ssä on listattu määreet ja niistä huomauttaa erikseen editori ja gulp, emme käy jokaista erikseen läpi tässä handbookissa. Tässä kuitenkin esimerkinomaisesti yksi:

#### Nestaus ja tarkkuus

Määre `"max-nesting-depth": [ 3, { "ignore": ["blockless-at-rules", "pseudo-classes"] } ],` ([stylelint](https://stylelint.io/user-guide/rules/max-nesting-depth)) ja muut korrektit tavat varmistavat, että kirjoitamme luettavaa CSS:ää. Ei määritellä tarpeettoman tarkkoja tyylejä, jotta ei monimutkaisteta koodia turhaan. Vältetään liian tarkkoja ja monimutkaisia CSS-rakenteita.

```scss
// Väärin. Ei nestata tarpeettomasti. "Inception-rule", älä mene liian syvälle.

.block-example {
  background: var(--color-background-block-example);

  > div.block-related-element {
    color: var(--color-brand);

    .element-that-should-be-global {
      a.something-specific {
        font-size: var(--font-size-large);
      }
    }
  }
}
```

```scss
// Oikein. Pidetään koodi simppelinä ja luettavana.

.block-example {
  background-color: var(--color-background-block-example);

  .block-related-element {
    color: var(--color-brand);
  }
}

.element-that-should-be-global .something-specific {
  font-size: var(--font-size-large);
}
```

#### Tyypillinen CSS-rakenne

```scss
.block-example {
  // Default background-color
  background-color: var(--color-mudgreen);

  h1,
  h2,
  p {
    color: $color-white;
  }

  .block-title-pre {
    margin: 0 0 1rem;
  }

  .block-title {
    margin-top: 0;
  }

  .block-title a {
    margin-top: 0;
  }

  .cols {
    color: var(--color-white);
    display: flex;
  }

  .col.col-text {
    @media (min-width: $some-breakpoint) {
      margin-right: 30%;
      width: 50%;
    }
  }

  .col.col-image {
    @media (min-width: $some-breakpoint) {
      width: calc(50% - 30%);
    }

    img {
      height: auto;
      max-width: 395px;
      width: 100%;
    }
  }
}
```
