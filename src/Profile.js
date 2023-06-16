const localStorageName = 'username';
const localStorageID = 'userID';

const UserProfile = {
    get username() {
        return localStorage.getItem(localStorageName);
    },
    set username(name) {
        localStorage.setItem(localStorageName, name);
    },
    get id() {
        return localStorage.getItem(localStorageID);
    },
    set id(id) {
        localStorage.setItem(localStorageID, id);
    },
    clear() {
        localStorage.removeItem(localStorageName);
        localStorage.removeItem(localStorageID);
    }
}

export default UserProfile;