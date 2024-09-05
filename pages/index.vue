<template>
  <div>
    <v-row justify="center" align="center" class="mt-5">
      <loginUser />
    </v-row>
  </div>
</template>

<script>
import loginUser from '@/components/user/loginUser.vue'
export default {
  name: 'IndexPage',
  components: {
    loginUser
  },
  layout: 'login',
  middleware: 'detect-push',
  mounted () {
  }
}
</script>

<style scoped>
.mt-5 {
  margin-top: 20px; /* Ajusta este valor según tus necesidades */
}
</style>
