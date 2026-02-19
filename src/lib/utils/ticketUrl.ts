//#region Imports
import { TicketsFilters } from "@/src/lib/hooks/useTicketsList";
//#endregion

/**
 * Synchronizes the internal application state with URL search parameters.
 *
 * This function updates a `URLSearchParams` instance based on the current view and filters.
 * It enforces a business rule where pagination parameters (`page` and `pageSize`) are
 * removed from the URL when the view is set to 'gestor' to ensure a clean dashboard state.
 *
 * @param {URLSearchParams} currentParams - The existing search parameters from the current URL.
 * @param {string} view - The current active layout view (e.g., 'técnico' or 'gestor').
 * @param {TicketsFilters} filters - An object containing the current filter values.
 * * @returns {Object} An object containing the sync results.
 * @returns {URLSearchParams} .newParams - A new instance of URLSearchParams with updated values.
 * @returns {boolean} .hasChanged - A flag indicating if the URL parameters have been modified.
 */
export const syncUrlParams = (
  currentParams: URLSearchParams,
  view: string,
  filters: TicketsFilters,
): { newParams: URLSearchParams; hasChanged: boolean } => {
  const params = new URLSearchParams(currentParams);
  let hasChanged = false;

  if (params.get("view") !== view) {
    params.set("view", view);
    hasChanged = true;
  }

  Object.entries(filters).forEach(([key, value]) => {
    if (view === "gestor" && (key === "page" || key === "pageSize")) {
      if (params.has(key)) {
        params.delete(key);
        hasChanged = true;
      }
      return;
    }

    const stringValue =
      value !== undefined && value !== null ? String(value) : "";

    if (params.get(key) !== stringValue && stringValue !== "") {
      params.set(key, stringValue);
      hasChanged = true;
    } else if (stringValue === "" && params.has(key)) {
      params.delete(key);
      hasChanged = true;
    }
  });

  return { newParams: params, hasChanged };
};
