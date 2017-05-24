# Lesson 0 - Wprowadzenie
In this lesson we will introduce ourselves, present agenda and will help you
prepare environment that we'll use during our meeting.


## AGENDA
0. O nas
1. Podział na lekcje
2. Wstęp do JavaScriptu
3. Przygotowanie środowiska - git + yarn
4. Lekcja 1 - ogólne pojęcia w js
5. Lekcja 2 - DOM czyli document, window i nasza strona  
6. Lekcja 3 - zdarzenia i wywołania asynchroniczne  
7. lekcja 4 - JS Special

## O nas

### Piotr Pabich
TBD

### Jakub Kałużka
TBD

## JavaScript - co to jest i z czym to się je
Skryptowy język programowania, stworzony przez firmę Netscape, najczęściej stosowany na stronach 
internetowych. Twórcą JavaScriptu jest Brendan Eich, 23 May 1995 (Java tego samego dnia). Pod koniec lat 
90. XX wieku organizacja ECMA wydała na podstawie JavaScriptu standard języka skryptowego o nazwie 
ECMAScript, aktualnie rozwijaniem tego standardu zajmuje się komisja TC39. [Wikipedia]

Warto wspomnieć o takiej stronie jak `https://caniuse.com/` gdzie można sprawdzić czy to co chcecie
użyć będzie działać i na jakich przeglądarkach.

Dlaczego JavaScript?
Wszystko jest Cloud, webowe, powszechne. Z językiem JavaScript naczęściej spotkacie się na stronach WWW,
ale nie każdy użytkownik Maca (sa jacyś na sali?) wie że podgląd plików dostępny pod spacją 
(Quick Look) - jest napisany w JS. Z tym faktem wiąże się też jedna z podatności, w której to można było 
preparując nazwę pliku w archiwum uzyskać dostęp do komputera jako root (`betterZip < 3.1.2`). 
Michał Bentkowski (2016-07-14) (https://macitbetter.com/blog/)

na Quorze można znaleźć pytanie (https://www.quora.com/Is-JavaScript-used-only-for-web-development):
Czy JavaScript jest wykorzystywany tylko przy tworzeniu stron internetowych?

Odpowiedź jest oczywista:
Nie! JavaScriptu wykorzystuje się do rozwiązywania wielu problemów, a sam język wcale nie jest 
ograniczony tylko do przeglądarek. Na przykład

* JavaScript może być wykorzstywany do tworzenia aplikacji na Windowsa,
* Biblioteki takie jak PhoneGap pozwalają wykorzystać potencjał JavaScriptu do tworzenia applikacji na 
  różne systemy mobilne: iOS, Android, itd.
* Jest mnóstwo open sourcowych bibliotek JSowych, które nie są w ogóle związane z przeglądarkami i WWW, 
  na przykład:
    ** Grunt (http://gruntjs.com/) jest popularnym frameworkiem wykorzystywanym do automatyzacji, 
    ** Mocha (https://github.com/visionmedia/mocha) jest biblioteką, która przyda sie przy pisaniu 
       unit testów.
* Projekt taki jak Tessel (http://tessel.io) wykorzystuje JS to pisania kodu bezpośrednio na urządzenia!
* powstają też mobilne systemy operacyjne, na przykład FirefoxOS jest napisany w JS

Ale my się skupimy na aspekcie webowym :) Więcej szczegółów o samym języku już za chwilę.

## Przygotowanie środowiska
Aby móc przejść dalej, musimy przygotować środowisko, potrzebujemy `yarn` + `git`.
Dlaczego yarn a nie npm? Oba projekty to managery paczek i zależności, yarn jest szybszy i dynamiczniej
sie rozwija, posiada tez plik, dzieki ktoremu w latwy sposob mozemy zapewnic, ze na roznych instancjach, 
wersje paczek beda takie same. 
Haslo do WiFi - wypisane na tablicy

instalacja Yarna: https://yarnpkg.com/en/docs/install

Po co git? Bedziemy pracowac na plikach, ktore pobierzemy sobie z repozytorium. Tutaj w Stxie git jest na 
porzadku dziennym :)

instalacja gita: https://git-scm.com/book/pl/v1/Pierwsze-kroki-Instalacja-Git (windowsowcom wspolczuje)

git clone https://github.com/jkaluzka/js-has-power-starter.git

wchodzimy do katalogu client:

    cd js-has-power-starter/client

instalujemy zaleznosci:

    yarn install

i sprawdzamy czy wszystko dziala:

    yarn start
