# Italian Meals App

## Progetto

Italian Meals App è un'applicazione mobile React Native/Expo che permette di:

- effettuare il login con utenti mock
- esplorare una lista di piatti italiani tramite TheMealDB
- visualizzare i dettagli di ogni piatto
- salvare i preferiti
- navigare tra schermate con deep link
- gestire impostazioni e logout

**Autore:** Alessandro Alzati

---

## Requisiti di sistema

Prima di iniziare assicurati di avere installato:

- Node.js LTS
- Expo Go sul tuo dispositivo o un emulatore Android/iOS
- npm (incluso con Node.js)

---

## Installazione e avvio

Esegui i seguenti comandi nella cartella del progetto:

```bash
git clone <url-repo>
cd <nome-cartella>
npm install
npx expo start
```

Dopo aver avviato Expo:

- premi `a` per aprire l'app su Android
- oppure usa il QR code con Expo Go

---

## API usate

L'app utilizza TheMealDB per recuperare i dati dei piatti italiani.

Documentazione ufficiale:

- https://www.themealdb.com/api.php

Endpoint utilizzati:

- `https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian`
- `https://www.themealdb.com/api/json/v1/1/lookup.php?i=<id>`

---

## Utenti mock per il login

| Email                     | Password    |
| ------------------------- | ----------- |
| mario.rossi@student.it    | React2026!  |
| giulia.bianchi@student.it | Expo2026!   |
| luca.verdi@student.it     | Mobile2026! |

---

## Deep linking

L'app è configurata per supportare i seguenti path:

- `home`
- `settings`
- `profile`
- `meal/:idMeal`

Esempio di deep link:

- `myapp://meal/52772`
- oppure tramite Expo: `exp://<your-local-ip>:8081/--/meal/52772`

Per testare il deep linking, avvia l'app e apri il link sul dispositivo/emulatore.

---

## Scelta dello stato globale

Lo stato globale è gestito tramite un `AuthContext` per mantenere l'autenticazione dell'utente e condividere il login tra le schermate.

Questa scelta è stata fatta per:

- evitare di passare manualmente l'utente tra le schermate
- mantenere lo stato di login consistente
- semplificare il logout e il recupero dello stato dopo refresh/ricarica

---

## Edge case gestiti

L'app gestisce i seguenti casi:

- errore di rete durante il caricamento dei piatti
- login fallito con credenziali errate
- lista vuota di piatti o preferiti
- preferiti salvati localmente
- deep link non valido o meal non trovata

---

## Feature opzionali implementate

- schermata impostazioni con tema chiaro/scuro
- logout dalla schermata impostazioni
- preferiti persistenti
- deep linking per dettaglio piatto

---

## Google Doc

Link al documento di supporto per i laboratori 13–22:

- https://docs.google.com/document/d/1RXdJJVh4GlMYAngYksM9MLcUvdgkYoO3lizdgMCK36Y/edit?tab=t.2f5534ha91x4

---

## Struttura del progetto

```text
MyApp/
  App.tsx
  src/
    components/
    context/
    screens/
    services/
```

---

## Note finali

Questa app è stata sviluppata come progetto finale per mostrare un flusso completo React Native/Expo con:

- autenticazione mock
- navigation
- API esterna
- persistenza locale
- deep linking
- UI responsive e navigazione tra schermate
