var cee = require("../lib/index");
(async () => {
  var r = await cee.execute(
    `
    echo 123
    `,
    cee.languages.BASH,
    {
      security: {
        useLXC: false,
      },
    }
  );
  console.log(r);
})();