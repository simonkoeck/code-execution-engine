var cee = require("../lib/index");

// var executor = new cee.LXC("cee");
// executor.execute("echo 123", cee.languages.BASH);

describe("Testing Basic Languages", () => {
  test("Bash", () => {
    return cee.execute("echo 123", cee.languages.BASH).then((response) => {
      expect(response).toBe("123");
    });
  });
  // test("LXC", () => {
  //   return executor.execute("whoami", cee.languages.BASH).then((response) => {
  //     expect(response).toBe("123");
  //   });
  // });
});
