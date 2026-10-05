import './ProgressBar.css'

function ProgressBar({ progress, loading = false, error = false }) {
  if (loading) {
    return (
      <section className="progress-section">
        <div className="state-box">
          <span className="loader"></span>
          <p>Kraunamas projekto progresas...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="progress-section">
        <div className="state-box error-state">
          <h2>Nepavyko įkelti progreso</h2>
          <p>Įvyko klaida. Bandykite dar kartą.</p>
        </div>
      </section>
    )
  }

  if (progress === null || progress === undefined) {
    return (
      <section className="progress-section">
        <div className="state-box empty-state">
          <h2>Projekto progresas</h2>
          <p>Progreso duomenų dar nėra.</p>
        </div>
      </section>
    )
  }

  const safeProgress = Math.min(100, Math.max(0, progress))

  return (
    <section className="progress-section">
      <div className="progress-header">
        <h2 className="progress-title">Projekto progresas</h2>
        <span className="progress-percentage">{safeProgress}%</span>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={safeProgress}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Projekto progresas"
      >
        <div
          className="progress-fill"
          style={{ width: `${safeProgress}%` }}
        ></div>
      </div>
    </section>
  )
}

export default ProgressBar