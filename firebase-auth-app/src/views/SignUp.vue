<template>
  <div class="auth-container">
    <h1>Sign Up</h1>
    <form @submit.prevent="signUp">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <p>¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link></p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const signUp = async () => {
      try {
        // Registrar al usuario en Firebase Authentication
        await createUserWithEmailAndPassword(auth, email.value, password.value);

        // Redirigir a Home después de registrarse
        router.push('/');
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    };

    return { email, password, signUp };
  }
};
</script>


<style>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

input {
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 0.8rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

p {
  margin-top: 1rem;
}
</style>