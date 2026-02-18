//#region Imports
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
//#endregion

/**
 * Merges and formats class names using the `twMerge` and `clsx` functions.
 *
 * @param {ClassValue[]} inputs - An array of class values to be merged and formatted.
 * @return {string} The formatted class name.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
