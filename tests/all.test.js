var cee = require("../lib/index");

describe("Testing Basic Languages", () => {
  test("Bash", () => {
    return cee.execute("echo 123", cee.languages.BASH).then((response) => {
      expect(response).toBe("123");
    });
  });
});
