module.exports = {
  displayName: "test",
  globals: {
    "process.env": {
      NODE_ENV: "test"
    }
  },
  testRegex: "\\.spec\\.js$",
  testPathIgnorePatterns: ["node_modules"],
  watchPlugins: ["jest-plugin-filename"]
};
