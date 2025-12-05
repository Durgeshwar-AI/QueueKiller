import "@testing-library/jest-dom";

// Polyfills for libs that expect TextEncoder/TextDecoder
import { TextEncoder, TextDecoder } from "util";
const globalWithEncoders = globalThis as unknown as {
  TextEncoder?: typeof TextEncoder;
  TextDecoder?: typeof TextDecoder;
};
if (typeof globalWithEncoders.TextEncoder === "undefined") {
  globalWithEncoders.TextEncoder = TextEncoder;
}
if (typeof globalWithEncoders.TextDecoder === "undefined") {
  globalWithEncoders.TextDecoder = TextDecoder;
}
