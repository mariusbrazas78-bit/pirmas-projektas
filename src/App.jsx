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
const initialTasks = [
  { id: 1, title: 'AI mokymai', completed: false },
  { id: 2, title: 'Pasivaikščiojimas', completed: false },
  { id: 3, title: 'Anglų kalba', completed: false },
]

function App() {
  const [selectedDay, setSelectedDay] = useState('Pirmadienis')
  const [selectedCategory, setSelectedCategory] = useState('Tikslai')
  const [showLogin, setShowLogin] = useState(false)
  const [tasksByDay, setTasksByDay] = useState({ Pirmadienis: initialTasks })
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [isAddingTask, setIsAddingTask] = useState(false)
  const tasks = tasksByDay[selectedDay] ?? []
  const completedTasks = tasks.filter((task) => task.completed).length
  const taskProgress = tasks.length === 0
    ? 0
    : Math.round((completedTasks / tasks.length) * 100)

  function addTask(event) {
    event.preventDefault()

    const title = newTaskTitle.trim()
    if (!title) return

    setTasksByDay((currentTasksByDay) => ({
      ...currentTasksByDay,
      [selectedDay]: [
        ...(currentTasksByDay[selectedDay] ?? []),
        { id: Date.now(), title, completed: false },
      ],
    }))
    setNewTaskTitle('')
    setIsAddingTask(false)
  }

  function toggleTask(taskId) {
    setTasksByDay((currentTasksByDay) => ({
      ...currentTasksByDay,
      [selectedDay]: (currentTasksByDay[selectedDay] ?? []).map((task) => (
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )),
    }))
  }

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

          <button
            type="button"
            className="day-button new-task-button"
            onClick={() => setIsAddingTask((isOpen) => !isOpen)}
          >
            Nauja užduotis
          </button>

          {isAddingTask && (
            <form className="new-task-form" onSubmit={addTask}>
              <label htmlFor="new-task-title">Užduoties pavadinimas</label>
              <input
                id="new-task-title"
                type="text"
                placeholder="Sporto salė, Anglų kalba, AI mokymai"
                value={newTaskTitle}
                onChange={(event) => setNewTaskTitle(event.target.value)}
                autoFocus
              />
              <button type="submit" className="day-button">Pridėti</button>
            </form>
          )}

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

          <section className="day-task-list" aria-label={`${selectedDay} dienos užduotys`}>
            <h3>{selectedDay} užduotys</h3>
            {tasks.length > 0 ? (
              <ul className="task-list">
                {tasks.map((task) => (
                  <li key={task.id} className={task.completed ? 'task-completed' : ''}>
                    <label>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                      />
                      <span>{task.title}</span>
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Šiai dienai užduočių dar nėra.</p>
            )}
          </section>


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
        <ProgressBar progress={taskProgress} />
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
