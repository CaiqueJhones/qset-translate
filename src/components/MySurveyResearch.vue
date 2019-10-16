<template>
  <div>
    <div class="text-h6 text-center">O que você achou desse instrumento? <br><br></div>

    <q-form>
      <div class="row">
        <p>
          1. Qual a sua opinião sobre a versão traduzida do Q-set?
        </p>
      </div>
      <div class="row">
        <q-radio v-model="survey.q1" val="1" label="Ruim" />
        <q-radio v-model="survey.q1" val="2" label="Regular" />
        <q-radio v-model="survey.q1" val="3" label="Bom" />
        <q-radio v-model="survey.q1" val="4" label="Excelente" />

      </div>

      <div class="row">
        <p>
          2. Você acredita que os docentes brasileiros terão interesse e facilidade para utilizar a versão traduzida da escala em nossa realidade?
        </p>
      </div>

      <div class="row">
        <q-radio v-model="survey.q2" val="1" label="Não" />
        <q-radio v-model="survey.q2" val="2" label="Sim" />
      </div>

      <div class="row">
        <p>
          3. Você já utilizou algum instrumento de mensuração direcionado à Educação com Tecnologias Digitais de Informação e Comunicação?
        </p>
      </div>

      <div class="row">
        <div class="col-2">
          <q-radio v-model="survey.q3" val="1" label="Não" />
          <q-radio v-model="survey.q3" val="2" label="Sim" />
        </div>
        <div class="col-2">
          <q-input label="Qual?" dense />
        </div>
      </div>

      <div class="row">
        <p>
          4. Você considera a versão brasileira da escala em questão relevante para a Educação com Tecnologias Digitais de Informação e Comunicação na área da saúde?
        </p>
      </div>

      <div class="row">
        <q-radio v-model="survey.q4" val="1" label="Não" />
        <q-radio v-model="survey.q4" val="2" label="Sim" />
      </div>

      <div class="row">
        <q-input label="Justifique sua resposta" type="textarea" dense />
      </div>

    </q-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      survey: {
        q1: null,
        q2: null,
        q3: null,
        q4: null
      }
    }
  }
}
</script>
