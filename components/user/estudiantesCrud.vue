<template>
  <div>
    <v-row>
      <v-spacer />
      <v-btn
        color="primary"
        dark
        class="ma-2"
        @click="showDialog = true"
      >
        <v-icon left>
          mdi-account-plus
        </v-icon>
        Crear Estudiante
      </v-btn>
    </v-row>
    <!--data table-->
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
    <!-- dialog de creacion-->
    <v-dialog
      v-model="showDialog"
      width="600"
      persistent
    >
      <v-card>
        <v-card-title>Crear un Estudiante</v-card-title>
        <v-card-text>
          <v-form ref="formCreate">
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="nombre"
                    placeholder="Ingrese un Nombre"
                    label="Nombre"
                    solo
                    filled
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="apaterno"
                    placeholder="Ingrese un Apellido Paterno"
                    label="Apellido Paterno"
                    solo
                    filled
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="amaterno"
                    placeholder="Ingrese un Apellido Materno"
                    label="Apellido Materno"
                    solo
                    filled
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="direccion"
                    placeholder="Ingrese una Dirección"
                    label="Dirección"
                    solo
                    filled
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="telefono"
                    placeholder="Ingrese un Teléfono"
                    label="Teléfono"
                    solo
                    filled
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="correo"
                    placeholder="Ingrese un Correo"
                    label="Correo"
                    solo
                    filled
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="usuario"
                    placeholder="Ingrese un Usuario"
                    label="Usuario"
                    solo
                    filled
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="password"
                    placeholder="Ingrese una Contraseña"
                    label="Contraseña"
                    solo
                    filled
                    type="password"
                  />
                </v-col>
              </v-row>
            </v-container>
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
    <!-- dialog de modificacion-->
    <v-dialog
      v-model="showDialogActualizar"
      width="600"
      persistent
    >
      <v-card>
        <v-card-title>Actualizar un Estudiante</v-card-title>
        <v-card-text>
          <v-form ref="formUpdate">
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="estudiante.nombre"
                    placeholder="Ingrese un Nombre"
                    label="Nombre"
                    solo
                    filled
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="estudiante.apaterno"
                    placeholder="Ingrese un Apellido Paterno"
                    label="Apellido Paterno"
                    solo
                    filled
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="estudiante.amaterno"
                    placeholder="Ingrese un Apellido Materno"
                    label="Apellido Materno"
                    solo
                    filled
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="estudiante.direccion"
                    placeholder="Ingrese una Dirección"
                    label="Dirección"
                    solo
                    filled
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="estudiante.telefono"
                    placeholder="Ingrese un Teléfono"
                    label="Teléfono"
                    solo
                    filled
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="estudiante.correo"
                    placeholder="Ingrese un Correo"
                    label="Correo"
                    disabled
                    solo
                    filled
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="estudiante.usuario"
                    placeholder="Ingrese un Usuario"
                    label="Usuario"
                    disabled
                    solo
                    filled
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="estudiante.password"
                    placeholder="Ingrese una Contraseña"
                    label="Contraseña"
                    solo
                    filled
                    type="password"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-row align="center" justify="center" class="mb-2">
            <v-btn @click="showDialogActualizar = false">
              Cancelar
            </v-btn>
            <v-btn @click="updateEstudiante">
              Actualizar
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
      token: null,
      estudiante: {},
      showDialogActualizar: false
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
        // console.log('res => ', res.data)
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
        // console.log('res => ', res.data)
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
    },
    actualizar (item) {
      this.estudiante = item
      this.estudiante.password = ''
      this.showDialogActualizar = true
      // console.log("estudiante => ", this.estudiante)
    },
    updateEstudiante () {
      this.$axios.put(`/estudiante/${this.estudiante.id}`, this.estudiante, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        // console.log('res => ', res.data)
        if (res && res.data && res.data.message === 'success') {
          this.loadEstudiantes()
          this.estudiante = {}
          this.showDialogActualizar = false
        }
      }).catch((error) => {
        console.log('error => ', error)
      })
    }
  }
}
</script>
