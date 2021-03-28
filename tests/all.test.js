var cee = require("../lib/index");

describe("Testing Basic Languages", () => {
  test("Bash", () => {
    return cee.execute("echo 123", cee.languages.BASH).then((response) => {
      expect(response).toBe("123");
    });
  });
  test("JS", () => {
    return cee
      .execute("console.log(123)", cee.languages.JAVASCRIPT)
      .then((response) => {
        expect(response).toBe("123");
      });
  });
  // test("LXC", () => {
  //   var executor = new cee.LXC("cee");
  //   return executor.execute("whoami", cee.languages.BASH).then((response) => {
  //     expect(response).toBe("123");
  //   });
  // });
});
