to run the program, execute the following commands:

`npm install`

`webpack`

`node server.js`


Użytkownik anonimowy (bez logowania)
– określenie własnego identyfikatora (nicka)
– przeglądanie listy ”pokoi” w których trwają rozgrywki 
– założenie nowego pokoju
– dołączenie do pokoju w którym ktoś oczekuje na grę 
– możliwość rozegrania całej partii wybranej gry


zasady gry:
- jeśli obaj gracze wybiorą fold, nikt nie otrzymuje punktu
- jeśli jeden gracz pójdzie all-in a drugi da fold, to ten pierwszy otrzymuje 1 punkt a drugi 0
- jeśli obaj gracze pójdą all-in, wykładane jest 5 kart i punkt otrzymuje ten, kto wygrał rozdanie, a ten kto przegrał traci 1 punkt
- grę wygrywa ten, kto pierwszy zdobędzie 7 punktów