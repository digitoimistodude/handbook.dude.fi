# Made by Dude -badge



Sivujen tekijästä ilmoittaa **Made by Dude** -badge, joka lisätään asiakkaan suostumuksesta sivuston Footer-osioon. Tämä sivu sisältää badgen käyttöönottoon vaadittavat universaalit snippetit, joita ei ole sisällytetty [starter-teemaamme](https://github.com/digitoimistodude/air-light) mukaan.

**Huom!** Muista lisätä `'www.dude.fi',` tiedoston scripts-styles.php \`wp\_localize\_script\` sisään, jotta tooltip toimii oikein.

**Lisää ennen footer.php-tiedoston containerin lopetustagia:**

```html
<p class="dude-badge"><a class="no-external-link-indicator" href="https://www.dude.fi" data-tooltip="Sivut toteuttanut" aria-label="Sivut toteuttanut Digitoimisto Dude Oy, siirry ulkoiselle sivustolle dude.fi"><svg aria-hidden="true" class="tip" xmlns="http://www.w3.org/2000/svg" width="36" height="12" viewBox="0 0 36 12"><path class="tip-color" transform="rotate(0)" d="M2.658, .000 C-13.615, .000 50.938, .000 34.662, .000 C28.662, .000 23.035, 12.002 18.660, 12.002 C14.285, 12.002 8.594, .000 2.658, .000 Z"></path></svg><svg width="85" height="17" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 85 17"><g fill="transparent" class="heart" fill-rule="evenodd"><path d="M7.5 13.963L2.192 8.412a3.152 3.152 0 01-.59-3.634h0a3.166 3.166 0 012.312-1.7 3.133 3.133 0 012.72.882l.866.803.867-.803a3.133 3.133 0 012.718-.882 3.167 3.167 0 012.312 1.7h0a3.153 3.153 0 01-.589 3.634L7.5 13.962z" class="stroke" stroke="#03061b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path class="fill" fill="#03061b" d="M50.696 8.166c0 .943-.338 2.782-2.601 2.782-2.278 0-2.618-1.84-2.618-2.782V3h-4.34v5.455c0 3.472 2.6 5.545 6.958 5.545 4.346 0 6.942-2.073 6.942-5.545V3h-4.34v5.166zM85 6.052V3H71.717v11H85v-3.052h-9.073v-1.22h7.543V7.271h-7.543V6.052zM33.14 10.948h-2.894V6.057h2.895c1.498 0 2.543 1.146 2.543 2.443 0 1.314-1.045 2.448-2.543 2.448zM34.179 3H26v11h8.178c2.832 0 5.723-2.196 5.723-5.5 0-3.324-2.891-5.5-5.723-5.5zM63.722 10.948h-2.895V6.057h2.895c1.499 0 2.543 1.146 2.543 2.443 0 1.314-1.044 2.448-2.543 2.448zM64.76 3h-8.178v11h8.178c2.832 0 5.723-2.196 5.723-5.5 0-3.324-2.891-5.5-5.723-5.5z"/></g></svg></a></p>
```

**Uusi tiedosto: sass/layout/\_dude-badge.scss:**

```scss
/* stylelint-disable declaration-no-important, a11y/font-size-is-readable */
// Badge variables
:root {
  --color-badge-logo-dark: #03061b;
  --color-badge-logo-light: var(--color-white);
  --color-badge-tooltip-text-dark: var(--color-white);
  --color-badge-tooltip-text-light: #03061b;
  --color-badge-tooltip-background-light: rgba(255, 255, 255, .8);
  --color-badge-tooltip-background-dark: rgba(17, 17, 17, .9);

  // Light or dark?
  --color-badge-logo: var(--color-badge-logo-dark);
  --color-badge-tooltip-text: var(--color-badge-tooltip-text-dark);
  --color-badge-tooltip-background: var(--color-badge-tooltip-background-dark);
}

.site-footer .container {
  position: relative;
}

.site-footer .dude-badge {
  margin-bottom: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 45px;

  // Adjust based on the site
  text-align: center;

  a:hover .heart,
  a:focus .heart {
    fill: var(--color-badge-logo);
  }

  .fill {
    fill: var(--color-badge-logo);
  }

  .stroke {
    stroke: var(--color-badge-logo);
  }
}

.site-footer {
  [data-tooltip] {
    cursor: pointer;
    position: relative;
    transform: translate(-48%, 18px);
    transform-origin: top;
    transition: transform 200ms cubic-bezier(.19, 1, .22, 1), opacity 200ms cubic-bezier(.19, 1, .22, 1);
  }

  [data-tooltip]::after {
    background-color: var(--color-badge-tooltip-background);
    border-radius: 4px;
    bottom: 100%;
    color: var(--color-badge-tooltip-text);
    content: attr(data-tooltip);
    font-family: sans-serif !important;
    font-size: 12px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    left: 50%;
    margin-bottom: 11px;
    opacity: 0;
    padding: 5px;
    pointer-events: none;
    position: absolute;
    text-align: center;
    text-shadow: none !important;
    transform: translate(-48%, 10px);
    transform-origin: top;
    transition: transform 200ms cubic-bezier(.19, 1, .22, 1), opacity 200ms cubic-bezier(.19, 1, .22, 1);
    width: 100px;
    z-index: 10;
  }

  [data-tooltip] .tip {
    bottom: 100%;
    content: "";
    height: 6px;
    left: 50%;
    margin-bottom: 10px;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    transform: translate(-37%, 15px);
    transform-origin: top;
    transition: transform 155ms cubic-bezier(.19, 1, .22, 1), opacity 200ms cubic-bezier(.19, 1, .22, 1);
    width: 18px;
    z-index: 10;

    .tip-color {
      fill: var(--color-badge-tooltip-background);
    }
  }

  [data-tooltip]:hover .tip,
  [data-tooltip]:hover::after,
  [data-tooltip]:focus .tip,
  [data-tooltip]:focus::after,
  [data-tooltip][data-tooltip-visible] .tip,
  [data-tooltip][data-tooltip-visible]::after {
    opacity: 1;
    pointer-events: auto;
  }

  [data-tooltip]:hover::after,
  [data-tooltip][data-tooltip-visible]::after {
    transform: translate(-48%, -5px);
  }

  [data-tooltip]:hover .tip,
  [data-tooltip][data-tooltip-visible] .tip {
    transform: translate(-37%, 0);
  }
}
```

**global.scss:**

```scss
@import 'layout/dude-badge';
```
