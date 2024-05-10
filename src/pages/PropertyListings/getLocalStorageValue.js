export default function getLocalStorageValue(localStorageKey, fallback) {
    if (!localStorage.getItem(localStorageKey)) {
        return fallback;
    }

    try {
        return JSON.parse(localStorage.getItem(localStorageKey));
    } catch (error) {
        localStorage.removeItem(localStorageKey);
        return fallback;
    }
}
