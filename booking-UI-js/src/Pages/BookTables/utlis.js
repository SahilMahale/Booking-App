
import { TABLESTATES } from "./constants.js"
export function checkAvailable(isAvailable = false) {
  return isAvailable ? TABLESTATES.AVAILABLE : TABLESTATES.UNAVAILABLE
}
