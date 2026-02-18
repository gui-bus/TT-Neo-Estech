"use client";
//#region Imports
import { useEffect, useState } from "react";

//#endregion

/**
 * ### useIsLoaded Hook
 *
 * A custom hook that provides a `boolean` state to indicate when a component has finished loading.
 * This hook sets `isLoaded` to `true` once the component mounts, allowing other parts of the application
 * to react to the component's loading status.
 *
 * #### Usage
 * ```typescript
 * const [isLoaded] = useIsLoaded();
 * ```
 * This hook is helpful for determining when the component has completed its initial load
 * (e.g., for showing or hiding loading indicators).
 *
 * ### Returns
 * - `[boolean]`: An array with one element:
 *   - `isLoaded` (`boolean`): Indicates if the component has been fully loaded (always `true` after mounting).
 *
 * ### Example
 * ```typescript
 * import useIsLoaded from './useIsLoaded';
 *
 * function ExampleComponent() {
 *   const [isLoaded] = useIsLoaded();
 *
 *   return (
 *     <div>
 *       {isLoaded ? "Component is loaded!" : "Loading..."}
 *     </div>
 *   );
 * }
 * ```
 *
 * ### Remarks
 * - This hook only updates `isLoaded` on the initial mount.
 * - Can be used in any functional component that needs to detect when it has fully loaded.
 *
 * ### Dependencies
 * - React `useEffect` and `useState` hooks are required.
 *
 * @returns {[boolean]} - An array with one element: `isLoaded`.
 */
const useIsLoaded = () => {
  //#region useStates
  const [isLoaded, setIsLoaded] = useState(false);
  //#endregion

  //#region useEffects
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoaded(true);
  }, []);
  //#endregion

  return { isLoaded };
};

export default useIsLoaded;
