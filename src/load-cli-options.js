const cosmiconfig = require("cosmiconfig");

const explorer = cosmiconfig("jest-runner-shellcheck-linter", {
  sync: true
});

module.exports = config => {
  const result = explorer.load(config.rootDir);

  if (result) {
    return result.config.cliOptions || {};
  }

  return {};
};
