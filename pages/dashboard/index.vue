<template>
  <div>
    <h1> Se inicio secion usando el backend</h1>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
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
