/** Glossary and "about" page content (pt). Same shape in every language: see pages.test.js. */
export const pt = {
  glossary: {
    navLabel: "Glossário",
    title: "Glossário de peso e balanceamento: datum, braço, momento, CG | CheckCG",
    description:
      "Glossário de peso e balanceamento para pilotos: datum, braço, momento, centro de gravidade, envelope, peso vazio, carga útil, MTOW, MLW, MZFW e %MAC.",
    h1: "Glossário de peso e balanceamento",
    intro:
      "Os termos que aparecem no manual de voo, na ficha de peso e balanceamento e na calculadora, explicados em uma ou duas frases. Em Portugal o mesmo assunto chama-se massa e centragem.",
    guideLink: "Guia relacionado:",
    terms: {
      datum: {
        term: "Datum (linha de referência)",
        text: "Plano vertical imaginário, escolhido pelo fabricante, a partir do qual se medem todas as distâncias horizontais do avião. Pode estar na parede de fogo, no nariz ou até à frente dele; é definido no manual de voo.",
      },
      arm: {
        term: "Braço",
        text: "Distância horizontal entre o datum e um peso (um assento, um tanque, o bagageiro). Mede-se em polegadas ou milímetros e é positiva para trás do datum.",
      },
      moment: {
        term: "Momento",
        text: "Peso multiplicado pelo seu braço (lb·in ou kg·mm). Mede o quanto uma carga tende a girar o avião em torno do datum. Alguns manuais o apresentam dividido por 1000 para trabalhar com números menores.",
      },
      cg: {
        term: "Centro de gravidade (CG)",
        text: "Ponto onde se pode considerar concentrado todo o peso do avião. É o momento total dividido pelo peso total, expresso como um braço a partir do datum.",
      },
      envelope: {
        term: "Envelope de CG",
        text: "Área do gráfico peso/CG dentro da qual o avião foi certificado. Tem um limite dianteiro, um limite traseiro e um peso máximo; o ponto do carregamento deve ficar dentro dela na decolagem e no pouso.",
      },
      station: {
        term: "Estação de carga",
        text: "Cada lugar onde se pode colocar peso e que tem um braço definido: assentos dianteiros e traseiros, bagageiros, tanques de combustível.",
      },
      "empty-weight": {
        term: "Peso básico vazio (BEW)",
        text: "Peso do avião com o equipamento instalado, combustível não utilizável e óleo completo, sem ocupantes, bagagem nem combustível utilizável. É próprio de cada matrícula e consta, com o seu braço ou momento, na última ficha de pesagem.",
      },
      "useful-load": {
        term: "Carga útil",
        text: "Diferença entre o peso máximo e o peso básico vazio: o que se pode distribuir entre ocupantes, bagagem e combustível utilizável.",
      },
      mtow: {
        term: "Peso máximo de decolagem (MTOW)",
        text: "Peso máximo com que o avião pode iniciar a corrida de decolagem. É um limite estrutural e de desempenho fixado na certificação.",
      },
      "ramp-weight": {
        term: "Peso máximo de rampa",
        text: "Peso máximo permitido no solo, antes do táxi. É um pouco maior que o MTOW porque considera o combustível queimado na partida, no táxi e no cheque de motor.",
      },
      mlw: {
        term: "Peso máximo de pouso (MLW)",
        text: "Peso máximo com que se pode pousar. Em muitos aviões leves é igual ao MTOW; nos maiores é menor e obriga a queimar combustível antes do pouso.",
      },
      mzfw: {
        term: "Peso máximo zero combustível (MZFW)",
        text: "Peso máximo do avião carregado, mas sem combustível utilizável. Todo o peso acima desse valor tem de ser combustível; o limite protege a estrutura da asa.",
      },
      "usable-fuel": {
        term: "Combustível utilizável",
        text: "Combustível que o motor realmente consegue consumir em voo. O não utilizável fica nos tanques e nas linhas e já faz parte do peso vazio. O combustível entra em peso: cerca de 6 lb por galão de AVGAS e cerca de 6,7 lb por galão de Jet A.",
      },
      mac: {
        term: "Corda média aerodinâmica (%MAC)",
        text: "Outra forma de expressar o CG: como percentagem da corda média aerodinâmica da asa em vez de um braço a partir do datum. É comum em turboélices e jatos.",
      },
      tcds: {
        term: "Folha de dados do certificado de tipo (TCDS)",
        text: "Documento da autoridade (FAA, EASA, ANAC) que resume os limites aprovados de um modelo: pesos máximos, limites de CG, datum e braços das estações.",
      },
      poh: {
        term: "Manual de voo (POH/AFM)",
        text: "Manual aprovado do avião. A sua seção de peso e balanceamento, junto com a ficha de pesagem da matrícula, é a referência oficial para qualquer cálculo.",
      },
    },
  },
  about: {
    navLabel: "Metodologia e fontes",
    title: "Metodologia e fontes de dados do CheckCG: como calcula e verifica",
    description:
      "De onde vêm os dados de cada aeronave, como os cálculos de peso e balanceamento são verificados, quais são os limites da ferramenta e quem a mantém.",
    h1: "Metodologia e fontes de dados",
    intro:
      "O CheckCG é uma calculadora de peso e balanceamento gratuita e de código aberto. Esta página explica de onde vêm os dados, como os cálculos são conferidos e até onde a ferramenta vai.",
    sections: {
      data: {
        title: "De onde vêm os dados",
        text: "Os pesos máximos, limites de CG, braços e envelopes de cada modelo são carregados a partir da folha de dados do certificado de tipo (TCDS) e do manual de voo (POH/AFM). Cada página de aeronave lista os documentos de origem, a data da última verificação e o que ainda falta confirmar.",
      },
      reliability: {
        title: "Nível de confiabilidade de cada aeronave",
        text: "Cada modelo tem um nível declarado: verificado com a documentação oficial, parcialmente verificado ou valores de referência estimados. O catálogo hoje:",
      },
      method: {
        title: "Como calcula e como isso é verificado",
        text: "O cálculo é o do manual: somam-se pesos e momentos de cada estação, o CG é o momento total dividido pelo peso total e o ponto resultante é comparado com o polígono do envelope na decolagem, no pouso e sem combustível. O código é coberto por testes automáticos, incluindo o exemplo resolvido dos guias, que é recalculado a cada alteração.",
      },
      limits: {
        title: "O que não é",
        text: "É um auxílio, não um documento aprovado. O peso vazio e o seu braço mudam a cada matrícula e a cada modificação: devem ser inseridos a partir da ficha de pesagem em vigor. O manual de voo e essa ficha são sempre a referência oficial, e o piloto em comando é responsável por conferir o resultado.",
      },
      privacy: {
        title: "Privacidade",
        text: "Não há cadastro nem contas. Os pesos inseridos, as aeronaves próprias e os links compartilhados ficam no navegador. Apenas alguns eventos de uso anônimos são contados (por exemplo, uma folha de carga gerada), sem IP, cookies de rastreamento nem identificadores; o único cookie guarda o idioma escolhido.",
      },
      contact: {
        title: "Quem mantém",
        text: "O CheckCG é desenvolvido por Pablo Alaniz e publicado sob a licença MIT. Erros nos dados, pedidos de aeronaves e correções de tradução são recebidos como issues no GitHub.",
      },
    },
    aircraftColumn: "Aeronave",
    reliabilityColumn: "Confiabilidade",
    verifiedColumn: "Última verificação",
    repoLink: "Código-fonte no GitHub",
    issuesLink: "Reportar um erro ou pedir uma aeronave",
  },
}
