import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import '../styles/form.css'
import { submitDonacion, getEscuelas } from '../services/api'

const mapCategoriaToDonationType = (proyecto) => {
  if (!proyecto) return ''
  const sub = (proyecto.subcategoria || '').toLowerCase()
  if (sub.includes('formación para familias') || sub.includes('formacion para familias')) return 'formacion-familias'
  if (sub.includes('formación para estudiantes') || sub.includes('formacion para estudiantes')) return 'formacion-estudiantes'
  if (sub.includes('formación para docentes') || sub.includes('formacion para docentes') || sub.includes('formación a docentes')) return 'formacion-docentes'
  if (sub.includes('psicol')) return 'psicologia'
  if (sub.includes('tecnol')) return 'material-tecnologico'
  if (sub.includes('papeler')) return 'material-papeleria'
  if (sub.includes('literari')) return 'material-literario'
  if (sub.includes('ed. física') || sub.includes('educación física')) return 'material-ed-fisica'
  if (sub.includes('mobiliario')) return 'mobiliario'
  if (sub.includes('infraestructura') || sub.includes('construcción')) return 'material-infraestructura'
  return ''
}

// ── Validation rules ────────────────────────────────────────────────────────
const VALIDATORS = {
  'full-name':           v => v.trim() ? '' : 'Ingresa tu nombre completo',
  'entity-type':         v => v        ? '' : 'Selecciona un tipo de instancia',
  'email':               v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Ingresa un correo electrónico válido',
  'phone':               v => v.trim() ? '' : 'Ingresa tu número de celular',
  'location':            v => v.trim() ? '' : 'Ingresa tu municipio y estado',
  'donation-type':       v => v        ? '' : 'Selecciona un tipo de donativo',
  'destination-school':  v => v.trim() ? '' : 'Indica la escuela destino',
  'training-topic':      v => v.trim() ? '' : 'Describe el tema de formación',
  'audience':            v => v        ? '' : 'Selecciona el público',
  'hours':               v => v.trim() ? '' : 'Indica el número de horas/sesiones',
  'item':                v => v.trim() ? '' : 'Describe el artículo a donar',
  'quantity':            v => Number(v) > 0 ? '' : 'Ingresa una cantidad válida',
  'logistics':           v => v        ? '' : 'Selecciona una opción de logística',
  'address':             v => v.trim() ? '' : 'Ingresa la dirección de recolección',
  'support-description': v => v.trim() ? '' : 'Describe el apoyo que deseas ofrecer',
  'privacy':             v => v        ? '' : 'Debes aceptar el aviso de privacidad para continuar',
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

function Form() {
  const location = useLocation()
  const navigate  = useNavigate()
  const proyectoContext = location.state?.proyecto || null

  const [entityType,        setEntityType]        = useState('')
  const [donationType,      setDonationType]      = useState(mapCategoriaToDonationType(proyectoContext))
  const [logistics,         setLogistics]         = useState('')
  const [destinationSchool, setDestinationSchool] = useState(proyectoContext?.escuela || '')
  const [escuelas,          setEscuelas]          = useState([])
  const [errors,            setErrors]            = useState({})
  const [touched,           setTouched]           = useState({})
  const [showPrivacy,       setShowPrivacy]       = useState(false)
  const [submitting,        setSubmitting]        = useState(false)
  const [submitError,       setSubmitError]       = useState(null)

  useEffect(() => {
    getEscuelas()
      .then(data => setEscuelas(data || []))
      .catch(() => {})
  }, [])

  const showInstanceGroup  = entityType !== '' && entityType !== 'ninguna'
  const showDetailsSection = donationType !== ''
  const isFormacion = ['formacion-familias', 'formacion-estudiantes', 'formacion-docentes'].includes(donationType)
  const isMaterial  = ['material-tecnologico', 'material-papeleria', 'material-literario', 'material-ed-fisica', 'material-infraestructura', 'mobiliario'].includes(donationType)
  const isOther     = !isFormacion && !isMaterial && donationType !== ''
  const showAddressGroup = logistics === 'recoleccion'

  // ── Field-level blur validation ─────────────────────────────────────────
  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target
    const val = type === 'checkbox' ? checked : value
    setTouched(prev => ({ ...prev, [name]: true }))
    const validate = VALIDATORS[name]
    if (validate) setErrors(prev => ({ ...prev, [name]: validate(val) }))
  }

  // ── Submit: validate all required visible fields ─────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const required = ['full-name', 'entity-type', 'email', 'phone', 'location', 'donation-type']
    if (showDetailsSection) required.push('destination-school')
    if (isFormacion)        required.push('training-topic', 'audience', 'hours')
    if (isMaterial)         required.push('item', 'quantity', 'logistics')
    if (showAddressGroup)   required.push('address')
    if (isOther)            required.push('support-description')
    required.push('privacy')

    const newErrors  = {}
    const newTouched = {}
    required.forEach(name => {
      newTouched[name] = true
      const val = name === 'privacy'
        ? e.target.querySelector('#privacy')?.checked
        : (formData.get(name) || '')
      const validate = VALIDATORS[name]
      if (validate) {
        const err = validate(val)
        if (err) newErrors[name] = err
      }
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

    // ── Map form values to DB enums ───────────────────────────────────────
    const TIPO_INSTANCIA_MAP = {
      empresa: 'empresa', osc: 'osc', educativa: 'institucion_educativa',
      gobierno: 'gobierno_municipal', ninguna: 'sin_instancia', otro: 'otro',
    }
    const TIPO_DONATIVO_MAP = {
      'formacion-familias':        'formacion_familias',
      'formacion-estudiantes':     'formacion_estudiantes',
      'formacion-docentes':        'formacion_docentes',
      'psicologia':                'atencion_psicologica',
      'material-tecnologico':      'material_tecnologico',
      'material-papeleria':        'material_papeleria',
      'material-literario':        'material_literario',
      'material-ed-fisica':        'material_educacion_fisica',
      'material-infraestructura':  'material_infraestructura',
      'mobiliario':                'mobiliario',
      'transporte':                'transporte',
      'camino':                    'condiciones_camino',
      'salud':                     'salud_fisica',
      'visitas':                   'visitas_extraescolares',
      'gestion':                   'apoyo_gestion',
      'otro':                      'otro',
    }
    const LOGISTICA_MAP = {
      'flete-escuela': 'entrega_escuela',
      'oficina':       'lleva_oficina',
      'recoleccion':   'requiere_recoleccion',
    }

    const rawLogistica   = formData.get('logistics') || ''
    const rawDonationType = formData.get('donation-type') || ''
    const rawEntityType  = formData.get('entity-type') || ''

    const aliadoPayload = {
      nombre_completo:    formData.get('full-name'),
      tipo_instancia:     TIPO_INSTANCIA_MAP[rawEntityType] || 'otro',
      nombre_instancia:   formData.get('instance-name') || null,
      correo_electronico: formData.get('email'),
      celular:            formData.get('phone'),
      municipio_estado:   formData.get('location'),
    }

    const donacionPayload = {
      tipo_donativo:        TIPO_DONATIVO_MAP[rawDonationType] || 'otro',
      tema_formacion:       formData.get('training-topic')   || null,
      publico_dirigido:     formData.get('audience')         || null,
      num_horas_sesiones:   parseInt(formData.get('hours'))  || null,
      articulo_donar:       formData.get('item')             || null,
      cantidad:             Number(formData.get('quantity'))  || null,
      logistica:            LOGISTICA_MAP[rawLogistica]      || null,
      direccion_recoleccion:formData.get('address')          || null,
      descripcion_apoyo:    formData.get('support-description') || null,
    }

    setSubmitting(true)
    setSubmitError(null)
    try {
      await submitDonacion({
        aliado: aliadoPayload,
        donacion: donacionPayload,
        necesidad_id: proyectoContext?.id ?? null,
        escuela_id: proyectoContext?.escuelaId ?? null,
      })

      navigate('/gracias', {
        state: {
          summary: {
            nombre: formData.get('full-name'),
            escuela: formData.get('destination-school') || proyectoContext?.escuela,
            tipo: rawDonationType,
          }
        }
      })
    } catch (err) {
      setSubmitError('Ocurrió un error al enviar tu solicitud. Por favor intenta de nuevo.')
      setSubmitting(false)
    }
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
          <h1 className="form-title">Sé parte del cambio</h1>
          <p className="form-subtitle">
            Completa el formulario y en menos de 48 horas nos pondremos en contacto contigo.
          </p>
        </section>

        {proyectoContext && (
          <div className="donation-context-banner">
            <div className="banner-inner">
              <i className="bi bi-bullseye banner-icon" aria-hidden="true" />
              <div>
                <strong>Donando para: {proyectoContext.propuesta}</strong>
                <p>{proyectoContext.escuela} — {proyectoContext.municipio}, Jalisco</p>
              </div>
            </div>
          </div>
        )}

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

            {/* ── 2. Tipo de donativo ── */}
            <div className="form-section">
              <h2 className="form-section-title">
                <span className="section-num">2</span>
                Tipo de donativo
              </h2>

              <div className="form-group">
                <label htmlFor="donation-type">
                  ¿Qué deseas donar? <span className="req-mark" aria-hidden="true">*</span>
                </label>
                <select
                  id="donation-type"
                  name="donation-type"
                  value={donationType}
                  onChange={e => setDonationType(e.target.value)}
                  className={fieldClass('donation-type')}
                  onBlur={handleBlur}
                  {...ariaProps('donation-type')}
                >
                  <option value="" disabled>Selecciona una opción</option>
                  <optgroup label="Formación">
                    <option value="formacion-familias">Formación para familias</option>
                    <option value="formacion-estudiantes">Formación para estudiantes</option>
                    <option value="formacion-docentes">Formación a docentes</option>
                  </optgroup>
                  <optgroup label="Apoyo especializado">
                    <option value="psicologia">Atención psicológica para estudiantes</option>
                  </optgroup>
                  <optgroup label="Material">
                    <option value="material-tecnologico">Material tecnológico</option>
                    <option value="material-papeleria">Material de papelería</option>
                    <option value="material-literario">Material literario</option>
                    <option value="material-ed-fisica">Material de educación física</option>
                    <option value="material-infraestructura">Material de infraestructura</option>
                    <option value="mobiliario">Mobiliario</option>
                  </optgroup>
                  <optgroup label="Otros apoyos">
                    <option value="transporte">Transporte</option>
                    <option value="camino">Condiciones del camino</option>
                    <option value="salud">Salud física</option>
                    <option value="visitas">Visitas extraescolares</option>
                    <option value="gestion">Apoyo en gestión</option>
                    <option value="otro">Otro</option>
                  </optgroup>
                </select>
                <FieldError name="donation-type" errors={errors} touched={touched} />
              </div>
            </div>

            {/* ── 3. Detalles del donativo ── */}
            {showDetailsSection && (
              <div className="form-section">
                <h2 className="form-section-title">
                  <span className="section-num">3</span>
                  Detalles del donativo
                </h2>

                <div className="form-group">
                  <label htmlFor="destination-school">
                    Escuela destino <span className="req-mark" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="destination-school"
                    name="destination-school"
                    value={destinationSchool}
                    onChange={e => setDestinationSchool(e.target.value)}
                    className={fieldClass('destination-school')}
                    onBlur={handleBlur}
                    {...ariaProps('destination-school')}
                  >
                    <option value="" disabled>Selecciona una escuela</option>
                    {escuelas.map(e => (
                      <option key={e.id} value={e.nombre}>{e.nombre}</option>
                    ))}
                  </select>
                  <FieldError name="destination-school" errors={errors} touched={touched} />
                </div>

                {isFormacion && (
                  <>
                    <div className="form-group">
                      <label htmlFor="training-topic">
                        Tema de formación <span className="req-mark" aria-hidden="true">*</span>
                      </label>
                      <input
                        type="text"
                        id="training-topic"
                        name="training-topic"
                        placeholder="Ej. Escritura, matemáticas..."
                        className={fieldClass('training-topic')}
                        onBlur={handleBlur}
                        {...ariaProps('training-topic')}
                      />
                      <FieldError name="training-topic" errors={errors} touched={touched} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="audience">
                        Público al que va dirigido <span className="req-mark" aria-hidden="true">*</span>
                      </label>
                      <select
                        id="audience"
                        name="audience"
                        className={fieldClass('audience')}
                        onBlur={handleBlur}
                        {...ariaProps('audience')}
                      >
                        <option value="" disabled>Selecciona</option>
                        <option value="estudiantes">Estudiantes</option>
                        <option value="docentes">Docentes</option>
                        <option value="familias">Familias</option>
                        <option value="todos">Todos</option>
                      </select>
                      <FieldError name="audience" errors={errors} touched={touched} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="hours">
                        Número de horas y/o sesiones <span className="req-mark" aria-hidden="true">*</span>
                      </label>
                      <input
                        type="text"
                        id="hours"
                        name="hours"
                        placeholder="Ej. 3 sesiones de 2 horas"
                        className={fieldClass('hours')}
                        onBlur={handleBlur}
                        {...ariaProps('hours')}
                      />
                      <FieldError name="hours" errors={errors} touched={touched} />
                    </div>
                  </>
                )}

                {isMaterial && (
                  <>
                    <div className="form-group">
                      <label htmlFor="item">
                        Artículo a donar <span className="req-mark" aria-hidden="true">*</span>
                      </label>
                      <input
                        type="text"
                        id="item"
                        name="item"
                        placeholder="Ej. Sillas escolares, libros, etc."
                        className={fieldClass('item')}
                        onBlur={handleBlur}
                        {...ariaProps('item')}
                      />
                      <FieldError name="item" errors={errors} touched={touched} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="quantity">
                        Cantidad de artículos <span className="req-mark" aria-hidden="true">*</span>
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        placeholder="Ej. 20"
                        min="1"
                        className={fieldClass('quantity')}
                        onBlur={handleBlur}
                        {...ariaProps('quantity')}
                      />
                      <FieldError name="quantity" errors={errors} touched={touched} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="logistics">
                        Logística de entrega <span className="req-mark" aria-hidden="true">*</span>
                      </label>
                      <select
                        id="logistics"
                        name="logistics"
                        value={logistics}
                        onChange={e => setLogistics(e.target.value)}
                        className={fieldClass('logistics')}
                        onBlur={handleBlur}
                        {...ariaProps('logistics')}
                      >
                        <option value="" disabled>Selecciona</option>
                        <option value="flete-escuela">Puedo llevar flete hasta la escuela</option>
                        <option value="oficina">Lo llevo a la oficina de MPJ</option>
                        <option value="recoleccion">Necesito que pasen por ello</option>
                      </select>
                      <FieldError name="logistics" errors={errors} touched={touched} />
                    </div>

                    {showAddressGroup && (
                      <div className="form-group">
                        <label htmlFor="address">
                          Dirección de recolección <span className="req-mark" aria-hidden="true">*</span>
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          placeholder="Calle, número, colonia, ciudad"
                          className={fieldClass('address')}
                          onBlur={handleBlur}
                          autoComplete="street-address"
                          {...ariaProps('address')}
                        />
                        <FieldError name="address" errors={errors} touched={touched} />
                      </div>
                    )}
                  </>
                )}

                {isOther && (
                  <div className="form-group">
                    <label htmlFor="support-description">
                      Descripción del apoyo <span className="req-mark" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="support-description"
                      name="support-description"
                      rows="4"
                      placeholder="Describe brevemente el apoyo que deseas ofrecer..."
                      className={fieldClass('support-description')}
                      onBlur={handleBlur}
                      {...ariaProps('support-description')}
                    />
                    <FieldError name="support-description" errors={errors} touched={touched} />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="attachment">
                    <i className="bi bi-paperclip me-1" aria-hidden="true" />
                    Documento o imagen adjunta
                    <span className="form-hint-inline"> (opcional)</span>
                  </label>
                  <input
                    type="file"
                    id="attachment"
                    name="attachment"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <span className="form-hint">Formatos permitidos: PDF, JPG, PNG · Máx. 5 MB</span>
                </div>
              </div>
            )}

            {/* ── 4. Aviso de privacidad ── */}
            <div className="form-section">
              <h2 className="form-section-title">
                <span className="section-num">{showDetailsSection ? '4' : '3'}</span>
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

            {submitError && (
              <div className="field-error" role="alert" style={{ marginBottom: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', background: '#fff0f0' }}>
                <i className="bi bi-exclamation-circle me-2" aria-hidden="true" />
                {submitError}
              </div>
            )}

            <div className="form-submit">
              <p className="form-required-note">
                <span className="req-mark">*</span> Campos obligatorios
              </p>
              <button type="submit" className="btn-send" disabled={submitting}>
                {submitting
                  ? <><i className="bi bi-arrow-repeat me-2" aria-hidden="true" />Enviando…</>
                  : <><i className="bi bi-send-fill me-2" aria-hidden="true" />Enviar mi apoyo</>
                }
              </button>
            </div>

          </form>
        </section>
      </main>

      <Footer />

      {/* ── Privacy modal ── */}
      {showPrivacy && (
        <div
          className="privacy-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          onClick={e => { if (e.target === e.currentTarget) setShowPrivacy(false) }}
          onKeyDown={e => { if (e.key === 'Escape') setShowPrivacy(false) }}
        >
          <div className="privacy-modal">
            <div className="privacy-modal-header">
              <h2 id="privacy-modal-title">
                <i className="bi bi-shield-check me-2" aria-hidden="true" />
                Aviso de Privacidad
              </h2>
              <button
                className="privacy-close"
                onClick={() => setShowPrivacy(false)}
                aria-label="Cerrar aviso de privacidad"
              >
                <i className="bi bi-x-lg" aria-hidden="true" />
              </button>
            </div>

            <div className="privacy-body">
              <p className="privacy-date">Fecha de última actualización: 10 de septiembre de 2023</p>

              <p>Para todo lo relacionado con el tratamiento de sus datos personales que usted haya divulgado o pudiera llegar a divulgarnos (en lo sucesivo referidos como <strong>"Datos Personales"</strong>), se considerará que el responsable es <strong>Mexicanos Primero Jalisco, A.C.</strong> (en lo sucesivo <strong>"MEXICANOS PRIMERO JALISCO"</strong>), asociación civil constituida de conformidad con las leyes de los Estados Unidos Mexicanos, con domicilio en Calle Prado de los Cedros número 1500, Colonia Ciudad del Sol, Zapopan, Jalisco, C.P. 45050.</p>

              <p>Para cualquier información respecto del presente Aviso de Privacidad o para el ejercicio de sus derechos de acceso, rectificación, cancelación y/u oposición, así como para limitar su tratamiento o revocar el consentimiento, por favor contacte a nuestro Departamento de Datos Personales al correo: <a href="mailto:contacto@mpj.org.mx" className="privacy-link">contacto@mpj.org.mx</a>.</p>

              <h3>¿Qué Datos Personales recabamos de usted?</h3>
              <p>Los Datos Personales que podremos solicitarle son: (i) nombre completo; (ii) edad; (iii) género; (iv) lugar y fecha de nacimiento; (v) domicilio; (vi) teléfono fijo y/o móvil; (vii) correo electrónico; (viii) ocupación; (ix) datos de contacto de algún familiar o conocido para casos de emergencia; (x) copia de su acta de nacimiento; (xi) copia de identificación oficial.</p>

              <h3>¿Cómo obtenemos sus Datos Personales?</h3>
              <p>MEXICANOS PRIMERO JALISCO podrá recabar sus Datos Personales directamente cuando usted voluntariamente así nos los proporcione, y/o a través de otros medios tales como vía telefónica y/o correo electrónico.</p>

              <h3>¿Para qué finalidades recabamos y utilizamos sus Datos Personales?</h3>
              <p>Sus Datos Personales serán utilizados para las siguientes finalidades <strong>necesarias</strong> para la relación jurídica con MEXICANOS PRIMERO JALISCO: (i) ponerse en contacto con usted y validar su información; (ii) reclutamiento y selección de voluntarios, servicio social y prácticas profesionales; (iii) asignación de grupos de trabajo; (iv) realización de estadísticas de investigación sobre temas educativos; (v) llevar a cabo investigaciones de la asociación; (vi) publicación de testimonios en imagen o video; (vii) atender quejas, preguntas o comentarios; (viii) crear bases de datos para fines administrativos y de control; y (ix) enviarle notificaciones de modificaciones a este Aviso de Privacidad.</p>
              <p>Adicionalmente, sus Datos Personales de contacto podrán ser utilizados para: (i) enviarle información acerca de MEXICANOS PRIMERO JALISCO; (ii) envío de información, revistas y noticias; (iii) llevar a cabo fines publicitarios; y (iv) realizar encuestas de nuestros servicios. Estas finalidades accesorias requieren su aceptación expresa.</p>

              <h3>¿Cómo protegemos sus Datos Personales?</h3>
              <p>Nos comprometemos a que sus Datos Personales serán tratados bajo las medidas de seguridad administrativas, físicas y técnicas establecidas por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, su Reglamento y demás disposiciones aplicables, con la finalidad de evitar su daño, pérdida, destrucción, robo, extravío, alteración y/o tratamiento no autorizado.</p>

              <h3>Sus derechos — Derechos "ARCO"</h3>
              <p>Como titular de sus Datos Personales, usted tiene el derecho de acceder, rectificar, cancelar u oponerse al tratamiento de los mismos. Para ejercer sus Derechos ARCO deberá proporcionar: (i) su nombre y domicilio; (ii) copia de su identificación oficial; (iii) descripción clara y precisa de los Datos Personales a los que desea acceder, rectificar, cancelar u oponerse. MEXICANOS PRIMERO JALISCO responderá en un plazo máximo de 20 días hábiles.</p>

              <h3>¿Cómo puede limitar el uso o divulgación de sus Datos Personales?</h3>
              <p>Si ya no desea recibir comunicaciones nuestras, por favor envíenos un correo electrónico a nuestro Departamento de Datos Personales, indicándonos dicha situación, para que se le inscriba en un listado de exclusión.</p>

              <h3>¿Cómo puede revocar su consentimiento?</h3>
              <p>Usted podrá revocar en cualquier momento el consentimiento para el tratamiento de sus Datos Personales, enviando un correo electrónico a <a href="mailto:contacto@mpj.org.mx" className="privacy-link">contacto@mpj.org.mx</a>. En caso de revocación, nos veremos imposibilitados para continuar nuestra relación jurídica.</p>

              <h3>Transferencia de sus Datos Personales</h3>
              <p>MEXICANOS PRIMERO JALISCO se reserva el derecho de compartir sus Datos Personales con autoridades administrativas, judiciales o gubernamentales cuando así lo establezca un mandato judicial o legal, así como con terceros subcontratados (abogados, auditores, contadores, encargados de sistemas) que procesen su información por cuenta de MEXICANOS PRIMERO JALISCO. No requerimos su consentimiento para estas transferencias.</p>

              <h3>Almacenamiento de sus Datos Personales</h3>
              <p>MEXICANOS PRIMERO JALISCO podrá conservar y resguardar sus Datos Personales en bases de datos ubicadas en los Estados Unidos Mexicanos o en el extranjero, durante los plazos que señale la legislación aplicable.</p>

              <h3>Modificaciones al Aviso de Privacidad</h3>
              <p>Nos reservamos el derecho de efectuar en cualquier momento modificaciones o actualizaciones al presente Aviso de Privacidad. En caso de modificaciones, se le notificará a través del correo electrónico proporcionado por usted y/o mediante aviso en nuestra página de Internet.</p>

              <p className="privacy-footer-note">Este Aviso de Privacidad se rige por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y la demás normativa aplicable de los Estados Unidos Mexicanos. Para mayor información sobre el Instituto Nacional de Transparencia, visite <a href="https://www.inai.org.mx" target="_blank" rel="noreferrer" className="privacy-link">www.inai.org.mx</a>.</p>
            </div>

            <div className="privacy-modal-footer">
              <button className="btn-privacy-close" onClick={() => setShowPrivacy(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Form
