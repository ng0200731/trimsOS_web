import { renderHook } from "@testing-library/react";
import { useIsMobile } from "./useIsMobile";

it("returns a boolean (defaults to false in jsdom wide viewport)", () => {
  const { result } = renderHook(() => useIsMobile());
  expect(typeof result.current).toBe("boolean");
});
