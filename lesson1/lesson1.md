# Sekcja 1


## Białe znaki

Nie odgrywają żadnej znaczącej roli


## Komentarze

Zapis `//` lub `/* */`

Uważać na

```
/*
	var rm_a = /a*/.match(s);
*/
```


## Słowa zastrzeżone

```
abstract boolean break byte case catch char class const continue debugger
default delete do double else enum export extends false final finally float for
function goto if implements import in instanceof int interface long native new
null package private protected public return short static super switch
synchronized this throw throws transient true try typeof var volatile void while
with
```

Ciekawostka:  Większość słów nie jest użyta w języku i nie zawiera słów, które powinny być
zastrzeżone takie jak `undefined`, `NaN` i `Infinity`.

Niedozwolone jest także użycie nazwy zastrzeżonej jako własności w obiekcie.


## Liczby
  * JS ma tylko jeden typ liczbowy, reprezentowany jako 64-bitowa liczba
	  zmiennoprecinkowa (podobnie jak double w JAVA).
  * Nie posida osobnego typu dla licz całkowitych dalatego
	  ```
	  	1 === 1.0
	  ```
	* Wartość z częścią wykładniczą
	  ```
	  	100 === 1e2
	  ```
	* Liczby ujemne tworzone są poprzez użycie snadardowego predrostka `-`
	* Wartość `NaN` jest wartością liczby, będącej wynikiem takiej operacji która nie może
	  zwrócić normalnego wyniku.
	  * `NaN` nie jest równa żadnej innej wartość, a także samej sobie
		  ```
		  	NaN !== NaN
		  ```
		* Aby sprawdzić czy dana wartość jest `NaN` musimy użyć funkcji
		  ```
		  	isNaN(number)
		  ```
	* Wrtość `Infinity` reprezentuje wszystkie wartości większe od `1.79769313486231570e+308`


## Łańcuchy znakow (napis)
  * JS nie ma specjalnego typu znakowego
  * Może być ograniczony pojedynczymi lub podwójnymi cudzysłowami.
    ```
      'word' === "word"
    ```
	* Może zawierać zero lub więcej znaków
    ```
      typeof('') === typeof('word')
    ```
	* Znaki specjalne (cudzysłów lub znaki kontrolne) zapisujemy po znaku `\`
	* Wszystkie znaki w języku mają 16-bitów
	* Użycie specjalnego zapisu `\u` pozwala na użycie kodów znaków numerycznie
    ```
      "A" === "\u0041"
    ```
	* Łańcuchy znakowe mają własność `length`
    ```
      "word".length === 4
    ```
	* Łańcuchy znakowe są niezmienne. Raz utworzone, nigdy nie mogą być zmienione.
	  Mamy jednak możliwość bardzo prostego tworzenia nowych, poprzez łączenie innych za
	  pomocą operatora `+`
      ```
        'w'+'o'+'r'+'d' === 'word'
      ```


## Boolean
  * Wartości które nie są uznawane za prawdziwe
    ```
      false, null, undefined, '' (pusty łańcuch), 0 (liczba), NaN
    ```
  * Wszystkie pozostałe są uznawane za prawdziwe, również łańcuch 'false' oraz wszystkie obiekty
  * Obiekt Boolean jest obiektem opakowującym dla wartości logicznych
    ```
      new Boolean(wartosc)
    ```
  * Obiekt Boolean posiadający wartość `false` traktowany jest w instrukcjach warunkowych jako `true`
    ```
      !!(new Boolean(false)) // true
    ```


## Wyrażenia
  * Najprostrze wyrażenia to
    * liczba
    * łańcuch znakowy
    * zmienna
    * wartość wbudowane
      ```
        true, false, null, undefined, NaN, Infinity
      ```
    * wyrażenia poprzedzone słowem `new`
    * wyrażenie dookreślenia poprzedzone słowem `delete`
    * wyrażenia umieszczone w nawiasach
    * wyrażenia poprzedzone operatorem jednoargumentowym
      ```
        typeof, +, -, !
      ```
    * wyrażenie po którym występuje operator
      * dwuargumentowy
      * trójargumentowy `?`
      * wywowałnie
      * dookreślenie

  * Operatory
    * jednoargumentowy
      ```
        typeof + - ! delete new
      ```
      * `typeof` zwraca wartość `number`, `string`, `boolean`, `undefined`, `function` oraz `object`
      * `!` zwraca `false` gdy argument jest prawdziwy, a `true` w przeciwnym wypadku
    * dwuargumentowy
      ```
        * / %
        + -
        >= <= > <
        === !==
        || &&
      ```
      * operator `+` dodaje i łączy. Dodaje gdy oba argumanty są liczbami
      * operator `/` może zwracać wartości niecałkowite, nawet gdy oba argumenty są liczbami całkowitymi
      * operator `&&` zwraca wartość pierwszego wyrażenia, jeśli *nie* jest ono prawdziwe. W przeciwnym wypadku         zwraca wartość drugiego.
      * operator `||` zwraca wartość pierwszego wyrażenia, jeśli jest ono prawdziwe. W przeciwnym wypadku zwraca         wartość drugiego.
    * wywołanie
      * wywołanie powoduje wykoanie funkcji. Operatorem wywołania jest para nawiasów następujących po wartości           funkcji. Nawiasy mogą zawierać argumenty, które będą przekazane do funkcji.
      ```
        f(jeden, dwa)
      ```
    * dookreślenie
      * używane jest do wskazania właśćiwości lub elementu w obiekcie lub w tablicy.
      ```
        objekt.wlasciwosc
        tablica[indeks]
      ```
    * pierszeństwo operatorów
      * dookreślenie i wywołanie ` . [] () `
      * operatory jednoargumentowe ` delete new typeof + - ! `
      * iloczyn, iloraz, reszta ` * / % `
      * suma/złącznie, różnica ` + - `
      * nierówność ` >= <= > < `
      * równość ` === !== `
      * iloczyn logiczny ` && `
      * suma logiczna ` || `
      * operator trójednoargumentowy ` ?: `


## Instrukcje

  instrukcje są zwykle wykonywane z góry do dołu. Kolejność może być zmieniona przez zastosowanie instrukcji       warunkowych (`if` oraz `switch`), instrukcji pętli (`while`, `for` oraz `do`), instrukcji przerywających         (`break`, `return` oraz `throw`) i przez wywołanie funkcji.


### instrukcja `var`
  * `var nazwa(, nazwa) = wyrażenie;`
  * użycie instrukcji `var` wewnątrz funkcji tworzy zmienną prywatną


### instrukcje przerywające `break`, `return`, `throw`


### blok
```
{ instrukcje }
```

### instrukcja `if`

    if ( wyrażenie ) { instrukcje } else { instrukcje }

  * wartości uznawane za nie prawdziwe

    ```
    false, null, undefined, '', 0, NaN
    ```



### instrukcja `switch`

    switch ( wyrażenie ) {
      - definicja przypadku
      - instrukcja przerywająca - break
      - default : instrukcje
    }

  * instrukcja ta wykonuje zwielokrotnione rozgałęzienie
  * porównuje wyrażenie pod względem równości ze wszystkimi zdeklarowanymi przypadakami i w przypadku               dopasowania wykonuje zamieszczone pod nim instrukcje
  * jeżeli pasujący przypadek nie zostanie odnaleziony wykonywane są opcjonalne instrukcje oznaczone przez           `default`
  * instrukcja `break` może być użyta do wyjścia z instrukcji `switch`


  #### definicja przypadku

    case wyrażenie : instrukcje

  - definicja przypadku zawiera jedno lub więcej wyrażeń
  - wyrażenia nie muszą być stałymi
  - instrukcją następującą powinna być instrukcja przerywająca, aby zapobiedz wykonywaniu instrukcji
    z następnych przypadków


  ### instrukcja `while`

    while ( wyrażenie ) { instrukcje }


  * dopuki wyrażenie jest prawdziwe, blok jest wykonywany, w przeciwnym wypadku pętla kończy się


  ### instrukcja `do`

    do { instrukcje } while ( wyrażenie );

  instrukcja `do` jest podobna do instrukcji `while` z tym wyjątkiem, że warunek jest tu testowany po             wykoaniu bloku, a nie przed. Oznacza to, że w tej instrukcji blok zostanie wykonany przynajmniej raz.


  ### instrukcje `for`

    for ( inicjalizacja<_instrukcja-wyrażenia_>; warunek<_wyrażenie_>; inkrementacja<_instrukcja-wyrażenia_> ) {
      instrukcje
    }

    for ( zmienna in obiekt ) {
      instrukcje
    }

  * w pierwszej formie kontrola należy do trzech opcjonalnych deklaracji: **inicjalizacja**, **warunek** i           **inkrementacji**
  * **inicjalizacja** jest wykonywana jako pierwsza i uruchamia licznik pętli
  * następnie sprawdzany jest **warunek** - polega na porównaniu licznika z zadaną wartością pętli
  * jeżeli **warunek** nie jest prawdziwy pętla jest przerywany
  * kolejno wykonywany jest blok instrukcji, a następnie **inkrementacja**

  * forma druga (zwana `for in`) wylicza nazwy wlaściwości obiektu
  * w każdej iteracji nazwa kolejnej właściwości obiektu jest przypisywana do zmiennej
  * aby sprawdzić czy faktycznie właściwość należy do danego obiektu należy dokonać sprawdzenia w postaci
    ```
    if (objekt.hasOwnProperty(zmienna)) { instrukcje }
    ```


  ### instrukcja `throw`

    try { instrukcje } catch (zmienna) { instrukcje }

  Instrukcja `try` wykonuje blok i przechwytuje wszystkie wyjątki zgłoszone podczas jego wykonania. Definicja     `catch` deklaruje nową zmienną, do której przypisany zostanie obiekt wyjątku.


  ### instrukcja `return`

    return wyrażenie;

  Instrukcja `return ` powoduje wcześniejsze wyjście z funkcji. Javascript nie pozwala na wstawienie znaku końca   linii między słowem `return` a wyrażeniem.

## Literały
* literał numeryczny
  * liczny całkowite `var d = 123;`
  * liczby w systemie binarnym `var b = 0b11111;`
  * liczby w systemie ósemkowym `var o = 0123;`
  * liczny w systemie szesnastkowym `var h = 0x3b;`
  * liczby zmiennoprecinkowe `var f = 123.456;`

* literał łańcuchowy
  * `var s1 = "string";`
  * `var s2 = 'string';`
  * `var s3 = 'string1' + 'string2';`

* literał obiektowy
  * `var objekt = {};`

* literał tablicy
  * `var tablica = [];`
  * `var tablica = ['jeden', 'dwa'];`
  * `var tablica = [, 'jeden', , , 'dwa'];`

## Obiekty

### Informacje ogólne

W języku Javascript tablice są obiekatmi, funkcje są obiektami, wyrażenia regularen są obiektami i oczywiście obiekty sa obiekatmi. Właściwie wszystkie wartości poza liczbami, łańcuchami tekstowymi, typami ligicznymi, `null` oraz `undefined` to obiekty.

Obiekty są kolekcjami własności, gdzie każda własność ma swoją nawzę i wartość. Nazwa może być dowolnym łańcuchem, również pustym, a wartość praktycznie dowoloną, dozwoloną wartością w Javascript.

Obiekty w Javascript są bezklasowe. Są wygode do przechowywania i organizowania danych. Mogą zawierać inne obiekty, zatem nadają się do reprezentacji struktur drzew i grafów.

### Literał obiektowy

Jest wygodną formą zapisu wartości nowych obiektów.

```
  var flight = {
    airline: "Oceanic",
    number: 888.
    departure: {
      IAA: "WAR",
      time: "2017-04-21 15:55",
      city: "Warsaw"
    },
    arrival: {
      IAA: "WRO",
      time: "2017-04-21 16:55",
      city: "Wroclaw"
    }
  }
```

### Pobieranie

Wartośći mogą być pobierane z dowolnego obiektu w dwojaki sposób:

* za pomocą wyrażenia umiesczonego w nawiasach kwadratowych `[]` umieszczonych bezposrednio za nazwą obiekty
* jeżeli wyrażenie jest stałą i jest poprawną nazwą JS oraz nie jest słowem kluchowym, wówczas możemy użyć notacji kropkowej

```
var obiekt = {
  wyrazenie: 1
}

obiekt[wyrazenie] // 1
// lub
obiekt.wyrazenie // 1
```

W przypadku gdy nastąpiła próba pobrania nieistniejącej wartości, wówczas powyższe metody zwrócą nam warotość `undefinde`

```
obiekt[Wyrazenie] // undefined
obiekt[wurazenie] // undefined
```

Istnieje jednak możliwość przypisania w taki wypadu wartości domyślnej przy użyciu operatora `||`

```
obiekt[Wyrazenie] || '--' // --
obiekt[wurazenie] || '--' // --
```

Próba pobrania wartości z `undefined` spowoduje zgłoszenie wyjątku `TypeError`. Przed taką sytuacją możemy uchronić sie za pomocą operatora `&&`

```
obiekt[obiekt] // undfined

obiekt.obiekt.wlasnosc // TypeError

obiekt.obiekt && obiekt.obiekt.wlasnosc // undefined
```

### Modyfikacja

Wartość własnośći obiektu może być modyfikowan poprzez przypisanie. Gdy własność o takiej samej nazwie już istnieje zostaje ona nadpisana.

```
var obiekt = {
  wlasnosc: 'wartosc'
};

obiekt.wlasnosc // 'wartosc'

obiekt.wlasnosc = 'nowa_wartosc'

obiekt.wlasnosc // 'nowa_wartosc'
```

Jeżeli obiekt nie posiada wlasnosci o danej nazwie, zostanie o nie rozszerzony.

```
var obiekt = {
  wlasnosc: 'wartosc'
};

obiekt.nowaWlasnosc = 'wartosc'

obiekt.nowaWlasnosc // 'wartosc'

obiekt // {wlasnosc: 'wartosc', nowaWlasnosc: 'wartosc'}
```

### Referencja

Obiekty przekazywane są przez referencję, *nigdy* nie są kopiowane.


```
var obiekt = {wlasnosc: 'wartosc'}
var nowyObiekt = obiekt;

nowyObiekt.nowaWlasnosc = 'nowa_wartosc'

obiekt // {wlasnosc: 'wartosc', nowaWlasnosc: 'nowa_wartosc'}
```

Jak sobie z tym radzić

```
var obiekt = {wlasnosc: 'wartosc'}
var nowyObiekt = Object.assign({}, obiekt);

nowyObiekt.nowaWlasnosc = 'nowa_wartosc'

obiekt // {wlasnosc: 'wartosc'}
```

### Prototyp

Każdy obiekt jest powiązany z obiektem protorypu, z którego może dziediczyć własności obiektu. Wszystkie obiekty utowrzone za pomocą lierałów obiektowych są powiązane z `Object.prototype`, który jest obiektem dostarczanym standardowo przez Javascript.

Prototy nie odgrywa żadnej znaczącej roli przy modyfikacji obiektu. Każda nowa własność jest przypisywana do danego obiektu. Zachodzi jednak znacząca zmiana przy odczyćie z obiektu. Gdy podczas próby odczyty własności okaże się, że obiekt nie posiada takowej o wskazanej nazwie JS podejmie próbę pobrać wartość, o takiej samej nazwie, z prototypu. Jeżeli prototyp rownież nie będzie posiadał takiej własności, operacja zostanie powturzona, dopóki proces wyszukiwania nie dotrze do `Object.prototype`. Jeżeli żadana własność nie została znaleziona w całym łańcuchu prototypów, zostanie zwrócona wartość `undefined`. Mechanizm ten nazywa się *delegacją*


```
var WidgetConstructor = function() {};

WidgetConstructor.prototype.name = '';
WidgetConstructor.prototype.type = '';
WidgetConstructor.prototype.element = '';

WidgetConstructor.prototype.create = function() {
  return this.element;
};

WidgetConstructor.prototype.getType = function() {
  return this.type;
};


var Widget = new WidgetConstructor;

var LiWidgetConstructor = function() {};
LiWidgetConstructor.prototype = Widget;
LiWidgetConstructor.prototype.name = '';
LiWidgetConstructor.prototype.type = 'li';
LiWidgetConstructor.prototype.element = '<li></li>';


var liWidget = new LiWidgetConstructor;

liWidget.create() // '<li></li>'
liWidget.getType() // 'li'
```

### Wyliczanie

Do wyliczenia własności w obeikcie możemy użyć unstrukcji `for in`. Wyliczanie takie będzie zawierałe wszystkie własnośći włączając w to funkcje i własności prototypów. Konieczne jest odfiltrowanie nichcianych wartości. Najczęscie stosowaną metodą jest `hasOwnProperty` i użycie `typeof` pomocne przy pomijaniu funkcji. Przy użyciu instrukcji `for in` nie ma gwarancji co do kolejności wypisywanych własności i aby uniknąć takiej sytuacji najlepiej jest całkowicie zrezygnować z użycia tej instrukcji i pozostać przy pętli `for`.

```
var i;
var obiekt = {
  wlasnosc1: 'wartosc1',
  wlasnosc2: 'wartosc2',
  wlasnosc3: 'wartosc3',
  wlasnosc4: 'wartosc4',
};
var keys = Object.keys(obiekt);

for(i=0; i < keys.length; i+=1) {
  console.log(obiekt[keys[i]]);
}
```

### Usuwanie

Operator `delete` może być użyty do usunięcia własności z obiektu. Usuwanie on tylko własności należące do obiektu, nie modyfukując przy tym prototypów. Usunięcie własności z obiektu, o takiej samej nazwie jak z prototypu, spowoduje że własność prototypu stanie się widoczna.

```
obiekt.wlasnosc // 'wartosc_1'

delete obiekt.wlasnosc

obiekt.wlasnosc // 'wartosc'
```

## Funkcje

Obiekty w JS są obiektami. Ponieważ funkcje są obiektami mogą być używanie jak każda inna wartość. Fukcje mogą być przechowywane z zmiennych, obiektach, tablicach. Mogą być przekazywane jako argumanty do funkcji oraz zwracane z funkcji.Dodatkowo, jako że funkcje są obiektami, mogą mieć metody. To co wyróżnia funkcje, to fakt, że mogą być wywoływane.

### Literał funkcji

Obiekty funkcji tworzymy przy pomocy literafu funkcji

```
var dodaj = function(a, b) {
  return a + b;
}
```

Literał skałda się z czterech częsc:

* słwowo zastrzeżone `function`
* opcjonalna nazwa funkcji. Nazwa ta może posłużyć do wywołań rekurencyjnych. Nazwa może być używana także przez debuggery w czelu identyfikacji funkcji. Jeżeli funkcja nie ma nazwy, jest nazwaną anonimową.
* trzeci to zbiór parametrów funkcji umieszczonych w nawiasach. Parametrów może być zero lub więcej, oddzialonych przecinkami. Nazwy te składają się na zbiór zmiennych wewnątrz funkcji. W przeciwieństwie do zwykłych zmiennych nie są one inicjalizowane wartością `undefined`, lecz wartościami argumentów przekazanymi podczas wywołania funkcji.
* czerty, to zbór instrukcji wewnątrz nawiasów klamrowych. Instrukcje stanowią ciało funkji i są wykownywane kiedy funkcja zostanie wywołana.


Funkcje mogą być definiowane wewnątrz innych funkcji. Taka wewnątrzna funkcja ma, ocziwiście dostęp do swoich własnych parametrów i zmiennych, jak i parametrów i zmiennych funkcji, wewnątrz której jest zagnieżdżona. Nazywa się `domknięciem`.


### Wywoałnie

Wywołanie funkcji zawiesza wywoałanie bieżącej funkcji, przekazując sterowanie oraz zbiór parametrów do nowej funkcji. Obok parametrów zadeklarowanych, każda funkcja otrzymuje dwa dodatkowe `this` oraz `arguments`. Wrtość paramteru `this` jest ustalana w zależności od _wzorca wywołania_. Istnieją cztery wzorce wywołania w JS: wzorce wywoałnia metody, funkcji i konstruktora oraz wzorzec zastosowania wywołania. Wzorce te różnią się sposobem inicjalizacji parametru `this`.

Operatorem wywołania jest para nawiasów następująca po dowolnym wyrażeniu tworzącym wartość funkcji. Jeśli liczba argumentów i liczba paramrtrów się nie zgadza, nie jest zgłaszany błąd. Zamiast tego nadmiarowe argumenty są pomijane, a brakujące inicjalizowane wartośćiami `undefined`. Nie istnieje żadna kontrola typów argumentów: dowoly typ wartości może być przekazany dowolnemu parametrowi.

### Wzorzec wywowałania metody

Kiedy funkja jest przypisana do własności obiektu wówczas nazywamy ją `metodą`. Kiedy metoda jest wywołana, `this` odnosi się do tego właśnie obiektu.

```
var obiekt = {
  wartosc: 0,
  zwieksz: function (inc) {
    this.wartosc += typeof inc === 'number' ? inc : 1;
  }
};

obiekt.zwieksz();
console.log(obiekt.wartosc) // 1

obiekt.zwieksz(2);
console.log(obiekt.wartosc) // 3
```

Metoda może użyć parametru `this`, aby zuyskać dostęp do innych własności obiektu w celu ich odczytu lub modyfikacji. Wiązanie obiekty do zmiennej `this` następuje w momencie wywołania. Metody, które otrzymują dostęp do kontekstu obiektu poprzez `this`, są nazywane _metodami publicznymi_.

### Wzorzec wywoałnia funkcji

Gdy funkcja nie jest własnością obiektu, wówczas jest wywoływana jako funkcja:

```
var suma = dodaj(5, 6);
```

Parametry `this` w tym przypadku związany jest z globalnym obiektem. Jest to niestety problem w projekcie języka. Z powodu tego błedu metoda (poprzedni punkt) nie może wykorzystać w swym działaniu funkcji pomocniczych, ponieważ funkcje wewnętrzne nie współdzilą z metodą dostępu do swojego obiektu.

```
var obiekt = {
  wartosc: 3
};
var pomnoz = function (a, b) {
  return a * b;
};

obiekt.kwadrat = function () {
  var pomocnicza = function () {
    this.wartosc = pomnoz(this.wartosc, this.wartosc);
  };
  pomocnicza();
};
obiekt.kwadrat();
console.log(obiekt.wartosc); // 3
```

Istnieje jednak proste obejscie tego problemu poprzez zdefiniowanie nowej zmiennej i przypisanie jej wartości `this`. Wówczas funkcja wewnętrzna będzie miała dostęp do `this` poprzez zmienną.

```
var obiekt = {
  wartosc: 3
};
var pomnoz = function (a, b) {
  return a * b;
};

obiekt.kwadrat = function () {
  var that = this;
  var pomocnicza = function () {
    that.wartosc = pomnoz(that.wartosc, that.wartosc);
  };
  pomocnicza();
};
obiekt.kwadrat();
console.log(obiekt.wartosc); // 9
```

### Wzorzec wywołania konstruktora

JS jest językiem bezklasowym, jednak obiekty mogą dzidziczyć własności bezpośrednio z innych obiektów, w oparciu o _dziedziczenie prototypowe_. Z językami klasycznymi JS posiada podobny sposób tworzenia obiektów.

Jeżeli funkcja jest wywoływana przy użycia słowa `new`, wówczas tworzony jest nowy obiekt z ukrytym lącznikiem do wartości własności `prototype` tej funkcji, a następnie `this` jest wiązane z nowo utworzonym obiektem.

```
var F = function (status) {
  this.status = status;
};

F.prototype.getStatus = function () {
  return this.status;
};

var mojF = new F('nowy');
console.log(mojF.getStatus()); // 'nowy'
```

Funkcje, które są zaprojekotwane do użycia ze słowem `new`, są to tak zwane _konstruktory_. Umownie nazwy zapisuje się zaczynające od wielkiej litery.

### Wzorzec zastosowania wywołania

Ponieważ JS jest funkcjonalnym językiem obiektowym, funkcje mogą posiadać metody. Jedną z nich jest metoda `apply` pozwalająca na skonstruowanie tablicy argumentów, które mają być przekazane wywołanej metodzie, oraz na wybór wartości `this`.

```
var tablica = [3, 4];
var dodaj = function (a, b) {
  return a + b;
};

console.log(dodaj.apply(null, tablica)) // 7

var obiektZeStatusem = {
  status: 'nowy ale inny'
};

console.log(F.prototype.getStatus.apply(obiektZeStatusem));
```

### Argumenty

Dodatkowym porametrem dostępnym funkcjom podczas ich wywołania jest tablica `arguments`. Daje ona dostęp do _wszystkich_ argumentów, które były przekazane podczas wywołania. Umożliwia to pisanie funkcji pobierających nieokreśloną liczbę parametrów.

```
var dodaj = function() {
  var i, suma = 0, len = arguments.length;
  for(i = 0; i < len; i+=1) {
    suma += arguments[i];
  }
  return suma;
};

console.log(dodaj(1,2,3,4,5,6)); // 21
```

Należy jednak zaznaczyć, że `arguments` nie jest prawdziwą tablicą. Jest to obiekt udający tablicę. Posiada on własność `length`, ale brakuje mu wszystkich metod, jakie mają tablice.

### Powrót z funkcji

Kiedy funkcja zostaje wywołana, jej wykonanie zaczyna się od pierwszej instrukcj, a kończy po dojściu do nawiasu zamykającego. Sterowanie powraca do tego miejsca programu, gdzie funkcja została wywyołana.

Instrukcja `return` może być użyta do wcześniejszego powrotu z funkcji. Kiedy instrukcja `return` zostaje wykonana, funkcja kończy się natychmiast.

Funkcja zawsze zwraca wartość, nawet wówczas gdy nie jest ona określona przez instrukcję `return` i zwraca wartość `undefined`.

Jeśli funkcja została wywołana ze słowem `new`, a zwracana wartość określona przez instrukcję `return` nie jest obiektem, wówczas zwracana jest wartość `this`.
