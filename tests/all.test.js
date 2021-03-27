var cee = require("../lib/index");

var executor = new cee.LXC("test");
executor.execute("fdasfasdf", cee.languages.BASH);

describe("Testing Basic Languages", () => {
  test("Bash", () => {
    return cee.execute("echo 123", cee.languages.BASH).then((response) => {
      expect(response).toBe("123");
    });
  });
});
