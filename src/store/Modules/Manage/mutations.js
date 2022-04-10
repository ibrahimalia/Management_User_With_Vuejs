import router from "./../../../router/index.js";

export const redirectTo = (state, payload) => {
  router.push({ name: payload });
};
