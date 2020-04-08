const { expect } = require("chai");
const { stringifyJSON } = require("../src/stringifyJSON");

describe("stringifyJSON", () => {
  describe("basic stuff", () => {
    it("should return an array as string", () => {
      expect(stringifyJSON([])).to.equal("[]");
    });
  });

  // FIXME: Write your tests
  describe("???", () => {
    it("should return the right answer", () => {
      expect("FIXME:").to.equal("Write tests");
    });
  });
});
