var cee = require("../lib/index");

describe("Testing Basic Languages", () => {
  test("Python3", () => {
    return cee
      .execute("x = input(); print(x)", cee.languages.PYTHON3, [], "123")
      .then((response) => {
        expect(response).toBe("123");
      });
  });
  test("Python2", () => {
    return cee
      .execute("print '123'", cee.languages.PYTHON2)
      .then((response) => {
        expect(response).toBe("123");
      });
  });
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
  test("Ruby", () => {
    return cee.execute("puts 123", cee.languages.RUBY).then((response) => {
      expect(response).toBe("123");
    });
  });
  test("C", () => {
    return cee
      .execute(
        `#include<stdio.h>

int main() {
	printf("123");
	return 0;
}
`,
        cee.languages.C
      )
      .then((response) => {
        expect(response).toBe("123");
      });
  });
  test("C++", () => {
    return cee
      .execute(
        `#include "iostream"
          int main(void)
          {
              std::cout << "123";
              return 0;
          }`,
        cee.languages.CPP
      )
      .then((response) => {
        expect(response).toBe("123");
      });
  });
  test("Java", () => {
    return cee
      .execute(
        `public class HelloWorld
  {

         public static void main (String[] args)
         {
               System.out.println("123");
         }
  }`,
        cee.languages.JAVA
      )
      .then((response) => {
        expect(response).toBe("123");
      });
  });
  test("Go", () => {
    return cee
      .execute(
        `
            package main

            import "fmt"

            func main() {
                fmt.Println("123")
            }

          `,
        cee.languages.GO
      )
      .then((response) => {
        expect(response).toBe("123");
      });
  });
});
