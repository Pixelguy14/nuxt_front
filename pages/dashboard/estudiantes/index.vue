<template>
  <div>
    <v-row align="center" justify="center">
      <estudianteCrud />
    </v-row>
  </div>
</template>

<script>
import Cookies from 'js-cookie' // same script as index.vue from dashboard
import estudianteCrud from '@/components/user/estudiantesCrud.vue'
export default {
  components: {
    estudianteCrud
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
