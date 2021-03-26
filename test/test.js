var cee = require("../lib/index");
(async () => {
  var r = await cee.execute(
    "import os; print(os.name)",
    cee.languages.PYTHON3,
    { security: false }
  );
  console.log(r.split("\n"));
})();
