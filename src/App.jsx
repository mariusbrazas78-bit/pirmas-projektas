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
const plannerCategories = ['Darbas', 'Mokslai', 'Sportas', 'Asmeniniai']
const plannerPriorities = ['Žemas', 'Vidutinis', 'Aukštas']
const priorityOrder = { Aukštas: 0, Vidutinis: 1, Žemas: 2 }

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
  const [plannerTasks, setPlannerTasks] = useState([])
  const [recommendedPlan, setRecommendedPlan] = useState(null)
  const [plannerForm, setPlannerForm] = useState({
    title: '',
    category: plannerCategories[0],
    priority: plannerPriorities[1],
    duration: '',
    deadline: '',
  })
  const [plannerError, setPlannerError] = useState('')
  const plannerCompletedCount = plannerTasks.filter((task) => task.completed).length
  const plannerRemainingTasks = plannerTasks.length - plannerCompletedCount
  const plannerProgress = plannerTasks.length === 0
    ? 0
    : Math.round((plannerCompletedCount / plannerTasks.length) * 100)
  const remainingDuration = plannerTasks
    .filter((task) => !task.completed)
    .reduce((total, task) => total + task.duration, 0)
  const remainingHours = Math.floor(remainingDuration / 60)
  const remainingMinutes = remainingDuration % 60
  const workload = remainingDuration <= 240
    ? 'Lengva'
    : remainingDuration <= 420
      ? 'Vidutinė'
      : 'Didelė'
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

  function handlePlannerFormChange(event) {
    const { name, value } = event.target
    setPlannerForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  function addPlannerTask(event) {
    event.preventDefault()

    if (!plannerForm.title.trim()) {
      setPlannerError('Įrašykite užduoties pavadinimą.')
      return
    }

    if (Number(plannerForm.duration) <= 0) {
      setPlannerError('Trukmė turi būti didesnė už 0 minučių.')
      return
    }

    setPlannerTasks((currentTasks) => [
      ...currentTasks,
      {
        ...plannerForm,
        id: Date.now(),
        title: plannerForm.title.trim(),
        duration: Number(plannerForm.duration),
        completed: false,
      },
    ])
    setPlannerForm({
      title: '',
      category: plannerCategories[0],
      priority: plannerPriorities[1],
      duration: '',
      deadline: '',
    })
    setPlannerError('')
  }

  function togglePlannerTask(taskId) {
    setPlannerTasks((currentTasks) => currentTasks.map((task) => (
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )))
  }

  function deletePlannerTask(taskId) {
    setPlannerTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  function createRecommendedPlan() {
    const plan = plannerTasks
      .filter((task) => !task.completed)
      .map((task, originalIndex) => ({ task, originalIndex }))
      .sort((first, second) => {
        const firstDeadline = first.task.deadline || '9999-12-31'
        const secondDeadline = second.task.deadline || '9999-12-31'

        if (firstDeadline !== secondDeadline) {
          return firstDeadline.localeCompare(secondDeadline)
        }

        const priorityDifference = priorityOrder[first.task.priority] - priorityOrder[second.task.priority]
        if (priorityDifference !== 0) return priorityDifference

        const durationDifference = first.task.duration - second.task.duration
        if (durationDifference !== 0) return durationDifference

        return first.originalIndex - second.originalIndex
      })
      .map(({ task }) => task)

    setRecommendedPlan(plan)
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
          <section className="planner-section planner-analysis" aria-labelledby="planner-analysis-title">
            <h2 id="planner-analysis-title">📊 Dienos analizė</h2>
            <div className="planner-analysis-stats">
              <p>Užduotys: <strong>{plannerTasks.length}</strong></p>
              <p>Atlikta: <strong>{plannerCompletedCount}</strong></p>
              <p>Liko: <strong>{plannerRemainingTasks}</strong></p>
              <p>Progresas: <strong>{plannerProgress} %</strong></p>
              <p>Likęs laikas: <strong>{remainingHours} val. {remainingMinutes} min.</strong></p>
              <p>Dienos apkrova: <strong>{workload}</strong></p>
            </div>
            <div
              className="planner-analysis-track"
              role="progressbar"
              aria-label="Dienos užduočių progresas"
              aria-valuenow={plannerProgress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div className="planner-analysis-fill" style={{ width: `${plannerProgress}%` }} />
            </div>
            {remainingDuration > 420 && (
              <p className="planner-workload-warning" role="status">
                Dienos planas gali būti per daug apkrautas.
              </p>
            )}
          </section>
          <section className="planner-section" aria-labelledby="new-planner-task-title">
            <h2 id="new-planner-task-title">Nauja užduotis</h2>
            <form className="planner-task-form" onSubmit={addPlannerTask}>
              <label className="planner-field planner-field-wide">
                Užduoties pavadinimas
                <input
                  name="title"
                  type="text"
                  value={plannerForm.title}
                  onChange={handlePlannerFormChange}
                  placeholder="Pvz., pasiruošti susitikimui"
                  aria-invalid={Boolean(plannerError && !plannerForm.title.trim())}
                />
              </label>

              <label className="planner-field">
                Kategorija
                <select name="category" value={plannerForm.category} onChange={handlePlannerFormChange}>
                  {plannerCategories.map((category) => <option key={category}>{category}</option>)}
                </select>
              </label>

              <label className="planner-field">
                Prioritetas
                <select name="priority" value={plannerForm.priority} onChange={handlePlannerFormChange}>
                  {plannerPriorities.map((priority) => <option key={priority}>{priority}</option>)}
                </select>
              </label>

              <label className="planner-field">
                Trukmė (minutėmis)
                <input
                  name="duration"
                  type="number"
                  min="1"
                  step="1"
                  value={plannerForm.duration}
                  onChange={handlePlannerFormChange}
                  aria-invalid={Boolean(plannerError && Number(plannerForm.duration) <= 0)}
                />
              </label>

              <label className="planner-field">
                Terminas
                <input
                  name="deadline"
                  type="date"
                  value={plannerForm.deadline}
                  onChange={handlePlannerFormChange}
                />
              </label>

              {plannerError && <p className="planner-form-error" role="alert">{plannerError}</p>}

              <button type="submit" className="planner-submit-button">+ Pridėti užduotį</button>
            </form>
          </section>

          <section className="planner-section" aria-labelledby="planner-tasks-title">
            <h2 id="planner-tasks-title">Mano užduotys</h2>
            {plannerTasks.length === 0 ? (
              <p className="planner-empty-state">Kol kas užduočių nėra. Pridėkite pirmą užduotį aukščiau.</p>
            ) : (
              <ul className="planner-task-list">
                {plannerTasks.map((task) => (
                  <li key={task.id} className={`planner-task-item${task.completed ? ' is-completed' : ''}`}>
                    <div className="planner-task-heading">
                      <label className="planner-task-check">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => togglePlannerTask(task.id)}
                        />
                        <span>{task.title}</span>
                      </label>
                      <button
                        type="button"
                        className="planner-delete-button"
                        onClick={() => deletePlannerTask(task.id)}
                        aria-label={`Ištrinti užduotį ${task.title}`}
                      >
                        Ištrinti
                      </button>
                    </div>
                    <div className="planner-task-details">
                      <span>{task.category}</span>
                      <span>Prioritetas: {task.priority}</span>
                      <span>{task.duration} min.</span>
                      <span>Terminas: {task.deadline || 'Nenurodytas'}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <button
            type="button"
            className="planner-submit-button planner-generate-button"
            onClick={createRecommendedPlan}
          >
            Sudaryti dienos planą
          </button>

          {recommendedPlan && (
            <section className="planner-section" aria-labelledby="recommended-plan-title">
              <h2 id="recommended-plan-title">📅 Rekomenduojamas dienos planas</h2>
              {recommendedPlan.length === 0 ? (
                <p className="planner-empty-state">Nėra neatliktų užduočių planui sudaryti.</p>
              ) : (
                <ol className="planner-task-list recommended-plan-list">
                  {recommendedPlan.map((task, index) => (
                    <li key={task.id} className="planner-task-item">
                      <div className="planner-task-heading">
                        <strong>{index + 1}. {task.title}</strong>
                        <span className="recommended-priority">{task.priority}</span>
                      </div>
                      <div className="planner-task-details">
                        <span>{task.duration} min.</span>
                        <span>Terminas: {task.deadline ? task.deadline.split('-').reverse().join('.') : 'Nenurodytas'}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          )}
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
