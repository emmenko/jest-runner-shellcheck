module.exports = {
  runner: "./src/index.js",
  displayName: "lint:shell",
  moduleFileExtensions: ["sh", "bash", "dash", "ksh"],
  testMatch: ["**/*.sh", "**/*.bash"],
  testPathIgnorePatterns: ["/node_modules/", "/src/fixtures/"]
};
