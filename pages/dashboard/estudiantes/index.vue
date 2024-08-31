<template>
  <div>
    <v-row align="center" justify="center">
      <estudiantes-crud />
    </v-row>
  </div>
</template>

<script>
import Cookies from 'js-cookie' // same script as index.vue from dashboard
import estudiantesCrud from '@/components/user/estudiantesCrud.vue'
export default {
  components: {
    estudiantesCrud
  },
  middleware: 'detect-push',
  mounted () {
    // const token = localStorage.getItem('token')
    const cookieToken = Cookies.get('token')
    // console.log(`cookie token: ${cookieToken}`)
    if (!cookieToken) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
