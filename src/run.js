const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { pass, fail } = require("create-jest-runner");
const kebabCase = require("lodash.kebabcase");
const loadCliOptions = require("./load-cli-options");

module.exports = async ({ config, testPath }) => {
  const start = new Date();

  // eslint-disable-next-line no-unused-vars
  const cliOptions = loadCliOptions(config);
  const normalizeOptions = Object.keys(cliOptions)
    .reduce((cliArguments, option) => {
      const cliArg = kebabCase(option);
      const cliVal = cliOptions[cliArg];
      if (typeof cliVal === "boolean" && cliVal)
        return cliArguments.concat(`--${cliArg}`);
      else return cliArguments.concat(`--${cliArg}=${cliVal}`);
    }, [])
    .join(" ")
    .trim();

  const commandWithArgs = `shellcheck ${normalizeOptions}`.trim();

  let errorMessage;
  try {
    const { stdout, stderr } = await exec(
      `${commandWithArgs} ${testPath}`.trim()
    );
    if (stderr) errorMessage = stderr;
  } catch (error) {
    errorMessage = error.stderr || error.stdout;
  }

  if (errorMessage) {
    return Promise.resolve(
      fail({
        start,
        end: new Date(),
        test: {
          path: testPath,
          errorMessage
        }
      })
    );
  }
  return Promise.resolve(
    pass({
      start,
      end: new Date(),
      test: { path: testPath }
    })
  );
};
