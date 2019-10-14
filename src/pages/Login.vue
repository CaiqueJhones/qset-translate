<template>
  <q-page>
    <div class="row justify-center">
      <div class="bg-teal" style="width: 100%; height: 150px;"></div>
      <q-card class="q-pa-md shadow-6 m-card">
        <q-card-section>
          <div class="row q-mb-md">
            <span class="text-h6 text-center" style="width: 100%">{{ $t('login')}}</span>
          </div>
          <div class="row q-mb-md">
            <div class="col">
              <q-input
                v-model="user.username"
                rounded
                outlined
                dense
                :label="$t('username.label')"
                type="email"
                color="teal"
                bg-color="white"
                @blur="$v.user.username.$touch"
                :error="$v.user.username.$error"
                :error-message="$t('username.required')"
              >
                <template v-slot:prepend>
                  <q-icon name="fas fa-user-graduate" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <q-input
                v-model="user.password"
                rounded
                outlined
                dense
                :label="$t('password.label')"
                type="password"
                color="teal"
                bg-color="white"
                @blur="$v.user.password.$touch"
                :error="$v.user.password.$error"
              >
                <template v-slot:prepend>
                  <q-icon name="fas fa-key" />
                </template>
                <template v-slot:error v-if="!$v.user.password.required">
                  {{ $t('password.required') }}
                </template>
                <template v-slot:error v-else-if="!$v.user.password.minLength">
                  {{ $t('password.minLength', [$v.user.password.$params.minLength.min]) }}
                </template>
              </q-input>
            </div>
          </div>

          <div class="row">
            <q-checkbox
              v-model="user.remember"
              class="q-mb-md"
              keep-color
              color="teal"
            >
              <slot><span class="text-weight-medium text-grey-9">{{ $t('remember') }}</span></slot>
            </q-checkbox>
          </div>

          <div class="row justify-center">
            <q-btn
              @click="onSubmit"
              class="q-pt-sm q-pb-sm q-pl-xl q-pr-xl text-weight-bold"
              color="teal"
              text-color="white"
              :label="$t('enter')"
              :rounded="true"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      user: {
        username: '',
        password: '',
        remember: false
      }
    }
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('user', ['doLogin']),
    async onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      try {
        await this.doLogin(this.user)
        this.goToApp()
      } catch (error) {
        const message = error ? error.mensagem : null
        this.errorMessage = message || 'Não foi possível se conectar com o servidor!'
      }
    },
    goToApp () {
      this.$router.replace({ path: `/` })
    }
  },
  mounted () {
    if (this.isAuthenticated) {
      this.goToApp()
    }
    window.addEventListener('keyup', event => {
      if (event.keyCode === 13) {
        this.onSubmit()
      }
    })
  },
  validations: {
    user: {
      username: {
        required
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.m-card {
  margin-top: -80px;
  width: 30%;
}
@media only screen and (max-width: 768px) {
  .m-card {
    width: 50%;
  }
}
@media only screen and (max-width: 375px) {
  .m-card {
    width: 90%;
  }
}
</style>
