<template>
  <div>
    <v-row>
      <v-spacer />
      <v-btn @click="showDialog = true">
        Crear Estudiante
      </v-btn>
    </v-row>
    <v-row align="center" justify="center">
      <v-data-table
        :headers="headers"
        :items="estudiantes"
      >
        <template #[`item.acciones`]="{ item }">
          <v-tooltip bottom color="green">
            <template #activator="{on, attrs}">
              <v-btn
                icon
                color="warning"
                v-bind="attrs"
                @click="actualizar(item)"
                v-on="on"
              >
                <v-icon>mdi-update</v-icon>
              </v-btn>
            </template>
            <span>Actualizar al estudiante: {{ item.nombre }}</span>
          </v-tooltip>
          <v-tooltip bottom color="yellow">
            <template #activator="{on, attrs}">
              <v-btn
                icon
                color="red"
                v-bind="attrs"
                @click="borrar(item)"
                v-on="on"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Borrar al estudiante: {{ item.nombre }}</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-row>
    <v-dialog
      v-model="showDialog"
      width="500"
      persistent
    >
      <v-card>
        <v-card-title>Crear un Estudiante</v-card-title>
        <v-card-text>
          <v-form ref="formCreate">
            <v-row align="center" justify="center">
              <v-text-field
                v-model="nombre"
                placeholder="Ingrese un Nombre"
                label="Nombre"
                solo
                filled
              />
            </v-row>
            <v-row align="center" justify="center">
              <v-text-field
                v-model="apaterno"
                placeholder="Ingrese un Apellido Paterno"
                label="Apellido Paterno"
                solo
                filled
              />
            </v-row>
            <v-row align="center" justify="center">
              <v-text-field
                v-model="amaterno"
                placeholder="Ingrese un Apellido Materno"
                label="Apellido Materno"
                solo
                filled
              />
            </v-row>
            <v-row align="center" justify="center">
              <v-text-field
                v-model="direccion"
                placeholder="Ingrese una Direccion"
                label="Direccion"
                solo
                filled
              />
            </v-row>
            <v-row align="center" justify="center">
              <v-text-field
                v-model="telefono"
                placeholder="Ingrese un Telefono"
                label="Telefono"
                solo
                filled
              />
            </v-row>
            <v-row align="center" justify="center">
              <v-text-field
                v-model="correo"
                placeholder="Ingrese un Correo"
                label="Correo"
                solo
                filled
              />
            </v-row>
            <v-row align="center" justify="center">
              <v-text-field
                v-model="usuario"
                placeholder="Ingrese un Usuario"
                label="Usuario"
                solo
                filled
              />
            </v-row>
            <v-row align="center" justify="center">
              <v-text-field
                v-model="password"
                placeholder="Ingrese una contraseña"
                label="Contraseña"
                solo
                filled
                type="password"
              />
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-row align="center" justify="center" class="mb-2">
            <v-btn @click="showDialog = false">
              Cancelar
            </v-btn>
            <v-btn @click="createEstudiante">
              Agregar
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
          value: 'acciones'
        }
      ],
      showDialog: false,
      nombre: '',
      apaterno: '',
      amaterno: '',
      direccion: '',
      telefono: '',
      correo: '',
      usuario: '',
      password: '',
      token: null
    }
  },
  mounted () {
    this.loadEstudiantes()
  },
  methods: {
    loadEstudiantes () {
      this.token = Cookies.get('token')
      this.$axios.get('/all', {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).then((res) => {
        console.log('res => ', res.data)
        if (res && res.data && res.data.message === 'success') {
          this.estudiantes = res.data.estudiantes
        }
      }).catch((error) => {
        console.log('error => ', error)
      })
    },
    createEstudiante () {
      const body = {
        nombre: this.nombre,
        apaterno: this.apaterno,
        amaterno: this.amaterno,
        direccion: this.direccion,
        telefono: this.telefono,
        correo: this.correo,
        usuario: this.usuario,
        password: this.password
      }
      this.$axios.post('/create', body, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        console.log('res => ', res.data)
        if (res && res.data && res.data.message === 'success') {
          this.loadEstudiantes()
          this.showDialog = false
        }
      }).catch((error) => {
        console.log('error => ', error)
      })
    },
    borrar (item) {
      // console.log('Item que obtengo: ', item)
      this.$axios.delete(`/estudiante/${item.id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        this.loadEstudiantes()
      }).catch((error) => {
        console.log('error => ', error)
      })
    }
  }
}
</script>
