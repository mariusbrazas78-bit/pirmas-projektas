# Project Context

## 1. Projekto aprašymas

**Projekto pavadinimas:** Pirmas Projektas / Naujas Mariaus Projektas

Tai mokomasis **React + Vite** projektas, kuriamas AI / Vibe Coding mokymų metu.

Pagrindinis tikslas – praktiškai mokytis internetinių aplikacijų kūrimo naudojant React ir AI programavimo įrankius, palaipsniui plečiant projektą naujais komponentais ir funkcijomis.

Projektas turi būti vystomas etapais, išlaikant kodą paprastą ir suprantamą pradedančiajam.

---

## 2. Technologijos

Projektas naudoja:

- React 19
- React DOM 19
- Vite 8
- JavaScript
- JSX
- CSS
- React Hooks (`useState`)
- ESLint

Šiuo metu projekte nėra:

- TypeScript
- backend
- duomenų bazės
- autentifikacijos sistemos
- papildomos state management bibliotekos
- UI framework

Naujų bibliotekų nepridėti be aiškios priežasties.

---

## 3. Projekto struktūra

```text
PIRMAS-PROJEKTAS/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── LoginForm.css
│   ├── LoginForm.jsx
│   ├── main.jsx
│   ├── ProgressBar.css
│   └── ProgressBar.jsx
│
├── .gitignore
├── AI_RULES.md
├── context.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

---

## 4. Pagrindinis komponentas – App.jsx

`App.jsx` yra pagrindinis aplikacijos komponentas.

Jis šiuo metu importuoja:

- `useState`
- pagrindinį paveikslėlį iš `assets`
- React ir Vite logotipus
- `ProgressBar`
- `LoginForm`
- `App.css`

Puslapyje šiuo metu yra:

1. pagrindinė projekto iliustracija;
2. antraštė „Naujas Mariaus Projektas“;
3. Vite demonstracinis HMR tekstas;
4. `Subscribe` skaitiklis;
5. „Mano dienotvarkė“ blokas;
6. kontaktų / socialinių nuorodų blokas;
7. projekto progreso juosta;
8. prisijungimo forma.

---

## 5. Subscribe skaitiklis

`App.jsx` naudoja React `useState`.

Dabartinis skaitiklis:

```jsx
const [count, setCount] = useState(0)
```

Paspaudus `Subscribe` mygtuką reikšmė padidinama vienetu.

Tai šiuo metu yra mokomasis React state pavyzdys.

---

## 6. LoginForm komponentas

Failai:

```text
src/LoginForm.jsx
src/LoginForm.css
```

Komponentas turi:

- el. pašto lauką;
- slaptažodžio lauką;
- mygtuką „Prisijungti“.

Naudojami du `useState`:

```jsx
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
```

Šiuo metu tai tik demonstracinė prisijungimo forma.

Paspaudus „Prisijungti“:

- sustabdomas standartinis formos submit;
- parodomas `alert` su įvestu el. paštu.

Tikros autentifikacijos dar nėra.

Slaptažodis nėra siunčiamas į serverį ar duomenų bazę.

---

## 7. ProgressBar komponentas

Failai:

```text
src/ProgressBar.jsx
src/ProgressBar.css
```

Komponentas gauna `progress` reikšmę per props.

Šiuo metu `App.jsx` naudojama:

```jsx
<ProgressBar progress={65} />
```

Todėl rodomas:

**65 %**

Komponentas apriboja reikšmę tarp:

```text
0–100 %
```

naudodamas:

```jsx
Math.min(100, Math.max(0, progress))
```

---

## 8. ProgressBar būsenos

`ProgressBar` palaiko keturias būsenas.

### Normal

Rodoma progreso juosta ir procentas.

### Loading

Naudojama:

```jsx
loading={true}
```

Rodoma:

```text
Kraunamas projekto progresas...
```

Taip pat rodoma loading animacija.

### Error

Naudojama:

```jsx
error={true}
```

Rodoma:

```text
Nepavyko įkelti progreso
Įvyko klaida. Bandykite dar kartą.
```

### Empty

Kai:

```jsx
progress === null
```

arba:

```jsx
progress === undefined
```

rodoma:

```text
Projekto progresas
Progreso duomenų dar nėra.
```

Šios būsenos yra realizuotos, tačiau `App.jsx` šiuo metu naudojama normali būsena su `progress={65}`.

---

## 9. CSS ir dizainas

Pagrindiniai globalūs nustatymai yra:

```text
src/index.css
```

Komponentų stiliai:

```text
src/App.css
src/LoginForm.css
src/ProgressBar.css
```

Naudojami CSS variables:

```css
--text
--text-h
--bg
--border
--code-bg
--accent
--accent-bg
--accent-border
--social-bg
--shadow
```

Pagrindinė akcentinė spalva yra violetinė.

---

## 10. Light / Dark Mode

Projektas palaiko:

- Light Mode
- Dark Mode

Dark Mode nustatomas automatiškai pagal vartotojo operacinės sistemos nustatymus naudojant:

```css
@media (prefers-color-scheme: dark)
```

Keičiant dizainą būtina išlaikyti abiejų režimų veikimą.

---

## 11. Responsive dizainas

Projektas turi responsive CSS taisykles.

Pagrindinis breakpoint:

```text
1024px
```

Mažesniuose ekranuose keičiasi:

- elementų išdėstymas;
- padding;
- teksto dydžiai;
- progreso juostos dydis;
- prisijungimo formos išdėstymas.

Nauji komponentai taip pat turi būti pritaikyti mažesniems ekranams.

---

## 12. Dabartinis funkcionalumas

Šiuo metu realizuota:

- React + Vite aplikacija;
- pagrindinis `App` komponentas;
- projekto iliustracija;
- Subscribe skaitiklis;
- dienotvarkės blokas;
- kontaktų blokas;
- `ProgressBar` komponentas;
- progreso procentų rodymas;
- Loading state;
- Error state;
- Empty state;
- `LoginForm` komponentas;
- el. pašto įvedimas;
- slaptažodžio įvedimas;
- formos submit apdorojimas;
- Light / Dark Mode;
- responsive dizaino pagrindai.
- „Nauja užduotis“ mygtukas užduočių skiltyje;
- naujos užduoties pridėjimas ir rodymas sąraše (duomenys laikomi React būsenoje).

---

## 13. Dar neįgyvendintas funkcionalumas

Dar nėra:

- tikros vartotojo registracijos;
- tikro prisijungimo;
- atsijungimo;
- vartotojo sesijos;
- vartotojo profilio;
- užduočių sąrašo;
- užduočių kūrimo;
- užduočių redagavimo;
- užduočių ištrynimo;
- užduočių pažymėjimo kaip atliktų;
- redaguojamos dienotvarkės;
- automatinio progreso skaičiavimo;
- backend;
- API;
- duomenų bazės;
- nuolatinio duomenų saugojimo.

---

## 14. Projekto tikslas

Ilgainiui aplikacijos vartotojas turėtų galėti:

### Prisijungimas

- prisijungti;
- atsijungti;
- registruotis.

### Užduotys

- sukurti užduotį;
- matyti užduočių sąrašą;
- pažymėti užduotį kaip atliktą;
- redaguoti užduotį;
- ištrinti užduotį.

### Dienotvarkė

- matyti dienotvarkę;
- pridėti dienotvarkės elementus;
- redaguoti dienotvarkę;
- pašalinti elementus.

### Progresas

Projekto / vartotojo progresas ateityje turėtų būti skaičiuojamas automatiškai pagal atliktas užduotis.

### Profilis

Ateityje planuojamas vartotojo profilis.

### Duomenys

Ateityje turi būti įdiegtas nuolatinis duomenų saugojimas.

Konkreti backend ir duomenų bazės technologija dar nepasirinkta.

---

## 15. Tolimesni darbai

Artimiausi projekto etapai:

1. Sukurti užduočių sąrašą.
2. Sukurti naujos užduoties pridėjimą.
3. Leisti pažymėti užduotį kaip atliktą.
4. Leisti ištrinti užduotį.
5. Leisti redaguoti užduotį.
6. Susieti užduotis su progreso juosta.
7. Padaryti dienotvarkę redaguojamą.
8. Tobulinti prisijungimo sistemą.
9. Sukurti vartotojo profilį.
10. Įdiegti nuolatinį duomenų saugojimą.

Eiliškumas gali keistis pagal mokymų užduotis.

---

## 16. AI darbo su projektu principai

AI prieš atlikdamas pakeitimus turi:

1. Perskaityti `context.md`.
2. Perskaityti `AI_RULES.md`.
3. Patikrinti esamą projekto struktūrą.
4. Naudoti jau egzistuojančius komponentus, kai tai įmanoma.
5. Nekurti dubliuojančių komponentų.
6. Nekeisti veikiančio kodo be priežasties.
7. Nekurti nereikalingų bibliotekų ar architektūros.
8. Rinktis paprasčiausią tinkamą sprendimą.
9. Atsižvelgti į tai, kad projektas yra mokomasis.
10. Svarbesnius pakeitimus trumpai paaiškinti.

---

## 17. Kodo pateikimo taisyklė

Projekto savininkas mokosi React ir Vibe Coding, todėl instrukcijos turi būti konkrečios.

Jeigu reikia pakeisti kodą:

- aiškiai nurodyti failo pavadinimą;
- aiškiai nurodyti failo vietą;
- paaiškinti, ką pakeitimas padarys;
- kai praktiška, pateikti visą atnaujintą failo turinį;
- nurodyti, ką po pakeitimo patikrinti naršyklėje.

Jeigu kuriamas naujas komponentas, nurodyti:

```text
1. Kur sukurti failą
2. Kaip jį pavadinti
3. Ką į jį įklijuoti
4. Kur komponentą importuoti
5. Kur komponentą panaudoti
6. Ką vartotojas turi pamatyti naršyklėje
```

---

## 18. Saugumo principai

AI neturi:

- dėti slaptažodžių į kodą;
- dėti API raktų tiesiai į React komponentus;
- dėti slaptų duomenų į Git repozitoriją;
- imituoti saugaus prisijungimo, jei autentifikacija realiai nėra įdiegta.

Jeigu ateityje bus naudojami API raktai ar kiti slapti duomenys, jie turi būti laikomi tinkamuose environment variables arba backend pusėje.

---

## 19. Dokumentacijos taisyklė

Projektas turi tris pagrindinius dokumentacijos failus:

### README.md

Skirtas projekto pristatymui žmogui.

Jame turi būti:

- projekto paskirtis;
- pagrindinės technologijos;
- pagrindinis funkcionalumas;
- projekto paleidimo instrukcijos.

### context.md

Tai pagrindinė AI projekto atmintis.

Jame saugoma:

- dabartinė projekto būsena;
- komponentai;
- funkcionalumas;
- techniniai sprendimai;
- planuojami darbai.

### AI_RULES.md

Nurodo, kaip AI turi elgtis dirbdamas su projektu.

---

## 20. Context atnaujinimo taisyklė

Po kiekvieno reikšmingo programavimo etapo `context.md` turi būti atnaujintas.

Atnaujinant reikia užfiksuoti:

- kas sukurta;
- kas pakeista;
- kokie failai sukurti;
- kokie failai pakeisti;
- kas šiuo metu veikia;
- kokios problemos liko;
- koks yra kitas planuojamas etapas.

Negalima pašalinti ankstesnio svarbaus projekto konteksto, jeigu jis vis dar aktualus.

---

## 21. Dabartinė projekto būsena

**Paskutinį kartą kontekstas atnaujintas:** 2026-10-06

### 2026-10-06 atnaujinimas

`src/App.jsx` užduočių skiltyje pridėtas „Nauja užduotis“ mygtukas. Jį paspaudus atveriama forma; įvedus pavadinimą ir paspaudus „Pridėti“, užduotis parodoma sąraše. Tuščias arba vien tarpų pavadinimas nepridedamas. Užduotys saugomos tik React būsenoje ir dingsta perkrovus puslapį.

`src/App.css` pridėti formos, mygtuko ir užduočių sąrašo stiliai, naudojant esamus spalvų kintamuosius.

Pakeisti failai: `src/App.jsx`, `src/App.css`, `contex.md`.

Projektas veikia kaip React + Vite aplikacija.

Pagrindiniame puslapyje yra:

- projekto paveikslėlis;
- antraštė „Naujas Mariaus Projektas“;
- Subscribe skaitiklis;
- „Mano dienotvarkė“;
- kontaktų blokas;
- 65 % progreso juosta;
- prisijungimo forma.
- užduoties pridėjimo forma ir sesijos metu rodomas užduočių sąrašas.

Pagrindiniai atskiri komponentai:

```text
LoginForm
ProgressBar
```

Dabartinė prisijungimo forma yra demonstracinė.

Dabartinis 65 % progresas yra statinė reikšmė.

Duomenų bazė ir backend dar nenaudojami.

---

## 22. Kitas projekto etapas

Pagrindinė tolimesnė kryptis:

**užduočių sąrašo (Task List) kūrimas.**

Pirmasis sąrašo etapas įgyvendintas: užduotis galima pridėti ir matyti iki puslapio perkrovimo. Kitas etapas gali būti užduočių atlikimo žymėjimas ir ištrynimas; nuolatinis saugojimas dar neįdiegtas.

Pirmame etape vartotojas turėtų galėti:

1. įrašyti užduoties pavadinimą;
2. pridėti užduotį;
3. matyti pridėtų užduočių sąrašą;
4. pažymėti užduotį kaip atliktą;
5. ištrinti užduotį.

Vėliau atliktų užduočių skaičių galima susieti su `ProgressBar`.

---

## 23. Pagrindinis principas

Šis projektas yra mokomasis.

Todėl priimant techninius sprendimus prioritetas yra:

**paprastumas → aiškumas → veikiantis kodas → supratimas → palaipsnis tobulinimas.**

AI neturi be reikalo paversti projekto sudėtinga produkcine sistema.
