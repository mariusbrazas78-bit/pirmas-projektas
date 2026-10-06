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

const initialTasks = [
  { id: 1, title: 'AI mokymai', completed: false },
  { id: 2, title: 'Pasivaikščiojimas', completed: false },
  { id: 3, title: 'Anglų kalba', completed: false },
]

const initialTasksByDay = Object.fromEntries(
  weekDays.map((day) => [
    day,
    initialTasks.map((task) => ({ ...task, id: `${day}-${task.id}` })),
  ]),
)

function App() {
  const [selectedDay, setSelectedDay] = useState('Pirmadienis')
  const [showLogin, setShowLogin] = useState(false)
  const [showPlanner, setShowPlanner] = useState(false)
  const [tasksByDay, setTasksByDay] = useState(initialTasksByDay)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [isAddingTask, setIsAddingTask] = useState(false)
  const tasks = tasksByDay[selectedDay] ?? []
  const completedTasks = tasks.filter((task) => task.completed).length
  const remainingTasks = tasks.length - completedTasks
  const nextTask = tasks.find((task) => !task.completed)
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

  if (showPlanner) {
    return (
      <main className="planner-page">
        <section className="planner-card" aria-labelledby="planner-title">
          <p className="planner-eyebrow">Mano dienotvarkė</p>
          <h1 id="planner-title">Išmanus dienos planuoklis</h1>
          <p className="planner-description">
            Suplanuok dieną pagal savo užduotis ir prioritetus
          </p>
          <div className="planner-placeholder" aria-label="Vieta būsimiems planuoklio elementams">
            <span className="planner-placeholder-mark" aria-hidden="true">✦</span>
            <h2>Planuoklio erdvė</h2>
            <p>Čia atsiras tavo dienos planavimo elementai.</p>
          </div>
          <button
            type="button"
            className="planner-back-button"
            onClick={() => setShowPlanner(false)}
          >
            Grįžti į dienotvarkę
          </button>
        </section>
      </main>
    )
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
            className="day-button planner-open-button"
            onClick={() => setShowPlanner(true)}
          >
            Išmanus planuoklis
          </button>

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
          <section className="my-day-panel" aria-labelledby="my-day-title">
            <h2 id="my-day-title">Mano diena</h2>

            <div className="my-day-section">
              <h3>Dienos tikslas</h3>
              <p>Atlikti visas {tasks.length} dienos užduotis</p>
              <p className="my-day-detail">{completedTasks} iš {tasks.length} atlikta</p>
            </div>

            <div className="my-day-section">
              <h3>Šiandienos progresas</h3>
              <div className="my-day-progress-copy">
                <span>{taskProgress}%</span>
                <span>{completedTasks}/{tasks.length} užduočių</span>
              </div>
              <div
                className="my-day-progress-track"
                role="progressbar"
                aria-label={`${selectedDay} progresas`}
                aria-valuenow={taskProgress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="my-day-progress-fill" style={{ width: `${taskProgress}%` }} />
              </div>
            </div>

            <div className="my-day-section">
              <h3>Artimiausia veikla</h3>
              <p>{nextTask ? nextTask.title : 'Visos dienos užduotys atliktos!'}</p>
            </div>

            <div className="my-day-section">
              <h3>Užduočių sąrašas</h3>
              {tasks.length > 0 ? (
                <ul className="task-list my-day-task-list">
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
            </div>
          </section>
        </div>
      </section>

      <div className="ticks"></div>

      <div id="progress">
        <div className="task-statistics" aria-label="Pasirinktos dienos užduočių statistika">
          <div className="task-stat-card">
            <span>Užduotys</span>
            <strong>{tasks.length}</strong>
          </div>
          <div className="task-stat-card">
            <span>Atliktos</span>
            <strong>{completedTasks}</strong>
          </div>
          <div className="task-stat-card">
            <span>Liko</span>
            <strong>{remainingTasks}</strong>
          </div>
        </div>
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
