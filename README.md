# rbs-angular-http

Biblioteka komponentów HTTP dla **Angular.js**.

## Instalacja

    npm install
    bower install

## Instalacja w projekcie

    bower install git@gitlab.bssolutions.pl:biblioteki/rbs-angular-http.git#v0.0.1 string lodash --save

## API

### `CacheInterceptor`

Interceptor `$http` czyszczący wybrany cache po zakończeniu żądania.

Zobacz dostępne [API](src/main/coffee/interceptor/CacheInterceptor.litcoffee) oraz [testy](src/test/unit/coffee/interceptor/CacheInterceptor_specs.litcoffee)

### `URLRewriterInterceptor`

Interceptor `$http` zmieniający `url` żądania według reguł w postaci wyrażeń regularnych.

Zobacz dostępne [API](src/main/coffee/interceptor/URLRewriterInterceptor.litcoffee) oraz [testy](src/test/unit/coffee/interceptor/URLRewriterInterceptor_specs.litcoffee)
