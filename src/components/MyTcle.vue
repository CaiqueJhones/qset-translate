<template>
  <div class="text-justify">
    <div class="text-h6 text-center">Termo de Consentimento Livre e Esclarecido <br><br></div>

    <p>
      Prezado (a) Senhor (a)
    </p>

    <p>
      Estamos realizando um estudo, EDUCAÇÃO ONLINE NO CAMPO DA SAÚDE PÚBLICA: UM ESTUDO Q, para verificar se uma escala, utilizada em outro país, será validada para a população brasileira (considerando inicialmente a população docente da saúde da Universidade de São Paulo, campus Ribeirão Preto), que busca entender os fatores que influenciam no uso da Educação Online na formação em Saúde. Como pesquisadoras responsáveis: a Ma. Samára dos Santos Sampaio (Enfermeira, Estudante do Doutorado da Faculdade de Medicina de Ribeirão - USP), sob orientação da Profa. Dra. Aldaísa Cassanho Forster e co-orientação da Profa. Dra. Janise Braga Barros Ferreira (Docentes da Faculdade de Medicina Faculdade de Medicina de Ribeirão - USP).
    </p>
    <p>
      Para isso, a escala, chamada Q-set e-Saúde, precisa ser submetida a um rigoroso protocolo de tradução e adaptação cultural para a realidade do Brasil. Logo, venho por meio deste convidá-lo (a) a participar desse estudo na qualidade de juiz expert na área de estudos metodológicos.
    </p>
    <p>
      Sua participação neste estudo é livre e exigirá além de sua disponibilidade de tempo para avaliar a tradução da escala, um encontro via skype com a pesquisadora principal para que possamos juntos discutir e fazer uma síntese de sua apreciação da escala. Se depois de consentir em sua participação você desistir de continuar participando, tem o direito e a liberdade de retirar seu consentimento em qualquer fase da pesquisa, seja antes ou depois da coleta dos dados, independente do motivo e sem nenhum prejuízo a sua pessoa.
    </p>
    <p>
      Sua participação neste estudo não lhe trará gastos e você não receberá gratificação por participar. Os principais riscos envolvidos na participação desse estudo são relacionados à quebra de sigilo de informações e perda de dados. O desconforto envolvido na participação desse estudo está relacionado ao tempo que será utilizado para responder o questionário.
    </p>
    <p>
      Os dados coletados serão utilizados anonimamente para o relatório final da pesquisa e publicação dos resultados em periódicos e eventos científicos, seu nome não será divulgado em qualquer fase da pesquisa, mantendo assim seu sigilo e privacidade.
    </p>
    <p>
      Na qualidade de juiz o (a) senhor (a) receberá um login e uma senha de acesso a um aplicativo web, que contará com a versão traduzida do Q-set e as instruções de como proceder à avaliação mediante normas constantes na literatura e no protocolo deste estudo.
    </p>
    <p>
      Sinta-se livre para fazer qualquer pergunta durante a leitura desse termo de consentimento ou em qualquer momento do estudo, contatando a pesquisadora por meio do telefone (16) 982305281 ou pelo e-mail sami_sampaio@usp.br . O Comitê de Ética em Pesquisa do Centro de Saúde Escola Dr. Joel Domingos Machado - Faculdade de Medicina de Ribeirão Preto - Universidade de São Paulo - CNES 2086948 também poderá ser consultado sobre o projeto pelo telefone (16) 3315-0009 ou por e-mail csecuiaba@fmrp.usp.br .
    </p>
    <p>
      <b>DECLARO</b>, na condição de juiz do comitê de experts em estudos metodológicos da pesquisa, que fui devidamente esclarecido a respeito das informações que li sobre os propósitos do estudo, os procedimentos a serem realizados, seus desconfortos e riscos, as garantias de confidencialidade, de esclarecimentos permanentes e de poder me retirar do estudo a qualquer momento. Portanto, consinto voluntariamente em colaborar com o presente estudo.
    </p>

    <br>

    <q-radio
      dense
      v-model="accept"
      class="q-mb-md"
      keep-color
      color="teal"
      :val="true"
    >
      <slot><span class="text-weight-medium">Aceito participar desta pesquisa</span></slot>
    </q-radio><br>
    <q-radio
      dense
      v-model="accept"
      class="q-mb-md"
      keep-color
      color="teal"
      :val="false"
    >
      <slot><span class="text-weight-medium">Não aceito</span></slot>
    </q-radio>

    <p>Ribeirão Preto, {{ currentDate }}</p> <br>
    <p>
      Samára dos Santos Sampaio <br>
      <span class="text-caption">Pesquisadora responsável</span>
    </p>
  </div>
</template>
<script>
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
export default {
  data () {
    return {
      accept: true
    }
  },
  computed: {
    currentDate () {
      return format(new Date(), `dd 'de' MMMM 'de' yyyy`, { locale: ptBR })
    }
  }
}
</script>
