<template>
  <q-page padding>
    <q-stepper
      v-model="step"
      ref="stepper"
      contracted
      color="teal"
      animated
    >
      <q-step
        :name="1"
        title="Select campaign settings"
        icon="settings"
        color="teal"
        :done="step > 1"
      >
        <my-tcle></my-tcle>
      </q-step>

      <q-step
        :name="2"
        title="Create an ad"
        icon="add_comment"
        color="teal"
        :done="step > 2"
      >
        <my-form></my-form>
      </q-step>

      <q-step
        :name="3"
        title="Create an ad group"
        caption="Optional"
        icon="create_new_folder"
        color="teal"
        :done="step > 3"
      >
        <my-equivalence></my-equivalence>
      </q-step>

      <q-step
        :name="4"
        title="Create an ad group"
        caption="Optional"
        icon="search"
        color="teal"
      >
        <my-survey-research></my-survey-research>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="$refs.stepper.next()" color="teal" :label="step === 4 ? 'Enviar' : 'Continuar'" />
          <q-btn v-if="step > 1" flat color="teal" @click="$refs.stepper.previous()" label="Voltar" class="q-ml-sm" />
          <q-btn label="Salvar" v-if="step > 1" flat color="teal" />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      step: 1
    }
  }
}
</script>
