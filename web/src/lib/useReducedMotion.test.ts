import { renderHook } from "@testing-library/react";
import { useReducedMotion } from "./useReducedMotion";

it("returns false when matchMedia is unavailable (jsdom default)", () => {
  const { result } = renderHook(() => useReducedMotion());
  expect(result.current).toBe(false);
});
