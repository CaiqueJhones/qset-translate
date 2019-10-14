<template>
  <div>
    <div class="text-h6 text-center">Identificação <br><br></div>

    <q-form>
      <q-input
        label="Seu Nome"
        hint="Nome e Sobrenome"
        lazy-rules
        :rules="[val => val && val.length > 0 || 'Informe seu nome completo' ]"
      />
    </q-form>
  </div>
</template>
