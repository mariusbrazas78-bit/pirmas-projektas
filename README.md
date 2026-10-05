# MANO DIENOTVARKĖ

Mokomasis **React + Vite** projektas, kuriamas AI / Vibe Coding mokymų metu.

Projekto tikslas – praktiškai mokytis React aplikacijų kūrimo, palaipsniui pridedant naujus komponentus, vartotojo sąveiką, užduočių valdymą, autentifikaciją ir duomenų saugojimą.

## 🚀 Naudojamos technologijos

- React 19
- Vite 8
- JavaScript / JSX
- CSS
- React Hooks
- ESLint

## 📁 Projekto struktūra

```text
PIRMAS-PROJEKTAS/
├── public/
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── LoginForm.css
│   ├── LoginForm.jsx
│   ├── main.jsx
│   ├── ProgressBar.css
│   └── ProgressBar.jsx
│
├── context.md
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## ✅ Dabartinis funkcionalumas

Šiuo metu aplikacijoje realizuota:

- pagrindinis React puslapis;
- projekto iliustracija;
- „Subscribe“ skaitiklis;
- dienotvarkės informacinis blokas;
- kontaktų / socialinių nuorodų blokas;
- projekto progreso juosta;
- progreso procentų rodymas;
- `loading`, `error` ir `empty` progreso būsenos;
- prisijungimo forma;
- el. pašto ir slaptažodžio įvedimo laukai;
- Light / Dark Mode;
- responsive dizaino pagrindai.

## 📊 Projekto progresas

Šiuo metu demonstracinė projekto progreso reikšmė:

**65 %**

Progreso atvaizdavimui naudojamas atskiras `ProgressBar` komponentas.

Ateityje progresas galės būti automatiškai apskaičiuojamas pagal atliktas vartotojo užduotis.

## 🔐 Prisijungimas

Projektas turi `LoginForm` komponentą su:

- el. pašto lauku;
- slaptažodžio lauku;
- mygtuku „Prisijungti“.

Šiuo metu tai yra demonstracinė prisijungimo forma.

Tikra autentifikacija, vartotojų registracija ir duomenų bazė dar nėra prijungtos.

## 🎯 Planuojamas funkcionalumas

Toliau projekte planuojama sukurti:

- užduočių sąrašą;
- naujų užduočių pridėjimą;
- užduočių redagavimą;
- užduočių ištrynimą;
- užduočių pažymėjimą kaip atliktų;
- automatinį progreso skaičiavimą;
- redaguojamą dienotvarkę;
- tikrą vartotojo prisijungimą;
- vartotojo profilį;
- nuolatinį duomenų saugojimą.

## ▶️ Projekto paleidimas

Pirmiausia įdiek projekto priklausomybes:

```bash
npm install
```

Tada paleisk projektą:

```bash
npm run dev
```

Terminale bus parodytas lokalus adresas, kuriuo galima atidaryti aplikaciją naršyklėje.

## 🛠️ Kitos komandos

Patikrinti projektą su ESLint:

```bash
npm run lint
```

Sukurti produkcinę projekto versiją:

```bash
npm run build
```

Peržiūrėti sukurtą produkcinę versiją:

```bash
npm run preview
```

## 🧩 Pagrindiniai komponentai

### `App.jsx`

Pagrindinis aplikacijos komponentas, kuris sujungia skirtingas puslapio dalis.

### `LoginForm.jsx`

Atsakingas už prisijungimo formos atvaizdavimą ir jos laukų būseną.

### `ProgressBar.jsx`

Atsakingas už projekto progreso atvaizdavimą ir skirtingas progreso būsenas.

## 📖 Projekto kontekstas

Detalesnė techninė informacija apie projekto struktūrą, priimtus sprendimus, atliktus darbus ir planuojamus pakeitimus saugoma:

```text
context.md
```

`context.md` naudojamas kaip projekto tęstinio konteksto dokumentas dirbant su AI.

Po reikšmingų projekto pakeitimų šis dokumentas turi būti atnaujinamas.

## 📌 Projekto statusas

**Statusas:** kuriamas / mokomasis projektas  
**Dabartinis etapas:** pagrindinės React aplikacijos struktūros ir komponentų kūrimas  
**Kitas planuojamas etapas:** užduočių sąrašo (`Task List`) kūrimas

---

Projektas kuriamas mokymosi tikslais, siekiant praktiškai išmokti React, Vite ir AI/Vibe Coding principus.