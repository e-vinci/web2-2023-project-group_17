import Navigate from '../Components/Router/Navigate';

const STORE_NAME = 'users';
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

const isAuthenticated = () => currentUser !== undefined && currentUser!== null;

const clearAuthenticatedUser = () => {
    localStorage.removeItem(STORE_NAME);
    currentUser = undefined;
};

const logout = async () => {
    clearAuthenticatedUser();
    const response = await fetch(`${process.env.API_BASE_URL}/auths/logout`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    });

    if (!response.ok) {throw new Error(`fetch error : ${response.status} : ${response.statusText}`);}

    Navigate('/');
};

export { isAuthenticated, getAutenticatedUser, setAutenticatedUser, clearAuthenticatedUser, logout};