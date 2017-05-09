# Sekcja 2

## Wzorce w JS

---

### zasięg

Zasięg ogranicza widoczność i czas życia zmiennych i parametrów. Jest to ważna pomoc dla programisty, ponieważ zmniejsza ryzyko kolizji nazw oraz dostarcza mechanizm automatycznego zarządzania pamięcią

```
var funkcja1 = function() {
    var a = 1, b = 2;
    var funkcja2 = function() {
        var b = 3, c = 4;
        return a += b + c;
    }

    console.log(funkcja2());
};
```

Większość języków używa zasięgu blokowego, jednak JS nie jest jak większość jeżyków i mimo skladni sugerującej inaczej, używa zasięgu funkcji. Parametry i zmienne zdefiniowane w ramach funkcji nie są widoczne na zwenątrz, są za to widoczne wszędzie wewnątrz. W JS przyjęło się, w wyniku tej przypadłości, aby deklarować wszystkie zmienne używane w ramach funkcji na jej początku.

---

### domknięcia

Mimo to, że zasięg zmiennych w JS odbiega od innych języków programowania, jest w tym dobra wiadomość. Funkcje wewnętrzne mają dostęp do parametrów i zmiennych funkcji zewnętrznej, czyli tej, wewnątrz której zostały zdefiniowane. Istnieje jednak pewne wyjątki: `this` i `arguments`.Za pomocą domknięcia można zasymulować składowe prywatne.

```
var mojObiekt = function() {
    var wartosc = 0;

    return {
        zwieksz: function(ile) {
            wartosc += typeof ile === 'number' ? ile : 1;
        },
        pobierz: function() {
            return wartosc;
        }
    }
};

var mo = mojObiekt();
mo.pobierz(); // 0
mo.zwieksz(2);
mo.pobierz(); // 2
```

---

### iife / funkcje natychmistowe

Wzorzec funkcji natychmistowej to składnia pozwalająca wynkonać funkcję tuż po jej zdefiniowaniu.

```
(function () {
    console.log('iife');
})();
```

Wzorzec ten jest przydatny do ograniczenia zakresu zmiennych związanych z kodem inicjującym. Cała praca zostanie wykonana tylko raz tuż po załadowaniu strony.
Do funkcji natychmiastowej można także przekazać argumenty. Często takim argumentem jest obiekt globalny, by był on dostępny wewnątrz funkcji bez potrzeby korzystania z nazwy window. Rozwiązanie to czyni kod bardziej przenośnym, bo działa prawidłowo w środowiskach innych niż przeglądarka internetowa.

```
(function (kto, kiedy) {
    console.log('Nazywam się ' + kto + ' i jest ' + kiedy);
})('Imię', new Date());
```

```
var imie = 'Paweł';

(function (global) {
    // instrukcje
    console.log(global.imie);
})(this);
```

Podobie jak każda inna funkcja, także i funkcja natychmiastowa może zwrócić wartość, a ta może zostać przypisana do zmiennej.

```
var wynik = (function () {
    return 2 + 2;
})();
```

Funkcja natychmiastowa pozwala na wykonanie określonych zadań bez zaśmiecania przestrzeni globalnej zmiennymi tyczasowymi. Wzorzec pozwala również umieścicć poszczególne zestawy funkcjonalności w szczelnych modułach.

---

### curry

Funkcje są wartościami i możemy nimi manipulować na wiele sposobów. Funkcja **curry** pozwala na utworzenie nowej funkcji poprzez łączenie funkcji z jej argumentem. Działanie **curry** polega na utworzeniu domknięcia, które przechowuje oryginalną funkcję z jej argumentami i zwróceniu funkcji, która przy wywołaniu połączy argumenty z poprzedniego wywołania z tymi z obecnego.

```
console.log(dodaj(10, 10)); // 20

var dodaj10 = dodaj(10);
console.log(dodaj10(10)); // 20

console.log(dodaj(10)(10)); // 20
```

Przykładowna implementacja dla powyższego przykładu.

```
var dodaj = function(a, b) {
    var olda = a, oldb = b;
    if (typeof oldb === 'undefined') {
        return function(newb) {
            return olda + newb;
        }
    }

    return a + b;
};
```

Czy istnieje możliwość przekształcenia dowolnej funkcji w nową, przyjmującą tylko część parametrów?

```
function curryer(fn) {
    var slice = Array.prototype.slice,
        tempArgs = slice.call(arguments, 1);
    return function () {
        var newArgs = slice.call(arguments),
            args = tempArgs.concat(newArgs);
        return fn.apply(null, args);
    }
}
```

Kiedy stosować **curry**? Jeżeli daną funkcje wywołuje się wielokrotnie w większości przypadków z tymi samymi parametrami. Nową funkcję można utworzyć dynamicznie, aplikując niektóre z parametrów. Powstała funkcja zapamięta powtarzane parametry i wykorzysta do zbudowania pełnej listy argumentów wymaganych przez oryginalną funkcję.

### chaining



## DOM

* czym jest, a czym nie jest?
* jak korzystac?
* manipulacja
* window, document
* https://developer.mozilla.org/pl/docs/DOM
