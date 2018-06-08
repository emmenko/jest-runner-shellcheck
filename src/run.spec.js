const path = require("path");
const run = require("./run");

// Remove undeterministic data from test reports
expect.addSnapshotSerializer({
  print: (val, serialize) => {
    delete val.perfStats;
    delete val.testFilePath;
    val.testResults.forEach(result => {
      delete result.duration;
    });
    return serialize(val);
  },
  test: val => val && val.perfStats && val.testFilePath && val.testResults
});

const createSnapshotTest = fileName => () => {};

const createTestByFileExt = ext => () => {
  describe("good fixture", () => {
    let result;
    let fileName;
    beforeEach(async () => {
      fileName = `good.${ext}`;
      result = await run({
        testPath: path.join(__dirname, "fixtures", fileName),
        config: {},
        globalConfig: {}
      });
    });
    it("should pass the lint check", () => {
      expect(result.numPassingTests).toBe(1);
    });
    it("should not fail the test", () => {
      expect(result.numFailingTests).toBe(0);
    });
  });
  describe("bad fixture", () => {
    let result;
    let fileName;
    beforeEach(async () => {
      fileName = `bad.${ext}`;
      result = await run({
        testPath: path.join(__dirname, "fixtures", fileName),
        config: {},
        globalConfig: {}
      });
    });
    it("should not pass the lint check", () => {
      expect(result.numPassingTests).toBe(0);
    });
    it("should fail the test", () => {
      expect(result.numFailingTests).toBe(1);
    });
  });
};

describe("linter", () => {
  describe(".sh", createTestByFileExt("sh"));
  describe(".bash", createTestByFileExt("bash"));
});
