module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  generateBuildId: () => "codecamp_deploy_4",
  exportPathMap: () => ({
    "/": { page: "/" },
    "/boards": { page: "/boards" },
    "/404": { page: "/404" },
  }),
};
