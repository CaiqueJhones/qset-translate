<template>
  <q-page>
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title>Adaptação Transcultural do Q-SET eSaúde</q-toolbar-title>

      <q-btn flat label="Relatório" @click="report.prompt = true" v-if="isAdministrator" />
      <q-btn flat round dense icon="exit_to_app" @click="logout" />
    </q-toolbar>
    <div v-if="finish" class="q-mt-xl">
      <div class="row justify-center q-mb-md">
        <img src="statics/nuvem.png" alt="Logo" class="logo">
      </div>
      <div class="row justify-center">
        <p class="text-h6">Obrigada por participar da nossa Adaptação Transcultural!</p>
      </div>
    </div>
    <q-stepper
      v-else
      v-model="step"
      ref="stepper"
      color="teal"
      animated
      class="q-ma-md"
    >
      <q-step
        :name="1"
        title="TCLE"
        icon="assignment"
        color="teal-1"
        done-color="teal"
        active-color="cyan-8"
        :done="step > 1"
      >
        <my-tcle ref="tcle" @next="next"></my-tcle>
      </q-step>

      <q-step
        :name="2"
        title="CARACTERIZAÇÃO DO JUIZ"
        icon="perm_identity"
        color="teal-1"
        done-color="teal"
        active-color="cyan-8"
        :done="step > 2"
      >
        <my-form ref="form" @next="next"></my-form>
      </q-step>

      <q-step
        :name="3"
        title="AVALIAÇÃO DE EQUIVALÊNCIAS"
        icon="assessment"
        color="teal-1"
        done-color="teal"
        active-color="cyan-8"
        :done="step > 3"
      >
        <my-equivalence ref="equivalence" @next="next"></my-equivalence>
      </q-step>

      <q-step
        :name="4"
        title="PESQUISA DE OPINIÃO"
        icon="search"
        color="teal-1"
        done-color="teal"
        active-color="cyan-8"
      >
        <my-survey-research ref="survey" @finish="onFinish"></my-survey-research>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            @click="onNext"
            color="teal"
            :label="step === 4 ? 'Enviar' : 'Continuar'"
            :disable="disableContinue"
          />
          <q-btn
            v-if="step > 1 && isAdministrator"
            flat
            color="teal"
            @click="onPrevious"
            label="Voltar" class="q-ml-sm"
          />
          <q-btn
            @click="onSave"
            label="Salvar"
            v-if="step > 1"
            flat
            color="teal"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>

    <q-dialog v-model="report.prompt" persistent @before-show="resetReportDialog">
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Nome do usuário:</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="report.username"
            autofocus
            @keyup.enter="downloadReport"
            @blur="$v.report.username.$touch"
            :error="$v.report.username.$error"
          >
            <template v-slot:error>
               Informe o nome de usuário!
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Download" @click="downloadReport" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import reportService from 'services/report-service'
export default {
  name: 'PageIndex',
  data () {
    return {
      step: 1,
      disableContinue: false,
      finish: false,
      report: {
        prompt: false,
        username: ''
      }
    }
  },
  computed: {
    ...mapGetters('user', ['isAdministrator', 'isJudge']),
    ...mapGetters('judge', ['judge']),
    actual () {
      switch (this.step) {
        case 1: return this.$refs.tcle
        case 2: return this.$refs.form
        case 3: return this.$refs.equivalence
        case 4: return this.$refs.survey
        default: return undefined
      }
    }
  },
  methods: {
    ...mapActions('user', ['userInfo', 'doLogout']),
    ...mapActions('judge', ['loadJudge']),
    ...mapMutations('judge', ['setJudge']),
    onPrevious () {
      this.$refs.stepper.previous()
      window.scrollTo(0, 0)
      setTimeout(() => {
        this.actual.load()
      }, 1000)
    },
    onNext () {
      if (this.actual) {
        this.actual.onNext()
      }
    },
    onSave () {
      if (this.actual) {
        this.actual.onSave()
      }
    },
    next () {
      this.$refs.stepper.next()
      window.scrollTo(0, 0)
      setTimeout(() => {
        this.actual.load()
      }, 1000)
    },
    onFinish () {
      this.finish = true
    },
    logout () {
      this.doLogout()
      this.setJudge({})
      window.location.reload()
    },
    downloadReport () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.report.prompt = false
      reportService.surveyReport(this.report.username)
    },
    resetReportDialog () {
      this.report.username = ''
      this.$v.$reset()
    }
  },
  async mounted () {
    try {
      await this.userInfo()
      if (this.isJudge) {
        await this.loadJudge()
        this.finish = this.judge.evaluated
      }
      if (!this.finish) {
        await this.actual.load()
      }
    } catch (error) {
      this.disableContinue = true
    }
  },
  validations: {
    report: {
      username: {
        required
      }
    }
  }
}
</script>
