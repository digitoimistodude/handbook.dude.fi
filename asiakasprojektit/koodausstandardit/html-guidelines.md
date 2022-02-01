# HTML Guidelines

Tältä sivulta löydät ohjeita siihen miten HTML:ää kirjoitetaan Duden oikeaoppisten standardien mukaisesti.

Ulkoasussa olevia rajattuja 100% leveitä alueita (`<section>`) kutsutaan nimellä `block`, suomeksi _lohko_, _blokki_ tai _moduuli_. Näiden sisällä ensimmäistä diviä kutsutaan nimellä `container`.

#### HTML-rakenne moduuleissa

```html
<section class="block block-example">
  <div class="container">
    <div class="cols">
      <div class="col col-text">
        <p class="block-title-pre" aria-describedby="block-title-something">Some pre-heading</p>
        
        <h2 class="block-title" id="block-title-something">
          <a href="#">Some heading - Lorem ipsum</a>
        </h2>
        
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        
        <p>
          <span>Aenean ac ultrices metus.</span>
        </p>
      </div> 
      
      <div class="col col-image col-poster">
        <img src="#" alt="Dynamic title" />
      </div>
    </div>
  </div>
</section>
```

#### Nimeämiset

Classia vai ei? Elementit nimetään aina classeilla, elleivät ne ole oikeasti yleisesti käytössä muuallakin. Tämä on oikeastaan vaatimus [Air-light v. 7.4.0](https://github.com/digitoimistodude/air-light/releases/tag/7.4.0) myötä tulleen Gutenberg-uudistuksen jälkeen, jossa ”normilinkeille” (ilman classia) asetetaan automaattisesti `link()`-komponentti (blogia varten).

```html
<!-- Väärin -->
<div class="col">
  <p>
    <a href="<?php echo esc_url( $data['link']['url'] ) ?>">
      <?php echo esc_html( $data['link']['title'] ); ?>
      <?php include get_theme_file_path( '/svg/button-arrow.svg' ); ?>
    </a>
  </p>
</div>
```

```html
<!-- Oikein -->
<div class="col">
  <p class="read-more-wrapper">
    <a class="read-more-link" href="<?php echo esc_url( $data['link']['url'] ) ?>">
      <?php echo esc_html( $data['link']['title'] ); ?>
      <?php include get_theme_file_path( '/svg/button-arrow.svg' ); ?>
    </a>
  </p>
</div>
```

#### Listanomaiset elementit

```html
<!-- Väärin -->
<ul><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li></ul>
```

```html
<!-- Oikein -->
<ul>
  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
</ul>
```

#### Globaalit linkit

```html
<!-- Väärin -->
<div class="col">
  <a href="<?php echo esc_url( get_the_permalink() ); ?>" class="global-link"></a>
  <h2>Otsikko</h2>
  <p>Kuvausteksti</p>
</div>
```

```html
<!-- Oikein -->
<div class="col">
  <a href="<?php echo esc_url( get_the_permalink() ); ?>" class="global-link" aria-hidden="true" tabindex="-1"></a>
    <h2>
      <a href="<?php echo esc_url( get_the_permalink() ); ?>">
        Otsikko
      </a>
	</h2>
  <p>Kuvausteksti</p>
</div>
```

#### Yläotsikot

```html
<!-- Väärin -->
<p><?php echo esc_html( $upper_title ); ?></p>
<h1><?php echo esc_html( $title ); ?></h1>
```

```html
<!-- Oikein -->
<p aria-describedby="<?php echo esc_attr( sanitize_title( $title ) ); ?>"><?php echo esc_html( $upper_title ); ?></p>
<h1 id="<?php echo esc_attr( sanitize_title( $title ) ); ?>"><?php echo esc_html( $title ); ?></h1>
```
