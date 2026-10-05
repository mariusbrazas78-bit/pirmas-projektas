import { useState } from 'react'
import './LoginForm.css'

function LoginForm({ onBack }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    alert(`Prisijungimo forma pateikta: ${email}`)
  }

  return (
    <main className="login-section">
      <div className="login-card">
        <button type="button" className="login-back" onClick={onBack}>
          ← Grįžti į dienotvarkę
        </button>
        <h2>Prisijungimas</h2>

        <p className="login-description">
          Įveskite savo el. paštą ir slaptažodį.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">El. paštas</label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              autoFocus
              placeholder="vardas@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Slaptažodis</label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Įveskite slaptažodį"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Prisijungti
          </button>
        </form>
      </div>
    </main>
  )
}

export default LoginForm
