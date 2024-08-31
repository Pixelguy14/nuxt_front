<template>
  <div>
    <v-row>
      <v-spacer />
      <v-btn>
        Crear Estudiante
      </v-btn>
    </v-row>
    <v-row align="center" justify="center">
      <v-data-table
        :headers="headers"
        :items="estudiantes"
      />
    </v-row>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  // you dont add cookies component since this file is loaded from another route
  data () {
    return {
      estudiantes: [],
      headers: [
        {
          text: 'Nombre',
          align: 'center',
          sortable: 'true',
          value: 'nombre'
        },
        {
          text: 'Ap. Paterno',
          align: 'center',
          sortable: 'true',
          value: 'apaterno'
        },
        {
          text: 'Ap. Materno',
          align: 'center',
          sortable: 'true',
          value: 'amaterno'
        },
        {
          text: 'Telefono',
          align: 'center',
          sortable: 'true',
          value: 'telefono'
        },
        {
          text: 'Correo',
          align: 'center',
          sortable: 'true',
          value: 'correo'
        },
        {
          text: 'Acciones',
          align: 'center',
          sortable: 'true',
          value: ''
        }
      ]
    }
  },
  mounted () {
    this.loadEstudiantes()
  },
  methods: {
    loadEstudiantes () {
      const token = Cookies.get('token')
      this.$axios.get('/all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log('res => ', res.data)
        this.estudiantes = res.data.estudiantes
      }).catch((error) => {
        console.log('error => ', error)
      })
    }
  }
}
</script>
