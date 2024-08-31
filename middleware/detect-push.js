import Cookies from 'js-cookie'
export default function ({ route, redirect }) {
  // console.log('Navegacion hacia: ', route.path)
  if (route.path === '/') {
    if (Cookies.get('token')) {
      Cookies.remove('token')
    }
  }
}
