import { describe, test, expect } from "vitest";

import { getFontColor } from "../src/utils";

const units = {
  c: "c",
  f: "f",
};

describe("Get font color function", () => {
  test("returns correct font color when unit state matches selected unit", () => {
    const isWhiteFontC = getFontColor(units.c, units.c);
    expect(isWhiteFontC).toBe("white-font");

    const isWhiteFontF = getFontColor(units.f, units.f);
    expect(isWhiteFontF).toBe("white-font");
  });

  test("returns correct font color when unit state does not match selected unit", () => {
    const isWhiteFont = getFontColor(units.f, units.c);
    expect(isWhiteFont).toBe("black-font");
  });
});
