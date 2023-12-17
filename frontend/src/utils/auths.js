const STORE_NAME = 'user';
const STORE_NAME_CAT = 'catData';
const STORE_NAME_COFFEE = 'coffeeData';
let currentUser = JSON.parse(localStorage.getItem(STORE_NAME)) ?? undefined;
const getAutenticatedUser = () => {
    if (currentUser !== undefined) {return currentUser;}

    const serializedUser = localStorage.getItem(STORE_NAME);
    if (!serializedUser) {return undefined;}

    currentUser = JSON.parse(serializedUser);
    return currentUser;
};

const setAutenticatedUser = (authenticatedUser) => {
    const serializedUser = JSON.stringify(authenticatedUser);
    localStorage.setItem(STORE_NAME, serializedUser);

    currentUser = authenticatedUser;
};

const isAuthenticated = () => currentUser !== undefined;

const clearAuthenticatedUser = () => {
    localStorage.removeItem(STORE_NAME);
    localStorage.removeItem(STORE_NAME_CAT);
    localStorage.removeItem(STORE_NAME_COFFEE);
    currentUser = undefined;
};

export { isAuthenticated, getAutenticatedUser, setAutenticatedUser, clearAuthenticatedUser};