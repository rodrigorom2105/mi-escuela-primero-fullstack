import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import PrivacyModal from '../components/PrivacyModal'
import '../styles/form.css'
import { getEscuelas } from '../services/api'

const VALIDATORS = {
  'full-name': v => v.trim() ? '' : 'Ingresa tu nombre completo',
  'entity-type': v => v ? '' : 'Selecciona un tipo de instancia',
  'email': v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Ingresa un correo electrónico válido',
  'phone': v => v.trim() ? '' : 'Ingresa tu número de celular',
  'location': v => v.trim() ? '' : 'Ingresa tu municipio y estado',
  'privacy': v => v ? '' : 'Debes aceptar el aviso de privacidad para continuar',
}

function FieldError({ name, errors, touched }) {
  if (!errors[name] || !touched[name]) return null
  return (
    <p className="field-error" role="alert" id={`${name}-error`}>
      <i className="bi bi-exclamation-circle me-1" aria-hidden="true" />
      {errors[name]}
    </p>
  )
}

function FormEconomica() {
  const navigate = useNavigate()

  const [entityType, setEntityType] = useState('')
  const [escuelas,   setEscuelas]   = useState([])
  const [errors,     setErrors]     = useState({})
  const [touched,    setTouched]    = useState({})
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [submitting,  setSubmitting]  = useState(false)

  useEffect(() => {
    getEscuelas()
      .then(data => setEscuelas(data || []))
      .catch(() => {})
  }, [])

  const showInstanceGroup = entityType !== '' && entityType !== 'ninguna'

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target
    const val = type === 'checkbox' ? checked : value
    setTouched(prev => ({ ...prev, [name]: true }))
    const validate = VALIDATORS[name]
    if (validate) setErrors(prev => ({ ...prev, [name]: validate(val) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const required = ['full-name', 'entity-type', 'email', 'phone', 'location', 'privacy']
    const newErrors = {}
    const newTouched = {}
    required.forEach(name => {
      newTouched[name] = true
      const val = name === 'privacy'
        ? e.target.querySelector('#privacy')?.checked
        : (formData.get(name) || '')
      const err = VALIDATORS[name](val)
      if (err) newErrors[name] = err
    })

    setTouched(prev => ({ ...prev, ...newTouched }))
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      const firstErrName = required.find(n => newErrors[n])
      const el = e.target.querySelector(`[name="${firstErrName}"]`)
      el?.focus()
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    // TODO: integrar con backend cuando esté disponible el endpoint de donaciones económicas.
    setSubmitting(true)
    navigate('/gracias', {
      state: {
        summary: {
          nombre: formData.get('full-name'),
          escuela: formData.get('destination-school') || null,
          tipo: 'Donación económica',
        }
      }
    })
  }

  const fieldClass = (name) =>
    errors[name] && touched[name] ? 'input-invalid' : ''

  const ariaProps = (name) =>
    errors[name] && touched[name]
      ? { 'aria-invalid': true, 'aria-describedby': `${name}-error` }
      : {}

  return (
    <>
      <Navbar />

      <main className="form-page">

        <section className="form-hero">
          <h1 className="form-title">Suma con tu aportación</h1>
          <p className="form-subtitle">
            Déjanos tus datos y nos pondremos en contacto contigo para concretar tu donación económica.
          </p>
        </section>

        <section className="form-container">
          <form className="form" onSubmit={handleSubmit} noValidate>

            {/* ── 1. Datos de contacto ── */}
            <div className="form-section">
              <h2 className="form-section-title">
                <span className="section-num">1</span>
                Tus datos de contacto
              </h2>

              <div className="form-group">
                <label htmlFor="full-name">
                  Nombre completo <span className="req-mark" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="full-name"
                  name="full-name"
                  placeholder="Ej. Diego Rodríguez Romero"
                  className={fieldClass('full-name')}
                  onBlur={handleBlur}
                  autoComplete="name"
                  {...ariaProps('full-name')}
                />
                <FieldError name="full-name" errors={errors} touched={touched} />
              </div>

              <div className="form-group">
                <label htmlFor="entity-type">
                  Tipo de instancia <span className="req-mark" aria-hidden="true">*</span>
                </label>
                <select
                  id="entity-type"
                  name="entity-type"
                  value={entityType}
                  onChange={e => setEntityType(e.target.value)}
                  className={fieldClass('entity-type')}
                  onBlur={handleBlur}
                  {...ariaProps('entity-type')}
                >
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="empresa">Empresa</option>
                  <option value="osc">Organización de la sociedad civil</option>
                  <option value="educativa">Institución educativa</option>
                  <option value="gobierno">Gobierno municipal</option>
                  <option value="ninguna">No represento una instancia</option>
                  <option value="otro">Otro</option>
                </select>
                <FieldError name="entity-type" errors={errors} touched={touched} />
              </div>

              {showInstanceGroup && (
                <div className="form-group">
                  <label htmlFor="instance-name">Nombre de la instancia</label>
                  <input
                    type="text"
                    id="instance-name"
                    name="instance-name"
                    placeholder="Ej. Empresa Tecnológica S.A."
                    autoComplete="organization"
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">
                  Correo electrónico <span className="req-mark" aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="ejemplo@correo.com"
                  className={fieldClass('email')}
                  onBlur={handleBlur}
                  autoComplete="email"
                  {...ariaProps('email')}
                />
                <FieldError name="email" errors={errors} touched={touched} />
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  Celular de contacto <span className="req-mark" aria-hidden="true">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="33 1234 5678"
                  className={fieldClass('phone')}
                  onBlur={handleBlur}
                  autoComplete="tel"
                  {...ariaProps('phone')}
                />
                <FieldError name="phone" errors={errors} touched={touched} />
              </div>

              <div className="form-group">
                <label htmlFor="location">
                  Municipio y estado <span className="req-mark" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Ej. Zapopan, Jalisco"
                  className={fieldClass('location')}
                  onBlur={handleBlur}
                  autoComplete="address-level2"
                  {...ariaProps('location')}
                />
                <FieldError name="location" errors={errors} touched={touched} />
              </div>
            </div>

            {/* ── 2. Sobre tu donación ── */}
            <div className="form-section">
              <h2 className="form-section-title">
                <span className="section-num">2</span>
                Sobre tu donación
              </h2>

              <div className="form-group">
                <label htmlFor="amount">
                  Monto aproximado
                  <span className="form-hint-inline"> (opcional)</span>
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Ej. 5000"
                  min="0"
                  step="any"
                />
                <span className="form-hint">En pesos mexicanos. Si aún no lo tienes definido, puedes dejarlo en blanco.</span>
              </div>

              <div className="form-group">
                <label htmlFor="frequency">
                  Frecuencia
                  <span className="form-hint-inline"> (opcional)</span>
                </label>
                <select id="frequency" name="frequency" defaultValue="">
                  <option value="">Por definir</option>
                  <option value="unica">Donación única</option>
                  <option value="mensual">Mensual</option>
                  <option value="trimestral">Trimestral</option>
                  <option value="anual">Anual</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="destination-school">
                  Escuela de interés
                  <span className="form-hint-inline"> (opcional)</span>
                </label>
                <select id="destination-school" name="destination-school" defaultValue="">
                  <option value="">Sin preferencia</option>
                  {escuelas.map(e => (
                    <option key={e.id} value={e.nombre}>{e.nombre}</option>
                  ))}
                </select>
                <span className="form-hint">Si tu donación está pensada para una escuela específica, indícala aquí.</span>
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  Mensaje o motivo
                  <span className="form-hint-inline"> (opcional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Cuéntanos por qué quieres apoyar o si tienes alguna petición especial."
                />
              </div>
            </div>

            {/* ── 3. Aviso de privacidad ── */}
            <div className="form-section">
              <h2 className="form-section-title">
                <span className="section-num">3</span>
                Aviso de privacidad
              </h2>
              <div className="form-group form-checkbox">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  className={errors['privacy'] && touched['privacy'] ? 'checkbox-invalid' : ''}
                  onBlur={handleBlur}
                  aria-describedby={errors['privacy'] && touched['privacy'] ? 'privacy-error' : undefined}
                />
                <label htmlFor="privacy">
                  He leído y acepto el{' '}
                  <button
                    type="button"
                    className="link-privacy"
                    onClick={() => setShowPrivacy(true)}
                  >
                    aviso de privacidad
                  </button>
                  {' '}de Mexicanos Primero Jalisco{' '}
                  <span className="req-mark" aria-hidden="true">*</span>
                </label>
              </div>
              {errors['privacy'] && touched['privacy'] && (
                <p className="field-error" role="alert" id="privacy-error">
                  <i className="bi bi-exclamation-circle me-1" aria-hidden="true" />
                  {errors['privacy']}
                </p>
              )}
            </div>

            <div className="form-submit">
              <p className="form-required-note">
                <span className="req-mark">*</span> Campos obligatorios
              </p>
              <button type="submit" className="btn-send" disabled={submitting}>
                {submitting
                  ? <><i className="bi bi-arrow-repeat me-2" aria-hidden="true" />Enviando…</>
                  : <><i className="bi bi-send-fill me-2" aria-hidden="true" />Enviar solicitud</>
                }
              </button>
            </div>

          </form>
        </section>
      </main>

      <Footer />

      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
    </>
  )
}

export default FormEconomica
