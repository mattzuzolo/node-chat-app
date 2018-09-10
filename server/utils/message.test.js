let expect = require("expect");
let { generateMessage } = require("./message");

describe("generateMessage", () => {
  it("should genereate message object correctly", () => {
    let from = "Matt";
    let text = "Matts message";
    let message = generateMessage(from, text);

    expect(message.createdAt).toBeA("number");
    expect(message).toInclude({ from, text });
  });
});
