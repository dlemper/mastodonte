import { createRouter, createWebHistory } from "vue-router";
import { mande, defaults } from "mande";
import HomeFeed from "./components/HomeFeed.vue";
import LoginForm from "./components/LoginForm.vue";

const isAuthenticated = () => !!localStorage.getItem("access_token");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Home",
      path: "/",
      component: HomeFeed,
    },
    {
      name: "OAuth2",
      path: "/oauth2/callback",
      beforeEnter: async (to) => {
        const redirectUri = `${location.origin}/oauth2/callback`;
        const BASE_URL = localStorage.getItem("BASE_URL");
        const instanceInfo = JSON.parse(
          localStorage.getItem("instanceInfo") ?? "{}"
        );

        if (to.query.code && BASE_URL && instanceInfo.client_id) {
          const oauthApi = mande(`${BASE_URL}/oauth`);

          const { access_token } = await oauthApi.post("token", {
            client_id: instanceInfo.client_id,
            client_secret: instanceInfo.client_secret,
            redirect_uri: redirectUri,
            grant_type: "authorization_code",
            code: to.query.code,
          });

          localStorage.setItem("access_token", access_token);
        }

        return { name: "Home" };
      },
    },
    {
      name: "Login",
      path: "/login",
      component: LoginForm,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && to.name !== "OAuth2" && !isAuthenticated()) {
    next({ name: "Login" });
  } else {
    const access_token = localStorage.getItem("access_token");
    defaults.headers.Authorization = `Bearer ${access_token}`;

    next();
  }
});

export default router;
