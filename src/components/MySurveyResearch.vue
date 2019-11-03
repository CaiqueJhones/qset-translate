<template>
  <div>
    <div class="text-h6 text-center">O que você achou desse instrumento? <br><br></div>

    <q-form>
      <div class="row">
        <p>
          1. Qual a sua opinião sobre a versão traduzida do Q-set?
        </p>
      </div>
      <div class="row q-mb-md">
        <q-radio v-model="survey.q1" val="Ruim" label="Ruim" />
        <q-radio v-model="survey.q1" val="Regular" label="Regular" />
        <q-radio v-model="survey.q1" val="Bom" label="Bom" />
        <q-radio v-model="survey.q1" val="Excelente" label="Excelente" />
      </div>

      <div class="row">
        <p>
          2. Você acredita que os pesquisadores brasileiros terão interesse e facilidade para utilizar a versão traduzida da escala em nossa realidade?
        </p>
      </div>

      <div class="row q-mb-md">
        <q-radio v-model="survey.q2" val="Não" label="Não" />
        <q-radio v-model="survey.q2" val="Sim" label="Sim" />
      </div>

      <div class="row">
        <p>
          3. Você já utilizou algum instrumento de mensuração direcionado à Educação com Tecnologias Digitais de Informação e Comunicação?
        </p>
      </div>

      <div class="row q-mb-md">
        <div class="col-2">
          <q-radio v-model="survey.q3.utilizou" val="Não" label="Não" />
          <q-radio v-model="survey.q3.utilizou" val="Sim" label="Sim" />
        </div>
        <div class="col-2">
          <q-input
            :disable="survey.q3.utilizou !== 'Sim'"
            v-model="survey.q3.qual"
            label="Qual?"
            dense
          />
        </div>
      </div>

      <div class="row">
        <p>
          4. Você considera a versão brasileira da escala em questão relevante para a Educação com Tecnologias Digitais de Informação e Comunicação na área da saúde?
        </p>
      </div>

      <div class="row">
        <q-radio v-model="survey.q4.considera" val="Não" label="Não" />
        <q-radio v-model="survey.q4.considera" val="Sim" label="Sim" />
      </div>

      <div class="row">
        <q-input v-model="survey.q4.justificativa" label="Justifique sua resposta" type="textarea" dense />
      </div>

    </q-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { notifySuccess, notifyWarn } from 'services/notify'

export default {
  data () {
    return {
      survey: {
        q1: '',
        q2: '',
        q3: { utilizou: null, qual: '' },
        q4: { considera: null, justificativa: '' }
      }
    }
  },
  computed: {
    ...mapGetters('judge', ['judge']),
    ...mapGetters('user', ['isAdministrator', 'isJudge'])
  },
  methods: {
    ...mapActions('judge', ['saveOpinion', 'finishSurvey']),
    async onNext () {
      if (this.isAdministrator) {
        this.$emit('finish')
        return
      }
      await this.saveOpinion(this.survey)
      await this.finishSurvey()
      this.$emit('finish')
    },
    async onSave () {
      if (this.isJudge) {
        await this.saveOpinion(this.survey)
        notifySuccess('Informações salvas!')
      } else if (this.isAdministrator) {
        notifyWarn('Você é um administrador, não pode salvar aqui!')
      }
    },
    async load () {
      if (this.isJudge) {
        this.survey = { ...this.survey, ...this.judge.opinion }
      }
    }
  }
}
</script>
