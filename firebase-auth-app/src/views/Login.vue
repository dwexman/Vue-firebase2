<template>
  <div class="auth-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p>¿No tienes cuenta? <router-link to="/signup">Regístrate</router-link></p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const login = async () => {
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push('/');
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    };

    return { email, password, login };
  }
};
</script>

<style scoped>
.auth-container {
  /* Misma configuración de estilos que en SignUp */
}
</style>