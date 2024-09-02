<template>
  <v-card color="yellow darken-3" widht="400" elevation="0">
    <v-card-title class="text-h4" color="deep-orange darken-4">
      <p class="text-center" style="width:100%;">
        Bienvenido
      </p>
    </v-card-title>
    <v-card-text>
      <v-row style="width: 100%">
        <v-text-field
          v-model="usuario"
          label="Usuario"
          placeholder="Escribe tu usuario"
          filled
          rounded
          dense
        />
      </v-row>
      <v-row style="width: 100%">
        <v-text-field
          v-model="password"
          label="Contraseña"
          placeholder="Escribe tu contraseña"
          filled
          rounded
          dense
          type="password"
          :rules="[emptyField, specialChars, sizePassword]"
        />
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-row align="center" justify="center" style="width: 100%" class="mb-2 mt-2">
        <v-btn
          elevation="0"
          color="deep-orange darken-4"
          @click="loginBackend"
        >
          <span style="text-transform: none; color: white;">
            Ingresar
          </span>
          <v-icon color="white">
            mdi-login
          </v-icon>
        </v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'LoginUser',
  data () {
    return {
      usuario: '',
      password: '',
      emptyField:
        value => !!value || 'No puede estar vacio',
      specialChars:
        value => (value && /^[A-Za-z-0-9]/.test(value)) || 'Minimo un caracer especial',
      sizePassword:
        value => (value && value.length > 6) || 'Minimo 6 caracteres'
    }
  },
  methods: {
    loginBackend () {
      const body = {
        usuario: this.usuario,
        password: this.password
      }
      // for it to take default rute written in editorconfig
      this.$axios.post('/login', body)
        .then((res) => {
          if (res.data && res.data.token) {
            Cookies.set('token', res.data.token, { expires: 1 }, { path: '/' })
            // localStorage.setItem('token', res.data.token)
            // Cookies.remove('token') // With this you can delete the created token
            this.$router.push('/dashboard')
          }
        })
        .catch((error) => {
          console.error('error => ', error)
        })
    }
  }
}
</script>
