function PrivacyModal({ onClose }) {
  return (
    <div
      className="privacy-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      onKeyDown={e => { if (e.key === 'Escape') onClose() }}
    >
      <div className="privacy-modal">
        <div className="privacy-modal-header">
          <h2 id="privacy-modal-title">
            <i className="bi bi-shield-check me-2" aria-hidden="true" />
            Aviso de Privacidad
          </h2>
          <button
            className="privacy-close"
            onClick={onClose}
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
          <button className="btn-privacy-close" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default PrivacyModal
