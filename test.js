const test = require("flug");

const b64ab = require("./b64ab.js");

const randomArrayBuffer = len => {
  const nums = [];
  for (let i = 0; i < len; i++) nums.push(Math.random());
  return new Float64Array(nums).buffer;
}

test("toArrayBuffer", ({ eq }) => {
  const actual = Array.from(new Uint8Array(b64ab.toArrayBuffer("AQIDBAUGBwgJCg==")));
  const expected = [1,2,3,4,5,6,7,8,9,10];
  eq(actual, expected);
})

test("example", ({ eq }) => {
  const u8 = Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const encoded = b64ab.toBase64String(u8.buffer);
  const decoded = b64ab.toArrayBuffer(encoded);
  eq(Array.from(new Uint8Array(decoded)), Array.from(u8));
});

test("round trip", ({ eq }) => {
  for (let len = 1; len < 1000; len++) {
    const arrayBuffer = randomArrayBuffer(len);
    
    const encoded_expected = Buffer.from(arrayBuffer).toString('base64');
    const encoded_actual = b64ab.toBase64String(arrayBuffer);
    eq(encoded_actual, encoded_expected);

    const decoded_actual = Uint8Array.from(b64ab.toArrayBuffer(encoded_expected));
    const decoded_expected = Uint8Array.from(Buffer.from(encoded_expected, 'base64').buffer);
    eq(decoded_actual, decoded_expected);
  }
});