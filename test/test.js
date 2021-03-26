var cee = require("../lib/index");
(async () => {
  var r = await cee.execute(
    `#include <stdio.h>
int main() {
   printf("Hello, test123!");
   return 0;
}
`,
    cee.languages.C,
    {
      security: {
        enabled: false,
      },
    }
  );
  console.log(r);
})();
