
import { Module } from './types';

export const CURRICULUM: Module[] = [
  {
    id: 'mod-imagen',
    title: '1. Diagnóstico por Imágenes (Dr. Cotrina)',
    lessons: [
      {
        id: 'img-maestria',
        title: 'Maestría Radiográfica',
        description: 'Las 10 claves del éxito diagnóstico por imagen.',
        icon: '📸',
        color: 'bg-indigo-700',
        questions: [
          { id: 'rad1', text: 'Según la Regla de Isometría de Cieszynski (Bisectriz), el rayo central debe incidir perpendicularmente a:', options: ['El eje largo del diente', 'El plano de la película', 'La bisectriz del ángulo formado por el diente y la película', 'El plano oclusal'], correctAnswerIndex: 2, explanation: 'La regla establece que para proyectar la longitud real, el rayo debe ser perpendicular a la línea imaginaria que divide el ángulo en dos (bisectriz).', type: 'multiple-choice' },
          { id: 'rad2', text: '¿Cuál es la causa principal del Escorzamiento (Foreshortening) en una radiografía?', options: ['Insuficiente angulación vertical', 'Excesiva angulación vertical', 'Angulación horizontal incorrecta', 'Película mal centrada'], correctAnswerIndex: 1, explanation: 'Una excesiva angulación vertical hace que el rayo incida con un ángulo demasiado pronunciado, acortando la imagen del diente.', type: 'multiple-choice' },
          { id: 'rad3', text: '¿Qué error de técnica produce la "Elongación" de la imagen radiográfica?', options: ['Excesiva angulación vertical', 'Insuficiente angulación vertical', 'Falta de paralelismo', 'Movimiento del paciente'], correctAnswerIndex: 1, explanation: 'Cuando el ángulo vertical es muy plano (insuficiente), la imagen resultante es más larga que el diente real.', type: 'multiple-choice' },
          { id: 'rad4', text: 'En la técnica de Clark (Regla MLOV), si un objeto se mueve en la MISMA dirección que el desplazamiento del cono, este se ubica por:', options: ['Vestibular / Bucal', 'Lingual / Palatino', 'Mesial', 'Distal'], correctAnswerIndex: 1, explanation: 'Mismo Lingual, Opuesto Vestibular (MLOV). Si el objeto sigue el movimiento del cono, está en lingual/palatino.', type: 'multiple-choice' },
          { id: 'rad5', text: '¿Cuál es el beneficio principal de la Técnica de Bramante sobre la de Clark?', options: ['Usa menos radiación', 'Permite identificar el cuadrante exacto de la raíz (MV, DV, MP, DP)', 'Es más rápida', 'No requiere 3 tomas'], correctAnswerIndex: 1, explanation: 'Bramante utiliza 3 radiografías para un mapeo exacto por cuadrantes, vital en endodoncia.', type: 'multiple-choice' },
          { id: 'rad6', text: 'La técnica Interproximal (Aleta de Mordida) es la elección primaria para el diagnóstico de:', options: ['Lesiones apicales', 'Caries interproximales incipientes y altura de cresta ósea', 'Fracturas radiculares verticales', 'Dientes incluidos'], correctAnswerIndex: 1, explanation: 'Su angulación de +5° a +10° permite evaluar con precisión la cresta alveolar y caries proximales.', type: 'multiple-choice' },
          { id: 'rad7', text: 'Radiográficamente, un Quiste Periapical se diferencia de un Granuloma principalmente por:', options: ['Estar asociado a un diente vital', 'Su tamaño (usualmente > 1 cm) y bordes corticalizados definidos', 'Presentar siempre dolor agudo', 'Ser una zona radiopaca'], correctAnswerIndex: 1, explanation: 'Aunque el diagnóstico es histopatológico, los quistes suelen ser mayores a 1 cm y con contorno radiopaco definido.', type: 'multiple-choice' },
          { id: 'rad8', text: '¿Qué característica distingue a la Osteítis Condensante del Hueso Esclerótico?', options: ['El hueso esclerótico está fusionado al ápice', 'La Osteítis está fusionada al ápice y asociada a necrosis pulpar', 'La Osteítis no tiene origen inflamatorio', 'Son lo mismo'], correctAnswerIndex: 1, explanation: 'La Osteítis Condensante es una reacción ósea ante una necrosis; el hueso esclerótico es idiopático y separado de la raíz.', type: 'multiple-choice' },
          { id: 'rad9', text: 'La anomalía de forma consistente en la unión de dos o más dientes únicamente a través del cemento es:', options: ['Fusión', 'Geminación', 'Concrescencia', 'Dilaceración'], correctAnswerIndex: 2, explanation: 'La concrescencia ocurre cuando los dientes se unen solo por cemento.', type: 'multiple-choice' },
          { id: 'rad10', text: 'La técnica de Le Master se utiliza en molares superiores para:', options: ['Localizar el cuarto conducto', 'Evitar la superposición de la apófisis cigomática (malar)', 'Medir la longitud real', 'Evaluar el seno maxilar'], correctAnswerIndex: 1, explanation: 'Usa una torunda de algodón para paralelizar la película y desplazar la sombra del malar.', type: 'multiple-choice' }
        ]
      }
    ]
  },
  {
    id: 'mod-anestesia',
    title: '2. Anestesia y Anatomía Clínica',
    lessons: [
      {
        id: 'anes-1',
        title: 'Técnicas de Bloqueo',
        description: 'Puntos gatillo y seguridad anestésica.',
        icon: '💉',
        color: 'bg-blue-600',
        questions: [
          { id: 'an1', text: '¿Cuál es el límite posterior del espacio pterigomandibular?', options: ['Músculo Masetero', 'Glándula Parótida', 'Músculo Pterigoideo Medial', 'Rama Mandibular'], correctAnswerIndex: 1, explanation: 'La glándula parótida limita este espacio; una inyección muy profunda puede causar parálisis facial.', type: 'multiple-choice' },
          { id: 'an2', text: '¿Qué componente del anestésico local causa reacciones alérgicas tipo I?', options: ['Epinefrina', 'Cloruro de Sodio', 'Metilparabeno', 'Agua destilada'], correctAnswerIndex: 2, explanation: 'Los parabenos (conservantes) son los principales alérgenos en cartuchos multidosis.', type: 'multiple-choice' },
          { id: 'an3', text: 'La técnica de Vazirani-Akinosi se indica cuando el paciente presenta:', options: ['Trismo severo', 'Infección en el área', 'Alergia a la lidocaína', 'Reflejo nauseoso'], correctAnswerIndex: 0, explanation: 'Es una técnica a boca cerrada ideal para pacientes con apertura limitada.', type: 'multiple-choice' }
        ]
      },
      {
        id: 'anes-anat',
        title: 'Osteología y Neuroanatomía',
        description: 'Estudio profundo de los huesos del cráneo y sus forámenes.',
        icon: '💀',
        color: 'bg-slate-700',
        questions: [
          {
            id: 'anat-q1',
            text: 'Un paciente presenta una parálisis de los músculos de la mímica facial tras un traumatismo en la región mastoidea. ¿Por qué orificio del hueso temporal emerge el nervio afectado?',
            options: ['Conducto auditivo interno', 'Agujero estilomastoideo', 'Fisura petrotimpánica', 'Agujero rasgado posterior'],
            correctAnswerIndex: 1,
            explanation: 'El nervio facial (VII par) emerge del cráneo por el agujero estilomastoideo, ubicado entre la apófisis estiloides y la mastoides.',
            type: 'multiple-choice'
          },
          {
            id: 'anat-q2',
            text: 'Durante un análisis cefalométrico de ortodoncia, el punto "Nasión" es fundamental para relacionar el cráneo con la cara. ¿En qué estructura específica del hueso frontal se localiza este punto?',
            options: ['En la glabela', 'En la espina nasal del frontal', 'En la intersección de la sutura frontonasal', 'En los arcos superciliares'],
            correctAnswerIndex: 2,
            explanation: 'El punto Nasión se ubica en la intersección de la sutura internasal con la sutura frontonasal.',
            type: 'multiple-choice'
          },
          {
            id: 'anat-q3',
            text: 'Al realizar una cirugía de elevación de seno maxilar, el odontólogo debe considerar que el drenaje natural del seno se realiza hacia el meato medio a través de una estructura del etmoides denominada:',
            options: ['Lámina perpendicular', 'Infundíbulo etmoidal', 'Celdillas etmoidales posteriores', 'Crista galli'],
            correctAnswerIndex: 1,
            explanation: 'El seno maxilar drena en el meato medio a través del hiato semilunar, al cual llega por el infundíbulo etmoidal.',
            type: 'multiple-choice'
          },
          {
            id: 'anat-q4',
            text: 'Un paciente refiere pérdida del sentido del olfato (anosmia) tras un traumatismo severo en el tercio medio facial. ¿Qué estructura ósea se ha fracturado probablemente, afectando los ramilletes nerviosos?',
            options: ['Lámina perpendicular del etmoides', 'Cornete superior', 'Lámina cribosa del etmoides', 'Ala menor del esfenoides'],
            correctAnswerIndex: 2,
            explanation: 'Los ramilletes del nervio olfatorio (I par) atraviesan los orificios de la lámina cribosa del etmoides.',
            type: 'multiple-choice'
          },
          {
            id: 'anat-q5',
            text: 'La fosa craneal media aloja al Ganglio de Gasser, origen real del nervio trigémino. ¿En qué zona específica del peñasco del temporal se encuentra la impresión donde descansa este ganglio?',
            options: ['Cara posterosuperior del peñasco', 'Vértice de la apófisis mastoides', 'Cara anterosuperior (Cavum de Meckel)', 'Borde superior del peñasco'],
            correctAnswerIndex: 2,
            explanation: 'El ganglio de Gasser se sitúa en la fosita trigeminal (impresión del trigémino) en la cara anterosuperior del peñasco, dentro del Cavum de Meckel.',
            type: 'multiple-choice'
          },
          {
            id: 'anat-q6',
            text: 'En una cirugía de terceros molares incluidos, el dolor referido hacia el oído suele explicarse por la inervación compartida. ¿Qué rama del trigémino sale por el agujero oval del esfenoides para dar sensibilidad a la zona mandibular?',
            options: ['Nervio Oftálmico (V1)', 'Nervio Maxilar (V2)', 'Nervio Mandibular (V3)', 'Nervio Cuerda del Tímpano'],
            correctAnswerIndex: 2,
            explanation: 'El nervio mandibular (V3) es la única rama del trigémino que sale por el agujero oval.',
            type: 'multiple-choice'
          },
          {
            id: 'anat-q7',
            text: 'Durante la exodoncia de un resto radicular en el sector posterosuperior, se produce una comunicación bucosinusal. El paciente refiere que al hablar su voz suena "diferente". Según la anatomía, ¿qué estructura modula la resonancia de la voz?',
            options: ['La lámina perpendicular del etmoides', 'Los cornetes etmoidales', 'La apófisis crista galli', 'El agujero ciego'],
            correctAnswerIndex: 1,
            explanation: 'Los senos paranasales y los cornetes actúan como cámaras de resonancia que modulan el timbre de la voz.',
            type: 'multiple-choice'
          },
          {
            id: 'anat-q8',
            text: 'Un jurado le pregunta: ¿Cuál es el punto craneométrico de unión entre las suturas coronal y sagital, vital para evaluar el crecimiento en odontopediatría?',
            options: ['Lambda', 'Pterión', 'Bregma', 'Asterión'],
            correctAnswerIndex: 2,
            explanation: 'Bregma es el punto de unión de la sutura coronal y sagital (donde estaba la fontanela anterior).',
            type: 'multiple-choice'
          },
          {
            id: 'anat-q9',
            text: 'El nervio hipogloso (XII), encargado de la motricidad de la lengua, abandona el cráneo a través de un conducto situado en:',
            options: ['Las masas laterales del occipital', 'La porción basilar del occipital', 'La apófisis pterigoides del esfenoides', 'El peñasco del temporal'],
            correctAnswerIndex: 0,
            explanation: 'El conducto del hipogloso (agujero condíleo anterior) atraviesa las masas laterales del hueso occipital.',
            type: 'multiple-choice'
          },
          {
            id: 'anat-q10',
            text: 'Al realizar una técnica anestésica al nervio alveolar superior posterior, el odontólogo debe evitar impactar la aguja en una estructura del esfenoides que sirve de inserción al músculo pterigoideo externo:',
            options: ['Ala menor del esfenoides', 'Cara externa de la lámina lateral de la apófisis pterigoides', 'Cara interna de la lámina medial de la apófisis pterigoides', 'Gancho de la pterigoides'],
            correctAnswerIndex: 1,
            explanation: 'El músculo pterigoideo externo se inserta en la cara externa de la lámina lateral de la apófisis pterigoides.',
            type: 'multiple-choice'
          },
          {
            id: 'anat-q11',
            text: 'Un paciente presenta un cuadro de neuralgia del trigémino en la zona de la mejilla y el ala de la nariz. El nervio involucrado (V2) sale del cráneo por el:',
            options: ['Agujero oval', 'Agujero redondo (mayor)', 'Agujero espinoso (menor)', 'Fisura orbitaria superior'],
            correctAnswerIndex: 1,
            explanation: 'El nervio maxilar (V2) sale de la fosa craneal media a través del agujero redondo (foramen rotundum).',
            type: 'multiple-choice'
          },
          {
            id: 'anat-q12',
            text: '¿Cuál es la importancia clínica de las eminencias parietales en el examen físico odontológico?',
            options: ['Determinan el punto de inserción del músculo masetero', 'Se utilizan para medir el diámetro transversal máximo del cráneo', 'Son el límite de la fosa pterigomaxilar', 'Indican la posición del agujero infraorbitario'],
            correctAnswerIndex: 1,
            explanation: 'Las eminencias parietales son las zonas de mayor convexidad y marcan el diámetro bivarietal o transversal máximo.',
            type: 'multiple-choice'
          },
          {
            id: 'anat-q13',
            text: 'La ATM (Articulación Temporomandibular) se establece entre el cóndilo mandibular y una estructura del hueso temporal denominada:',
            options: ['Cavidad glenoidea y cóndilo del temporal', 'Apófisis mastoides', 'Conducto auditivo externo', 'Apófisis estiloides'],
            correctAnswerIndex: 0,
            explanation: 'La ATM es una articulación bicondílea entre el cóndilo de la mandíbula y la fosa mandibular (cavidad glenoidea) y el tubérculo articular (cóndilo) del temporal.',
            type: 'multiple-choice'
          },
          {
            id: 'anat-q14',
            text: 'En una disección o traumatismo de la base del cráneo, la afectación de la apófisis yugular del occipital comprometería principalmente a:',
            options: ['La arteria carótida interna', 'La vena yugular interna', 'El nervio óptico', 'El nervio olfatorio'],
            correctAnswerIndex: 1,
            explanation: 'La apófisis yugular del occipital forma parte del agujero rasgado posterior (foramen yugular), por donde pasa la vena yugular interna.',
            type: 'multiple-choice'
          },
          {
            id: 'anat-q15',
            text: 'El "Pterión" es un punto crítico en traumatología maxilofacial por la proximidad de la arteria meníngea media. ¿Qué huesos conforman este punto?',
            options: ['Frontal, Parietal, Esfenoides y Temporal', 'Frontal, Nasal, Unguis y Maxilar', 'Occipital, Parietal y Temporal', 'Esfenoides, Etmoides y Vómer'],
            correctAnswerIndex: 0,
            explanation: 'El pterión es la unión en forma de H de los huesos frontal, parietal, ala mayor del esfenoides y la porción escamosa del temporal.',
            type: 'multiple-choice'
          },
          {
            id: 'anat-q16',
            text: 'Si un paciente presenta una infección originada en un diente superior que se extiende hacia la órbita, ¿por qué estructura del frontal pasan los vasos y nervios supraorbitarios?',
            options: ['Escotadura etmoidal', 'Agujero ciego', 'Escotadura o agujero supraorbitario', 'Fosita trolear'],
            correctAnswerIndex: 2,
            explanation: 'El borde supraorbitario del frontal presenta el agujero o escotadura supraorbitaria para el paso de vasos y nervios homónimos.',
            type: 'multiple-choice'
          },
          {
            id: 'anat-q17',
            text: 'El "Sifón Carotídeo" tiene estrecha relación con el hueso esfenoides. ¿Por dónde ingresa la arteria carótida interna al peñasco del temporal?',
            options: ['Conducto carotídeo', 'Agujero rasgado anterior', 'Agujero espinoso', 'Conducto auditivo interno'],
            correctAnswerIndex: 0,
            explanation: 'La carótida interna ingresa a la base del cráneo a través del conducto carotídeo en el peñasco del temporal.',
            type: 'multiple-choice'
          },
          {
            id: 'anat-q18',
            text: 'En anatomía de superficie, para localizar los ganglios occipitales durante una exploración de cuello, debemos palpar:',
            options: ['La apófisis estiloides', 'La línea nucal superior del occipital', 'El ángulo de la mandíbula', 'La escotadura mastoidea'],
            correctAnswerIndex: 1,
            explanation: 'Los ganglios occipitales se encuentran cerca de la inserción del trapecio en la línea nucal superior.',
            type: 'multiple-choice'
          },
          {
            id: 'anat-q19',
            text: '¿Qué estructura ósea separa la fosa craneal anterior de las fosas nasales y es sitio de inserción de la hoz del cerebro?',
            options: ['Lámina perpendicular del etmoides', 'Apófisis crista galli', 'Silla turca', 'Espina nasal del frontal'],
            correctAnswerIndex: 1,
            explanation: 'La apófisis crista galli del etmoides sobresale en la fosa craneal anterior y presta inserción a la hoz del cerebro.',
            type: 'multiple-choice'
          },
          {
            id: 'anat-q20',
            text: 'En un paciente con sinusitis etmoidal que refiere dolor referido a los dientes, se debe a la estrecha relación de las celdillas etmoidales con el nervio:',
            options: ['Maxilar (V2)', 'Facial (VII)', 'Hipogloso (XII)', 'Glosofaríngeo (IX)'],
            correctAnswerIndex: 0,
            explanation: 'El nervio maxilar (V2) y sus ramas alveolares superiores están en íntima relación con los senos maxilares y etmoidales.',
            type: 'multiple-choice'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-farma',
    title: '3. Farmacología y Seguridad',
    lessons: [
      {
        id: 'farma-1',
        title: 'Terapéutica Dental',
        description: 'Antibióticos, analgésicos e interacciones.',
        icon: '💊',
        color: 'bg-red-600',
        questions: [
          { id: 'f1', text: 'Dosis profiláctica de Amoxicilina para prevención de Endocarditis Bacteriana:', options: ['500 mg 1h antes', '1g 1h antes', '2g 1h antes', '2g 24h antes'], correctAnswerIndex: 2, explanation: 'Según la AHA, la dosis es de 2 gramos una hora antes del procedimiento.', type: 'multiple-choice' },
          { id: 'f2', text: 'Paciente hipertenso con Enalapril. ¿Qué AINE evitar por riesgo de daño renal?', options: ['Paracetamol', 'Ibuprofeno', 'Aspirina', 'Cualquier AINE de uso prolongado'], correctAnswerIndex: 3, explanation: 'La combinación IECA + AINE + Diurético es altamente nefrotóxica.', type: 'multiple-choice' }
        ]
      }
    ]
  },
  {
    id: 'mod-materiales',
    title: '4. Biomateriales',
    lessons: [
      {
        id: 'mat-1',
        title: 'Propiedades y Mezclas',
        description: 'Alginatos, siliconas y resinas.',
        icon: '🏗️',
        color: 'bg-amber-500',
        questions: [
          { id: 'm1', text: '¿Qué tipo de reacción de fraguado tiene el Alginato?', options: ['Física', 'Química irreversible (Gelación)', 'Polimerización', 'Evaporación'], correctAnswerIndex: 1, explanation: 'Es una reacción química entre el alginato de potasio y el sulfato de calcio.', type: 'multiple-choice' },
          { id: 'm2', text: 'Subproducto de la silicona por condensación que causa contracción:', options: ['Agua', 'Alcohol etílico', 'Hidrógeno', 'Oxígeno'], correctAnswerIndex: 1, explanation: 'La liberación de alcohol causa la inestabilidad dimensional característica.', type: 'multiple-choice' }
        ]
      }
    ]
  },
  {
    id: 'mod-operatoria',
    title: '5. Operatoria Dental',
    lessons: [
      {
        id: 'op-1',
        title: 'Clínica Restauradora',
        description: 'Caries y protocolos de adhesión.',
        icon: '🦷',
        color: 'bg-green-600',
        questions: [
          { id: 'o1', text: 'Según ICDAS, una microcavidad con ruptura del esmalte es código:', options: ['1', '2', '3', '4'], correctAnswerIndex: 2, explanation: 'ICDAS 3 es ruptura localizada del esmalte sin dentina visible.', type: 'multiple-choice' },
          { id: 'o2', text: 'Función del "Primer" en un sistema adhesivo:', options: ['Grabar esmalte', 'Hacer la dentina hidrofóbica', 'Sellar túbulos', 'Limpiar barro dentinario'], correctAnswerIndex: 1, explanation: 'Prepara la colágena hidrofílica para recibir la resina hidrofóbica.', type: 'multiple-choice' }
        ]
      }
    ]
  },
  {
    id: 'mod-casos',
    title: '6. Casos Clínicos Transversales',
    lessons: [
      {
        id: 'casos-final',
        title: 'Simulacro de Examen de Grado',
        description: 'Casos integrados de alta complejidad.',
        icon: '🎓',
        color: 'bg-black',
        questions: [
          { id: 'c1', text: 'Paciente hipertenso requiere exodoncia de 3.8. En la RX se observa lesión distal compatible con "joroba" del Dr. Cotrina. ¿Diagnóstico y precaución?', options: ['Quiste Dentígero - No usar anestesia', 'Quiste Paradentario - Controlar PA y usar vasoconstrictor con cautela', 'Odontoma - Antibiótico profiláctico', 'Ameloblastoma - Exodoncia inmediata'], correctAnswerIndex: 1, explanation: 'Mezcla Radiología (Quiste Paradentario) y Farmacología (Manejo de Hipertensión).', type: 'multiple-choice' },
          { id: 'c2', text: 'Durante una endodoncia, localiza una perforación en el cuadrante Disto-Vestibular mediante 3 tomas. ¿Qué técnica utilizó?', options: ['Clark', 'Paralelismo', 'Bramante', 'Le Master'], correctAnswerIndex: 2, explanation: 'Bramante es la técnica para localizar cuadrantes específicos de la raíz (MV, DV, MP, DP).', type: 'multiple-choice' },
          { id: 'c3', text: 'Paciente con riesgo de Endocarditis requiere tallado para corona. Sufre trismo por inyección previa. ¿Conducta?', options: ['2g Amoxicilina + Técnica de Akinosi', '500mg Amoxicilina + Técnica de Spix', 'No medicar + Técnica de Clark', '1g Amoxicilina + Técnica de infiltración'], correctAnswerIndex: 0, explanation: 'Integra Profilaxis (Farma) y Técnica de Anestesia para trismo (Akinosi).', type: 'multiple-choice' },
          { id: 'c4', text: 'RX muestra imagen radiolúcida > 1cm en ápice de 2.1 no vital, con borde corticalizado. ¿Tratamiento inicial?', options: ['Exodoncia', 'Conducto + Seguimiento radiográfico', 'Antibiótico solo', 'Curetaje inmediato'], correctAnswerIndex: 1, explanation: 'Integra Diagnóstico Radiográfico (Quiste) y Operatoria/Endodoncia.', type: 'multiple-choice' },
          { id: 'c5', text: 'Paciente con dolor en 4.6. RX muestra masa opaca fusionada al ápice y necrosis pulpar. ¿Qué es?', options: ['Hueso Esclerótico', 'Osteítis Condensante', 'Odontoma', 'Cementoblastoma'], correctAnswerIndex: 1, explanation: 'Diferencial clave de Radiología del Dr. Cotrina: Fusión al ápice + Necrosis = Osteítis Condensante.', type: 'multiple-choice' },
          { id: 'c6', text: 'Se sospecha de conducto palatino extra. Al mover el cono a distal, el conducto se mueve a mesial. ¿Dónde está?', options: ['Palatino', 'Vestibular', 'Mesial', 'Lingual'], correctAnswerIndex: 1, explanation: 'Regla MLOV: Movimiento opuesto (Meso -> Disto / Objeto -> Mesial) significa Vestibular.', type: 'multiple-choice' },
          { id: 'c7', text: 'Paciente alérgico a la Penicilina requiere cirugía. ¿Alternativa profiláctica?', options: ['Eritromicina', 'Clindamicina 600mg', 'Amoxicilina 2g', 'Ibuprofeno 800mg'], correctAnswerIndex: 1, explanation: 'La clindamicina es la alternativa clásica en alergias a betalactámicos.', type: 'multiple-choice' },
          { id: 'c8', text: 'En una RX de molares superiores, la sombra del malar impide ver los ápices. ¿Qué técnica aplica?', options: ['Bite-wing', 'Le Master', 'Clark', 'Akinosi'], correctAnswerIndex: 1, explanation: 'Le Master es la técnica específica para despejar la vista del malar.', type: 'multiple-choice' },
          { id: 'c9', text: 'RX muestra pieza 1.3 incluida y un "halo radiolúcido" rodeando su corona. ¿Diagnóstico probable?', options: ['Quiste Dentígero', 'Quiste Periapical', 'Granuloma', 'Osteítis'], correctAnswerIndex: 0, explanation: 'RX Dr. Cotrina:radiolucidez rodeando corona de diente retenido = Quiste Dentígero.', type: 'multiple-choice' },
          { id: 'c10', text: 'Paciente hipertenso controlado toma Aspirina. Requiere restauración clase II profunda (ICDAS 5). ¿Riesgo?', options: ['Fallo renal', 'Hemorragia post-operatoria si se hace cirugía', 'Reacción alérgica', 'No hay riesgo'], correctAnswerIndex: 1, explanation: 'La aspirina es antiagregante plaquetario; importante en procedimientos invasivos.', type: 'multiple-choice' }
        ]
      }
    ]
  }
];
