// Contenido en español del Night-One Kit (conmoción cerebral).
// Estado: PENDIENTE DE REVISIÓN CLÍNICA y de revisión por un hablante nativo.
// Traducido de content/en.ts. Licencia CC BY 4.0. Ver CONTENT-LICENSE.md.
import type { Content } from "./types";

const es: Content = {
  langCode: "es",
  switchLabel: "English",
  tagline: "Recuperación de una conmoción, paso a paso",
  dayCount: "Día {n} desde la lesión",
  dayZero: "Día de la lesión",

  er: {
    title: "Vaya a emergencias ahora si nota",
    intro: "Estas señales indican que el cerebro puede necesitar atención de emergencia. No espere a ver si pasan.",
    signs: [
      "Un dolor de cabeza que empeora y no se quita",
      "Vómitos más de una vez, o náuseas fuertes",
      "Habla arrastrada, debilidad, adormecimiento o falta de coordinación",
      "Mucho sueño o dificultad para despertarse",
      "Una convulsión (temblores o sacudidas)",
      "Una pupila (la parte negra del ojo) más grande que la otra",
      "Confusión, comportamiento extraño, inquietud, o no reconoce a personas o lugares",
      "Desmayo, aunque sea por un momento",
    ],
    call911: "Llame al 911 si hay una convulsión, un desmayo o si no puede despertarlo.",
  },

  plan: {
    title: "Su plan para los primeros días",
    intro: "El cerebro sana mejor con un descanso corto y luego un regreso lento a la vida normal. Avance al ritmo que permitan los síntomas.",
    doLabel: "Hacer",
    avoidLabel: "Evitar",
    phases: [
      {
        when: "Esta noche",
        doList: [
          "Déjelo dormir. Dormir ayuda a sanar el cerebro. No necesita despertarlo durante la noche, a menos que el médico se lo haya indicado.",
          "Mantenga la habitación tranquila y con poca luz.",
          "Revíselo antes de dormir y por la mañana. Tenga esta página a mano por si aparecen señales de peligro.",
          "Pregunte al médico o al farmacéutico qué medicina para el dolor puede tomar antes de darle alguna.",
        ],
        avoidList: [
          "Deportes, prácticas o juegos físicos",
          "Manejar",
          "Alcohol, o medicinas para dormir o para el dolor que el médico no haya aprobado",
        ],
      },
      {
        when: "Días 1 y 2",
        doList: [
          "Descanso, pero no oscuridad total. Actividades tranquilas y ligeras en casa están bien.",
          "Poco tiempo de pantalla, en bloques cortos y con pausas. Baje el brillo.",
          "Mantenga un horario de sueño normal.",
          "Haga el registro diario de abajo.",
        ],
        avoidList: [
          "Deportes, educación física, pesas o cualquier cosa con riesgo de otro golpe",
          "Mucho tiempo con pantallas, videojuegos o lugares ruidosos",
          "Manejar",
        ],
      },
      {
        when: "Día 3 en adelante",
        doList: [
          "Agregue actividad ligera, como una caminata corta y suave, siempre que los síntomas suban solo un poco (no más de 2 puntos de 10) y se calmen en menos de una hora.",
          "Vuelva poco a poco a la rutina normal cada día.",
          "Empiece los pasos para regresar a la escuela que están abajo.",
          "Haga la cita de seguimiento con el médico y cuéntele al entrenador o al entrenador atlético cómo va.",
        ],
        avoidList: [
          "Contacto o cualquier actividad con riesgo de golpearse la cabeza, hasta que un médico lo autorice",
          "Forzarse cuando los síntomas siguen empeorando",
        ],
      },
    ],
  },

  checkin: {
    title: "Registro diario",
    intro: "Un minuto al día. Califique cada síntoma de 0 (nada) a 6 (fuerte). Sus respuestas se quedan en este teléfono.",
    symptoms: [
      "Dolor de cabeza",
      "Mareo",
      "Náuseas",
      "Molestia con la luz",
      "Molestia con el ruido",
      "Dificultad para concentrarse",
      "Sentirse confundido o lento",
      "Irritable o sensible",
    ],
    scaleHint: "0 = nada, 6 = fuerte",
    sleep: "Horas que durmió anoche",
    school: "Escuela hoy",
    schoolOptions: ["Se quedó en casa", "Parte del día", "Día completo", "No hay escuela hoy"],
    mood: "Ánimo hoy",
    moodOptions: ["Excelente", "Bien", "Regular", "Bajo", "Muy mal"],
    dangerQuestion: "¿Hoy hubo alguna de las señales de peligro?",
    yes: "Sí",
    no: "No",
    save: "Guardar registro",
    needAll: "Califique todos los síntomas y responda la pregunta de señales de peligro para guardar.",
    saved: "Guardado. El puntaje de síntomas de hoy es {score} de {max}.",
    erNow: "Vaya a emergencias ahora o llame al 911. Una señal de peligro necesita un médico hoy. Luego avísele al entrenador o al entrenador atlético.",
    moodSupport: "Estar fuera del juego es difícil. Si está pasando por un mal momento, llame o envíe un mensaje al 988 en cualquier momento para hablar con alguien (hay ayuda en español). Cuéntele también a un padre, entrenador o consejero cómo se siente.",
    rising: "Los síntomas subieron desde la última vez. Tómelo con más calma hoy. Si siguen subiendo por 2 días o más, llame al médico.",
    historyTitle: "Historial de registros",
    noHistory: "Todavía no hay registros. El primero aparecerá aquí.",
    scoreLabel: "Puntaje",
    clear: "Borrar todos los registros de este teléfono",
  },

  share: {
    title: "Envíe una actualización al entrenador",
    intro: "Esto crea un mensaje corto que puede enviar. No se comparte nada a menos que usted lo envíe.",
    button: "Compartir actualización",
    copy: "Copiar actualización",
    copied: "Copiado. Péguelo en un mensaje de texto.",
    empty: "Haga primero un registro y luego podrá enviar una actualización.",
    header: "Actualización de Huddle Recovery",
    dangerFlag: "SE REPORTÓ UNA SEÑAL DE PELIGRO",
    footer: "Enviado desde los registros de la familia en Huddle Recovery.",
  },

  school: {
    title: "Regreso a la escuela",
    intro: "La escuela es parte de la recuperación. La mayoría de los estudiantes regresan en pocos días con algo de ayuda. Pase al siguiente paso cuando el actual no empeore mucho los síntomas.",
    stages: [
      { name: "En casa, actividad ligera", desc: "Lectura ligera, televisión y poco tiempo de pantalla que no empeoren los síntomas." },
      { name: "Tareas en casa", desc: "Tareas y lectura en bloques cortos con pausas." },
      { name: "Medio tiempo en la escuela", desc: "Días más cortos o pausas extra, con ayuda de los maestros." },
      { name: "Días completos en la escuela", desc: "Horario normal, poniéndose al día poco a poco con el trabajo atrasado." },
    ],
    noteTitle: "Nota para los maestros y la enfermera escolar",
    note:
      "Hola. Mi hijo o hija tuvo una conmoción cerebral el {date} y se está recuperando. Mientras sana, por favor permitan pausas para descansar, más tiempo para tareas y exámenes, menos tiempo de pantalla y un lugar tranquilo si aparecen síntomas. Por favor excúsenlo de educación física y deportes hasta que un médico lo autorice. Gracias por su ayuda.",
    copyNote: "Copiar nota",
    copied: "Copiado",
  },

  doctor: {
    title: "Cuándo llamar al médico (no es emergencia)",
    items: [
      "Los síntomas empeoran durante 2 días o más",
      "Los síntomas no mejoran después de una semana",
      "Los síntomas siguen después de 2 semanas",
      "Problemas con la escuela, el sueño o el ánimo que no mejoran",
      "Pregunte por un especialista en conmociones si los síntomas duran más de 4 semanas",
    ],
  },

  footer: {
    disclaimer: "Huddle Recovery apoya la atención de su médico. No la reemplaza. Solo el médico tratante puede autorizar el regreso a los deportes.",
    review: "Este contenido está pendiente de revisión por un entrenador atlético o fisioterapeuta con licencia, y por un hablante nativo de español.",
    openSource: "Gratis y de código abierto.",
  },

  coach: {
    title: "Envíe el Night-One Kit a una familia",
    intro: "Cree un enlace para una familia después de una lesión. Lo abren en su teléfono. Sin aplicación y sin cuenta.",
    dateLabel: "Fecha de la lesión",
    langLabel: "Idioma de la familia",
    make: "Crear enlace",
    linkLabel: "Enlace",
    messageLabel: "Mensaje de texto para enviar",
    message:
      "Hola, le escribe el entrenador. Aquí tiene una guía gratuita para la recuperación de esta noche y los próximos días: {link} Muestra las señales de peligro, un plan día a día y un registro diario de 1 minuto. Por favor envíeme una actualización cada día desde la página.",
    copyLink: "Copiar enlace",
    copyMessage: "Copiar mensaje",
    copied: "Copiado",
    privacy: "El enlace solo lleva la fecha de la lesión y el idioma. Nunca agregue el nombre del atleta ni datos de salud a un enlace.",
    preview: "Abrir la página de la familia",
  },
};

export default es;
