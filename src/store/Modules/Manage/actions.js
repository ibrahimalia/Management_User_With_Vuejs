export const redirectTo = ({ commit }, payload) => {
  commit("redirectTo", payload.name);
};
