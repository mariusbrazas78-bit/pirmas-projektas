import { useState } from 'react'
import profileImg from './assets/IMG_20260827_081234.jpg'
import ProgressBar from './ProgressBar'
import LoginForm from './LoginForm'
import './App.css'

const weekDays = [
  'Pirmadienis',
  'Antradienis',
  'Trečiadienis',
  'Ketvirtadienis',
  'Penktadienis',
  'Šeštadienis',
  'Sekmadienis',
]

const shortWeekDays = ['Pr', 'An', 'Tr', 'Kt', 'Pn', 'Št', 'Sk']

const categories = ['Tikslai', 'Pasiekimai', 'Laisvalaikiss']

function App() {
  const [selectedDay, setSelectedDay] = useState('Pirmadienis')
  const [selectedCategory, setSelectedCategory] = useState('Tikslai')
  const [showLogin, setShowLogin] = useState(false)

  function changeScreen(loginIsVisible) {
    setShowLogin(loginIsVisible)
    window.scrollTo(0, 0)
  }

  if (showLogin) {
    return <LoginForm onBack={() => changeScreen(false)} />
  }

  return (
    <>
      <header id="center">
        <div className="profile-actions">
          <button
            type="button"
            className="day-button login-open"
            onClick={() => changeScreen(true)}
          >
            Prisijungti
          </button>
          <img
            src={profileImg}
            className="profile-image"
            width="56"
            height="56"
            alt="Mano profilio nuotrauka"
          />
        </div>
        <nav className="main-nav" aria-label="Pagrindinė navigacija">
          <a className="nav-brand" href="#center">MANO DIENOTVARKĖ</a>
          <a href="#docs">Užduotys</a>
          <a href="#progress">Progresas</a>
          <button type="button" onClick={() => changeScreen(true)}>
            Profilis
          </button>
        </nav>
      </header>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg
            className="icon"
            role="presentation"
            aria-hidden="true"
          >
            <use href="/icons.svg#documentation-icon"></use>
          </svg>

          <h2>Užduočių Sąrašas</h2>

          <div className="week-days week-picker" role="group" aria-label="Pasirinkite savaitės dieną">
            {weekDays.map((day, index) => (
              <button
                key={day}
                type="button"
                className="day-button"
                aria-label={day}
                title={day}
                aria-pressed={selectedDay === day}
                onClick={() => setSelectedDay(day)}
              >
                {shortWeekDays[index]}
              </button>
            ))}
          </div>


        </div>

        <div id="social">
          <svg
            className="icon"
            role="presentation"
            aria-hidden="true"
          >
            <use href="/icons.svg#social-icon"></use>
          </svg>

          <div className="week-days" role="group" aria-label="Pasirinkite kategoriją">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className="day-button"
                aria-pressed={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>


        </div>
      </section>

      <div className="ticks"></div>

      <div id="progress">
        <ProgressBar progress={65} />
      </div>

      <div className="ticks"></div>

      <footer id="spacer" aria-label="Socialinės nuorodos">
          <p>Join us by:</p>

          <ul>
            <li>
              <a
                href="https://github.com/vitejs/vite"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                Email:
              </a>
            </li>

            <li>
              <a
                href="https://chat.vite.dev/"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Instagram
              </a>
            </li>

            <li>
              <a
                href="https://x.com/vite_js"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>

            <li>
              <a
                href="https://bsky.app/profile/vite.dev"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                WhatsApp
              </a>
            </li>
          </ul>
      </footer>
    </>
  )
}

export default App
