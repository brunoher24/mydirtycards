import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [{
        path: '',
        redirect: '/connexion'
    },
    {
        path: '/connexion',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/accueil',
        component: () =>
            import ('../views/Home.vue')
    },
    {
        path: '/mes-cartes',
        component: () =>
            import ('../views/MyCards.vue')
    },
    {
        path: '/partie-en-cours',
        name: "gameInProgress",
        component: () =>
            import ('../views/GameInProgress.vue')
    },
    {
        path: '/nouvelle-partie',
        component: () =>
            import ('../views/NewGame.vue')
    },
    {
        path: '/invitations',
        component: () =>
            import ('../views/Invitations.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router