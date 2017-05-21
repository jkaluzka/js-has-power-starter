# Lesson 3

## Zdarzenia i wywołania asynchroniczne

---

### Zdarzenia

Przez zdarzenia mam tutaj na myśli takie akcje jak, kliknięcie myszką, naciśnięcie klawisza,
czyli akcje związane czysto z manipulatorami podłączonymi do komputera. Ale również złapanie
focusu, zmiana stanu, akcje typu `on`, `off`, a nawet `ready` są przykładmi zdarzeń z jakimi 
również będziemy mieli do czynienia.


#### Dygresja na temat ready

Zapewne część z Was kojarzy taki zapis: `$(document).ready( function() {} )`, 
a nie jest to niczym innym, jak zdarzeniem, które czeka na moment aż będzie można operować na 
elementach w DOM. Wszystkie poniższe zapisy są równoznaczne:

```js
$( function () {} )
$( document ).ready( function () {} )
$( "document" ).ready( function () {} )
$().ready( function () {} )

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
```

#### Includowanie JSow - przed/po
Inlcudować javascripty powinniśmy zaraz przed zamknięciem `body`. Powód jest jeden,
pozwala to uniknąć blokad podczas ładowania strony. Użytkownikowi ładuje się strona
szybciej, a w międzyczasie, gdy on widzi, że coś na stronie się pojawia, w tle
ładują się potrzebne skrypty. 

#### Obsługa zdarzeń

Obsługa zaczyna się od przypisania funkcji obsługi zdarzeń do elementów.
Załóżmy, że mamy następujący przycisk, który po kliknięciu powinnien inkrementować wartość:

```html
<button id="clickme">Kliknij mnie: 0</button>
```

możemy przypisać następującą funkcję do właściwości `onClick`:

```js
// nieoptymalne rozwiązanie
var b = document.getElementById('clickme'),
    count = 0;
b.onclick = function () {
    count++;
    b.innerHTML = "Kliknij mnie: " + count;
};
```

Powyższym przykład nie jest optymalny ponieważ możemy przypisać tylko jedną funkcję do `onClick`
bez narażania się na utratę luźnego powiązania funkcjonalności. Oczywiście można sprawdzać, czy 
`onClick` zawiera już jakąś funkcję, i jeśli tak, to przypisać do `onClick` nową funkcję zawierającą
obie poprzednie. Istnieje jednak znacznie wygodniejsze rozwiązanie — metoda `addEventListener()`. 
Metoda ta **nie** istnieje w przeglądarce IE aż do wersji 8., więc dla wersji poprzednich trzeba 
stosować metodę `attachEvent()` jednakże my w naszych przykładach skupimy się na najnowszych 
przeglądarkach. Tak więc przypisanie zdarzenia on click wygląda następująco:

Sama funkcja `addEventListener` przyjmuje następujące parametry
```js
target.addEventListener(type, listener[, options]);
```

```js
var b = document.getElementById('clickme');
if (document.addEventListener) { // W3C
    b.addEventListener('click', myHandler, false);
} else { // najbardziej ogólne rozwiązanie
    b.onclick = myHandler;
}
```

a sama funkcja `myHandler` wyglądałaby tak:

```js
function myHandler(e) {
    var src, parts;
    // pobranie zdarzenia i elementu źródłowego
    e = e || window.event;
    src = e.target || e.srcElement;

    // właściwe zadanie: aktualizacja etykiety
    parts = src.innerHTML.split(": ");
    parts[1] = parseInt(parts[1], 10) + 1;
    src.innerHTML = parts[0] + ": " + parts[1];
    // wyłączenie propagacji zdarzeń (bąbelkowania)
    if (typeof e.stopPropagation === "function") {
        e.stopPropagation();
    }

    // wyłączenie domyślnej akcji
    if (typeof e.preventDefault === "function") {
        e.preventDefault();
    }
}
```

Wprawdzie obiekt, na którym wywoływane jest zdarzenie jest przekazywany jako parametr
do funkcji `myHandler`, ale w przypadku właściwości `onClick` musimy uzyskać do niego dostęp
za pomocą zmiennej globalnej `window.event`. 

Następnie wyciągamy liczbę z etykiety elementu, inkrementujemy i ustawiamy ponownie.

W następnym kroku zatrzymujemy dalszą propagację wywołań. Gdybyśmy tego nie zrobili, zdarzenie będzie
wykonywało wszystkie funkcje aż do rdzenia dokumentu lub obiektu okna.

Na samym końcu zapobiegamy wykonywaniu domyślnej akcji. Pewne zdarzenia mają przypisane swoje działania
(np. kliknięcie łącza/linka), ale można tego uniknąć, za pomocą `preventDefault`.

Zdarzenia `ściąga się` za pomocą:

```js
element.removeEventListener(eventName, eventHandler);
```

### Asynchronous JavaScript + XML

Nie jest to technologia - lecz wyrażenie zdefiniowane przez Jesse James Garreta w 2005 roku,
które opisuje `nowe podejście do używania wielu różnych technologii razem` włączając w to
HTML, XHTML, CSS, JS, DOM, XML, XSLT i co najważniejsze XMLHttpRequest object. Umiejętne połączenie
tych technologii umożliwia stronom www wykonywać, małe, szybkie, nierzadko przyrostowe rozszerzanie
treści (zawartości) bez potrzeby przeładowywania strony. W efekcie strony są szybsze i bardziej
user friendly.

Pomimo, że X w nazwie odnosi się do XMLa, to format JSON jest częściej używany przy komunikacji.
Jest szybszy, lżejszy co przechyla w jego stronę szalę, zwłaszcza w sytuacji, gdy chcemy aby nasz
użytkownik czekał w miarę jak najmniej na pojawienie się danych.

#### Jak stworzyć asynchroniczne żądanie HTTP

```js
var httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {};
httpRequest.open('GET', 'http://localhost:3000/airlines', true);
httpRequest.send();
```

Powyższy przykład tworzy zapytanie HTTP, w którym będziemy wysyłać dane np. url, parametry, dane (POST)
Następnie `otwieramy` (open) połączenie przekazując takie parametry jak metoda połączenia, url oraz czy 
połączenie ma być obsługiwane asynchronicznie - czyli, czy funkcja ma czekać na odpowiedź z serwera (false),
czy może kontynuować, a użytkownik sam zatroszczy się o obsługę danych, któ®e mogą przyjść nawet po paru 
minutach (true).


#### JSON.parse i JSON.stringify

JSON.parse() - metoda pomocna przy zamianie stringa (często otrzymanego z serwera) na obiekt, lub inny
z JSowych typów.

```js
JSON.parse('{}');              // {}
JSON.parse('true');            // true
JSON.parse('"foo"');           // "foo"
JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
JSON.parse('null');            // null

JSON.parse('"undefined"');     // ??
JSON.parse('undefined');       // ??
```

JSON.parse nie akceptuje przecinków na końcu list, obiektów, oba poniższe przykłady rzucą wyjątkiem
składni:

```js
JSON.parse('[1, 2, 3, 4, ]');
JSON.parse('{"foo" : 1, }');
```

JSON.stringify - jest metodą odwrotną do parse, mianowicie zamienia wartość JS na poprawny string JSON.
Obiekty są serializowane (np. data)

```js
JSON.stringify({});                  // '{}'
JSON.stringify(true);                // 'true'
JSON.stringify('foo');               // '"foo"'
JSON.stringify([1, 'false', false]); // '[1,"false",false]'
JSON.stringify({ x: 5 });            // '{"x":5}'

JSON.stringify(new Date(2006, 0, 2, 15, 4, 5))  // '"2006-01-02T15:04:05.000Z"'
```

#### Obsługa odpowiedzi żądania

Każde żądanie, które wysyłamy trzeba obsłużyć, możemy to zrobić przypisując odpowiednią
funkcję do `request.onreadystatechange`. W funkcji tej powinniśmy sprawdzić przede wszystkim
czy stan zmienił się na taki, który pozwoli nam obsłużyć dane `XMLHttpRequest.DONE` (wiecej tutaj: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#Properties)
Następnie powinniśmy sprawdzić status odpowiedzi, 2xx, 3xx, 4xx i w odpowiedni sposób wyciągnąć odpowiedź 
z serwera np. w postaci tekstu `httpRequest.responseText` i ją obsłużyć.

```js
var httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        var tekst = httpRequest.responseText;
        if (httpRequest.status === 200) {
            alert(tekst);
        } else if (httpRequest.status >= 400) {
            console.error(tekst);
        } 
    }
};
```

Przy `POST` ważne aby nie zapomnieć o ustawieniu nagłówka `Content-type`:

```js
httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
```

Istnieje wiele (poprawnych) sposobów zapisu obsługi zapytań ajaxowych, np.:

```js
var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/airlines', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);
  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();
```

#### *json-server* naszym przyjacielem jest

Przy tworzeniu zapytań do serwera, pomocna jest biblioteczka json-server. Na podstawie danych,
które ma zapisane w pliku konfiguracyjnym, tworzy nam lokalny RESTowy serwer, na którym będziemy 
mogli przećwiczyć powyższe rzeczy. Server został już skonfigurowany, aby z niego skorzystać
wystarczy napisać `yarn start`


#### Prosty przykład - zadanie
