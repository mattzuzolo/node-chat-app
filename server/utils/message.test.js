let expect = require("expect");
let { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
  it("should genereate message object correctly", () => {
    let from = "Matt";
    let text = "Matts message";
    let message = generateMessage(from, text);

    expect(message.createdAt).toBeA("number");
    expect(message).toInclude({ from, text });
  });
});

describe("generateLocationMessage", () => {
  it("should generate correct location object", () => {
    let from = "Matt"
    let latitude = 500;
    let longitude = 501;
    let url = `https://www.google.com/maps?q=500,501`;
    let message = generateLocationMessage(from, latitude, longitude)

    expect(message.createdAt).toBeA("number");
    expect(message).toInclude({ from, url });
  });
});
