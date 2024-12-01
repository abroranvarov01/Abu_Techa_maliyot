export function loadState(key: string) {
  try {
    const serializedState = localStorage.getItem(key);

    if (!serializedState) return undefined;

    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export function saveState(key: string, state: {}) {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {}
}

export function removeState(key: string) {
  try {
    localStorage.removeItem(key);
  } catch (e) {}
}
