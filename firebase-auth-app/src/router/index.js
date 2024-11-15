import { createRouter, createWebHistory } from 'vue-router';
import SignUp from '../views/SignUp.vue';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";

const routes = [
  { path: '/signup', name: 'SignUp', component: SignUp, meta: { requiresGuest: true } },
  { path: '/login', name: 'Login', component: Login, meta: { requiresGuest: true } },
  { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/signup' } // Redirige cualquier ruta no definida a signup
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardián global para verificar autenticación
router.beforeEach((to, from, next) => {
  onAuthStateChanged(auth, (user) => {
    if (to.meta.requiresAuth && !user) {
      // Si intenta acceder a una ruta protegida sin estar autenticado
      next('/signup');
    } else if (to.meta.requiresGuest && user) {
      // Si intenta acceder a login o signup estando autenticado
      next('/');
    } else {
      // Deja pasar a la ruta solicitada
      next();
    }
  });
});

export default router;