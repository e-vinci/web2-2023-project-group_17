const STORE_NAME = 'user';
let currentUser = JSON.parse(localStorage.getItem(STORE_NAME)) ?? undefined;

/**
 * get the current authenticated user
 * @returns {currentUser} - the current authenticated user
 */
const getAutenticatedUser = () => {
    if (currentUser !== undefined) {return currentUser;}

    const serializedUser = localStorage.getItem(STORE_NAME);
    if (!serializedUser) {return undefined;}

    currentUser = JSON.parse(serializedUser);
    return currentUser;
};

/**
 * define the current authenticated user.
 * @param {authenticatedUser} authenticatedUser 
 */
const setAutenticatedUser = (authenticatedUser) => {
    const serializedUser = JSON.stringify(authenticatedUser);
    localStorage.setItem(STORE_NAME, serializedUser);

    currentUser = authenticatedUser;
};

/**
 * check if the user is authenticated.
 * @returns boolean if the user is authenticated
 */
const isAuthenticated = () => currentUser !== undefined;

/**
 * clear the current authenticated user.
 */
const clearAuthenticatedUser = () => {
    localStorage.removeItem(STORE_NAME);
    currentUser = undefined;
};

export { isAuthenticated, getAutenticatedUser, setAutenticatedUser, clearAuthenticatedUser};