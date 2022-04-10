const path = require('path');
module.exports = {
  pluginOptions: {
    "vue-cli-plugin-auto-alias": {
      rootDirName: "src",
      case: "pascalCase",
      alias: {
        Public: path.resolve(__dirname, 'public'),      },
    },
  },
};
