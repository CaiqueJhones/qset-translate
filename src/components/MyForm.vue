<template>
  <div>

    <q-form>
      <div class="text-h6 text-center">Identificação <br><br></div>

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12 col-md-4">
          <q-input
            v-model="dados.nome"
            label="Seu Nome e Sobrenome *"
            @blur="$v.dados.nome.$touch"
            :error="$v.dados.nome.$error"
          >
            <template v-slot:error>
               Informe o seu nome e sobrenome!
            </template>
          </q-input>
        </div>
        <div class="col-12 col-md-4">
          <q-input
            v-model="dados.idade"
            label="Idade *"
            type="number"
            @blur="$v.dados.idade.$touch"
            :error="$v.dados.idade.$error"
          >
            <template v-slot:error>
               Informe a sua idade!
            </template>
          </q-input>
        </div>
        <div class="col-12 col-md-4">
          <q-select
            v-model="dados.estado"
            label="Estado que reside *"
            :options="estados"
            @popup-hide="$v.dados.estado.$touch"
            :error="$v.dados.estado.$error"
            @filter="loadEstados"
          >
            <template v-slot:error>
               Informe o estado que você mora atualmente!
            </template>
          </q-select>
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12 col-md-6">
          <q-input
            v-model="dados.localTrabalho"
            label="Local de trabalho *"
            @blur="$v.dados.localTrabalho.$touch"
            :error="$v.dados.localTrabalho.$error"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            v-model="dados.areaAtuacao"
            label="Área de atuação"
            @blur="$v.dados.areaAtuacao.$touch"
            :error="$v.dados.areaAtuacao.$error"
          />
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12 col-md-5">
          <p class="q-field__label">Ocupação atual *</p>
          <q-radio
            @input="dados.ocupacaoAtualEspecifico = ''"
            v-model="dados.ocupacaoAtual"
            val="Assistência"
            label="Assistência" />
          <q-radio
            @input="dados.ocupacaoAtualEspecifico = ''"
            v-model="dados.ocupacaoAtual"
            val="Ensino"
            label="Ensino" />
          <q-radio
            @input="dados.ocupacaoAtualEspecifico = ''"
            v-model="dados.ocupacaoAtual"
            val="Pesquisa"
            label="Pesquisa" />
          <q-radio
            @input="dados.ocupacaoAtualEspecifico = ''"
            v-model="dados.ocupacaoAtual"
            val="Consultoria"
            label="Consultoria" />
          <q-radio v-model="dados.ocupacaoAtual" val="Outro" label="Outro" />
        </div>
        <div class="col-12 col-md-7">
          <q-input
            :disable="dados.ocupacaoAtual !== 'Outro'"
            v-model="dados.ocupacaoAtualEspecifico"
            hint="Especificar"
          />
        </div>
        <span v-if="semOcupacaoAtual" class="text-red">Escolha sua ocupação atual</span>
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12 col-md-6">
          <p class="q-field__label">Proficiência na língua inglesa *</p>
          <q-radio v-model="dados.proeficienciaIngles" val="Sim" label="Sim" />
          <q-radio v-model="dados.proeficienciaIngles" val="Não" label="Não" />
        </div>
        <span v-if="semProeficiencia" class="text-red">
          Preencha se possui proficiência ou não
        </span>
      </div>

      <div class="text-h6 text-center">Qualificação <br><br></div>

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12 col-md-8">
          <q-input
            v-model="dados.formacao"
            label="Formação / Graduação"
            @blur="$v.dados.formacao.$touch"
            :error="$v.dados.formacao.$error"
          />
        </div>
        <div class="col-12 col-md-4">
          <q-input
            v-model="dados.formacaoAno"
            label="Ano"
            type="number"
            @blur="$v.dados.formacaoAno.$touch"
            :error="$v.dados.formacaoAno.$error"
          />
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12 col-md-8">
          <q-input
            v-model="dados.especializacao1"
            label="Especialização 1"
          />
        </div>
        <div class="col-12 col-md-4">
          <q-input
            v-model="dados.especializacao1Ano"
            label="Ano"
            type="number"
            @blur="$v.dados.especializacao1Ano.$touch"
            :error="$v.dados.especializacao1Ano.$error"
          />
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12 col-md-8">
          <q-input
            v-model="dados.especializacao2"
            label="Especialização 2"
          />
        </div>
        <div class="col-12 col-md-4">
          <q-input
            v-model="dados.especializacao2Ano"
            label="Ano"
            type="number"
            @blur="$v.dados.especializacao2Ano.$touch"
            :error="$v.dados.especializacao2Ano.$error"
          />
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12 col-md-8">
          <q-input
            v-model="dados.mestrado"
            label="Mestrado em"
          />
        </div>
        <div class="col-12 col-md-4">
          <q-input
            v-model="dados.mestradoAno"
            label="Ano"
            type="number"
            @blur="$v.dados.mestradoAno.$touch"
            :error="$v.dados.mestradoAno.$error"
          />
        </div>
      </div>

      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-8">
          <q-input
            v-model="dados.doutorado"
            label="Doutorado em"
          />
        </div>
        <div class="col-12 col-md-4">
          <q-input
            v-model="dados.doutoradoAno"
            label="Ano"
            type="number"
            @blur="$v.dados.doutoradoAno.$touch"
            :error="$v.dados.doutoradoAno.$error"
          />
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-xl">
        <div class="col-12 col-md-8">
          <q-input
            v-model="dados.outrasFormacoes"
            label="Outros"
          />
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-xl">
        <div class="col-12 col-md-12">
          <p class="q-field__label">Experiência com estudos metodológicos *</p>
          <q-checkbox v-model="dados.experiencia1" label="Tese de natureza metodológica e com instrumentos de avaliação psicológica" /> <br>
          <q-checkbox v-model="dados.experiencia2" label="Dissertação de natureza metodológica e com instrumentos de avaliação psicológica" /> <br>
          <q-checkbox v-model="dados.experiencia3" label="Experiência prática com estudos de natureza metodológica e instrumentos de avaliação psicológica" /> <br>
          <q-checkbox v-model="dados.experiencia4" label="Participação em grupos/projetos de pesquisa que envolvam instrumentos de avaliação psicológica" /> <br>
          <q-checkbox v-model="dados.experiencia5" label="Autoria de trabalhos publicados em periódicos que abordem a temática instrumentos de avaliação psicológica" /> <br>
          <span v-if="semExperiencia" class="text-red">Escolha pelo menos uma experiência</span>
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <p class="q-field__label">
          Experiência anterior com a adaptação transcultural de instrumentos de mensuração na temática Tecnologias Digitais de Informação e Comunicação *
        </p>
        <div class="col-12 col-md-2">
          <p> </p>
          <q-radio v-model="dados.experienciaAnterior" val="Sim" label="Sim" />
          <q-radio v-model="dados.experienciaAnterior" val="Não" label="Não" />
        </div>
        <div class="col-12 col-md-10">
          <q-input
            :disable="dados.experienciaAnterior !== 'Sim'"
            v-model="dados.experienciaAnteriorEspecifico"
            hint="Qual"
          />
        </div>
        <span v-if="semExperienciaAnterior" class="text-red">Escolha se possui ou não experiência</span>
      </div>

    </q-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { required, minValue } from 'vuelidate/lib/validators'
import { notifySuccess, notifyWarn, notifyError } from 'services/notify'
import ibgeService from 'services/ibge-service'

export default {
  data () {
    return {
      dados: {
        nome: '',
        idade: 0,
        estado: null,
        cidade: null,
        localTrabalho: '',
        areaAtuacao: '',
        ocupacaoAtual: '',
        ocupacaoAtualEspecifico: '',
        proeficienciaIngles: '',
        formacao: '',
        formacaoAno: null,
        especializacao1: '',
        especializacao1Ano: null,
        especializacao2: '',
        especializacao2Ano: null,
        mestrado: '',
        mestradoAno: null,
        doutorado: '',
        doutoradoAno: null,
        outrasFormacoes: '',
        experiencia1: false,
        experiencia2: false,
        experiencia3: false,
        experiencia4: false,
        experiencia5: false,
        experienciaAnterior: '',
        experienciaAnteriorEspecifico: ''
      },
      estados: null,
      semExperiencia: false,
      semOcupacaoAtual: false,
      semProeficiencia: false,
      semExperienciaAnterior: false
    }
  },
  computed: {
    ...mapGetters('judge', ['judge']),
    ...mapGetters('user', ['isAdministrator', 'isJudge'])
  },
  methods: {
    ...mapActions('judge', ['saveDescription']),
    async onNext () {
      if (this.isAdministrator) {
        this.$emit('next')
        return
      }
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      if (!this.valid()) {
        return
      }
      await this.saveDescription(this.dados)
      this.$emit('next')
    },
    async onSave () {
      if (this.isJudge) {
        await this.saveDescription(this.dados)
        notifySuccess('Informações salvas!')
      } else if (this.isAdministrator) {
        notifyWarn('Você é um administrador, não pode salvar aqui!')
      }
    },
    async load () {
      if (this.isJudge) {
        this.dados = { ...this.dados, ...this.judge.description }
      }
    },
    async loadEstados (val, update, abort) {
      try {
        if (this.estados !== null) {
          update()
          return
        }
        const est = await ibgeService.getEstados()
        update(() => { this.estados = est.map(e => e.estado) })
      } catch (error) {
        notifyError(error)
      }
    },
    valid () {
      let result = true
      if (!this.dados.experiencia1 && !this.dados.experiencia2 &&
          !this.dados.experiencia3 && !this.dados.experiencia4 && !this.dados.experiencia5) {
        this.semExperiencia = true
        result = false
      }
      if (!this.dados.ocupacaoAtual || this.dados.ocupacaoAtual === '' ||
          (this.dados.ocupacaoAtual === 'Outro' && this.dados.ocupacaoAtualEspecifico === '')) {
        this.semOcupacaoAtual = true
        result = false
      }
      if (this.dados.proeficienciaIngles === '') {
        this.semProeficiencia = true
        result = false
      }
      if (this.dados.experienciaAnterior === '' ||
          (this.dados.experienciaAnterior === 'Sim' && this.dados.experienciaAnteriorEspecifico === '')) {
        this.semExperienciaAnterior = true
        result = false
      }
      return result
    }
  },
  validations: {
    dados: {
      nome: {
        required
      },
      idade: {
        required,
        minValue: minValue(1)
      },
      estado: {
        required
      },
      localTrabalho: {
        required
      },
      areaAtuacao: {
        required
      },
      formacao: {
        required
      },
      formacaoAno: {
        required,
        minValue: minValue(1900)
      },
      especializacao1Ano: {
        minValue: minValue(1900)
      },
      especializacao2Ano: {
        minValue: minValue(1900)
      },
      mestradoAno: {
        minValue: minValue(1900)
      },
      doutoradoAno: {
        minValue: minValue(1900)
      }
    }
  }
}
</script>
<style scoped>
.required {
  color: crimson
}
.required:after {
  content: " *"
}
</style>
