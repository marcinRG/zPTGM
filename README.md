### Zadanie: Napisać logikę do search service, która będzie zwracała wyniki wyszukiwania z swapi.dev

```
swapi obsługuje query parameter "search" oraz "page"
Pożądane cechy serwisu są następujące:
powinien wykonywać możliwie jak najmniej requestów
wyszukiwanie powinno zachodzić w wybranej kategorii
ładowanie kolejnych wyników powinno wyświetlać sumę poprzednich i obecnych wyników
całość powinna być napisana możliwie w jak największym stopniu przy pomocy rxjs
search powinien obsługiwać błędy w odpowiedzi od serwera - kod powinien być czysty i reusable
```

#### Rozwiązanie

W moim rozwiązaniu serwis `search.service.ts` prawie w całości został napisany za pomocą biblioteki _rx.js_. Serwis ten posiada następujące publiczne metody:

`changeSearchText(value: IHasTargetWithValue)` - funkcja do zmiany przeszukiwanego tekstu. Argumentem jest dowolny obiekt posiadający pole target.value np. dowolny event javascriptowy.
`changeCategory(value: IHasTargetWithValue)` - funkcja do zmiany przeszukiwanej kategorii. Argument taki sam jak ja funkcja powyżej.
`changePage(value: ILink)` - funkcja, dzięki której można pobrać dane bezpośrednio z podanego adresu.

Serwis udostępnia następujące dane:
`getCategoryAndText(): Observable<IHasCategory & IHasText>` - dane ostatniego zapytania kategoria i tekst
`getAppState(): Observable<IPageState>` - stan aplikacji oraz aktualna strona.
`getData(): Observable<IResponse>` - dane zwrócone przez serwer po wykonaniu aktualnego zapytania.

#### Opis działania aplikacji + uwagi

* Ponieważ aplikacja jest mała, wszystkie style znajdują się w jednym pliku.
* Podobnie, ponieważ jest tylko jeden subscriber do danych zwracanych przez serwis, dlatego na wyjściu z serwisu są Observable. Przy większej ilości subskrybentów to nie byłoby chyba zbyt wydajne rozwiązanie.
* Żeby ograniczyć ilość zapytań, dane wprowadzane przez użytkownika są debouce'owane. **Uwaga!** przez zastosowanie `combineLatest` pierwsze zapytanie na serwer wysyłane jest dopiero wtedy, kiedy użytkownik zmieni kategorię i wpisze coś w pole wyszukiwania
* Nie rozumiem o co chodzi w tej części zadania: _**ładowanie kolejnych wyników powinno wyświetlać sumę poprzednich i obecnych wyników**_ - zrozumiałem, że chodzi o zrobienie standardowych komponentów typu strona y z x wszystkich, albo pokazuje od a do b z c rezultatów.
* Dodałem własny komponent zawierający poprzednie wyszukania, którego nie było w specyfikacji zadania.
