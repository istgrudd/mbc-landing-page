/** @type {import('@react-router/dev/config').Config} */
export default {
  ssr: false, // no runtime server → fully static output
  async prerender() {
    return ["/"]; // M1 stub; M3 will enumerate content slugs from markdown
  },
};
