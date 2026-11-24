/** Glossary and "about" page content (es). Same shape in every language: see pages.test.js. */
export const es = {
  glossary: {
    navLabel: "Glosario",
    title: "Glosario de peso y balance: datum, brazo, momento, CG, MTOW | CheckCG",
    description:
      "Glosario de peso y balance para pilotos: datum, brazo, momento, centro de gravedad, envolvente, peso vacío, carga útil, MTOW, MLW, MZFW y %MAC, explicados en simple.",
    h1: "Glosario de peso y balance",
    intro:
      "Los términos que aparecen en el manual de vuelo, en la hoja de peso y balance y en la calculadora, explicados en una o dos frases. También se usan como carga y centrado o masa y centrado.",
    guideLink: "Guía relacionada:",
    terms: {
      datum: {
        term: "Datum (línea de referencia)",
        text: "Plano vertical imaginario, elegido por el fabricante, desde el que se miden todas las distancias horizontales del avión. Puede estar en el cortafuego, en la nariz o incluso por delante de ella; lo define el manual de vuelo.",
      },
      arm: {
        term: "Brazo",
        text: "Distancia horizontal entre el datum y un peso (un asiento, un tanque, el compartimento de equipaje). Se mide en pulgadas o milímetros y es positiva hacia atrás del datum.",
      },
      moment: {
        term: "Momento",
        text: 'Peso multiplicado por su brazo (lb·in o kg·mm). Mide cuánto "empuja" una carga para rotar el avión alrededor del datum. Algunos manuales lo dan dividido por 1000 para trabajar con números más chicos.',
      },
      cg: {
        term: "Centro de gravedad (CG)",
        text: "Punto donde se puede considerar concentrado todo el peso del avión. Se calcula como el momento total dividido por el peso total y se expresa como un brazo desde el datum.",
      },
      envelope: {
        term: "Envolvente de CG",
        text: "Zona del gráfico peso/CG dentro de la cual el avión fue certificado. Tiene un límite delantero, uno trasero y un peso máximo; el punto de la carga debe quedar adentro al despegue y al aterrizaje.",
      },
      station: {
        term: "Estación de carga",
        text: "Cada lugar donde se puede poner peso y que tiene un brazo definido: asientos delanteros y traseros, compartimentos de equipaje, tanques de combustible.",
      },
      "empty-weight": {
        term: "Peso vacío básico (BEW)",
        text: "Peso del avión con su equipamiento instalado, combustible no utilizable y aceite completo, sin ocupantes, equipaje ni combustible utilizable. Es propio de cada matrícula y figura, con su brazo o momento, en el último informe de pesada.",
      },
      "useful-load": {
        term: "Carga útil",
        text: "Diferencia entre el peso máximo y el peso vacío básico: lo que se puede repartir entre ocupantes, equipaje y combustible utilizable.",
      },
      mtow: {
        term: "Peso máximo de despegue (MTOW)",
        text: "Peso máximo con el que el avión puede iniciar la carrera de despegue. Es un límite estructural y de performance fijado en la certificación.",
      },
      "ramp-weight": {
        term: "Peso máximo de rampa",
        text: "Peso máximo permitido en tierra, antes del rodaje. Es algo mayor que el MTOW porque contempla el combustible que se quema en la puesta en marcha, el rodaje y la prueba de motor.",
      },
      mlw: {
        term: "Peso máximo de aterrizaje (MLW)",
        text: "Peso máximo con el que se puede aterrizar. En muchos aviones livianos coincide con el MTOW; en los más grandes es menor y obliga a quemar combustible antes de aterrizar.",
      },
      mzfw: {
        term: "Peso máximo sin combustible (MZFW)",
        text: "Peso máximo del avión cargado pero sin combustible utilizable. Todo el peso por encima de ese valor tiene que ser combustible; protege la estructura del ala.",
      },
      "usable-fuel": {
        term: "Combustible utilizable",
        text: "Combustible que el motor realmente puede consumir en vuelo. El no utilizable queda en tanques y cañerías y ya está incluido en el peso vacío. Se carga en peso: unas 6 lb por galón de AVGAS y unas 6,7 lb por galón de Jet A.",
      },
      mac: {
        term: "Cuerda aerodinámica media (%MAC)",
        text: "Otra forma de expresar el CG: como porcentaje de la cuerda aerodinámica media del ala en lugar de un brazo desde el datum. Es habitual en turbohélices y jets.",
      },
      tcds: {
        term: "Hoja de datos del certificado tipo (TCDS)",
        text: "Documento de la autoridad (FAA, EASA) que resume los límites aprobados de un modelo: pesos máximos, límites de CG, datum y brazos de las estaciones.",
      },
      poh: {
        term: "Manual de vuelo (POH/AFM)",
        text: "Manual aprobado del avión. Su sección de peso y balance, junto con el informe de pesada de la matrícula, es la referencia oficial para cualquier cálculo.",
      },
    },
  },
  about: {
    navLabel: "Metodología y fuentes",
    title: "Metodología y fuentes de datos de CheckCG: cómo se calcula y se verifica",
    description:
      "De dónde salen los datos de cada aeronave, cómo se verifican los cálculos de peso y balance, qué límites tiene la herramienta y quién la mantiene.",
    h1: "Metodología y fuentes de datos",
    intro:
      "CheckCG es una calculadora de peso y balance gratuita y de código abierto. En esta página se explica de dónde salen los datos, cómo se comprueban los cálculos y hasta dónde llega la herramienta.",
    sections: {
      data: {
        title: "De dónde salen los datos",
        text: "Los pesos máximos, límites de CG, brazos y envolventes de cada modelo se cargan desde la hoja de datos del certificado tipo (TCDS) y el manual de vuelo (POH/AFM). Cada página de aeronave lista sus documentos de origen, la fecha de la última verificación y lo que todavía falta confirmar.",
      },
      reliability: {
        title: "Nivel de confiabilidad de cada aeronave",
        text: "Cada modelo tiene un nivel declarado: verificado contra la documentación oficial, parcialmente verificado o valores de referencia estimados. Así está hoy el catálogo:",
      },
      method: {
        title: "Cómo se calcula y se verifica",
        text: "El cálculo es el del manual: se suman pesos y momentos de cada estación, el CG es el momento total dividido por el peso total y el punto resultante se compara con el polígono de la envolvente al despegue, al aterrizaje y sin combustible. El código está cubierto por pruebas automáticas, incluido el ejemplo resuelto de las guías, que se recalcula en cada cambio.",
      },
      limits: {
        title: "Qué no es",
        text: "Es una ayuda, no un documento aprobado. El peso vacío y su brazo cambian con cada matrícula y con cada modificación: hay que cargarlos desde el informe de pesada vigente. El manual de vuelo y ese informe son siempre la referencia oficial, y el piloto al mando es responsable de verificar el resultado.",
      },
      privacy: {
        title: "Privacidad",
        text: "No hay registro ni cuentas. Los pesos que se cargan, las aeronaves propias y los links compartidos quedan en el navegador. Solo se cuentan unos pocos eventos de uso anónimos (por ejemplo, una hoja de carga generada), sin IP, cookies de seguimiento ni identificadores; la única cookie guarda el idioma elegido.",
      },
      contact: {
        title: "Quién lo mantiene",
        text: "CheckCG lo desarrolla Pablo Alaniz y se publica bajo licencia MIT. Los errores en los datos, los pedidos de aeronaves y las correcciones de traducción se reciben como issues en GitHub.",
      },
    },
    aircraftColumn: "Aeronave",
    reliabilityColumn: "Confiabilidad",
    verifiedColumn: "Última verificación",
    repoLink: "Código fuente en GitHub",
    issuesLink: "Reportar un error o pedir una aeronave",
  },
}
