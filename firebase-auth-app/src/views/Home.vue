<template>
  <div class="home-container">
    <h1>Welcome to Home</h1>
    <p>You are now logged in.</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const logout = async () => {
      try {
        await signOut(auth);
        router.push('/login');
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    };

    return { logout };
  }
};
</script>

<style scoped>
.home-container {
  text-align: center;
  padding: 2rem;
}

button {
  padding: 0.8rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #c0392b;
}
</style>