Zadanie jest następujące: Napisać logikę do search service, która będzie zwracała wyniki wyszukiwania z swapi.dev

swapi obsługuje query parameter "search" oraz "page"

Pożądane cechy serwisu są następujące:
- powinien wykonywać możliwie jak najmniej requestów
- wyszukiwanie powinno zachodzić w wybranej kategorii
- ładowanie kolejnych wyników powinno wyświetlać sumę poprzednich i obecnych wyników
- całość powinna być napisana możliwie w jak największym stopniu przy pomocy rxjs
- search powinien obsługiwać błędy w odpowiedzi od serwera - kod powinien być czysty i reusable
