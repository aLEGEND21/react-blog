import SessionStore from "./store";

// Create a reducer that handles the user session
let sessionReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            SessionStore.username = action.payload.username;
            SessionStore.id = action.payload.id;
            return {
                ...state,
                loggedIn: true,
                username: SessionStore.username,
                id: SessionStore.id,
            };
        case 'logout':
            SessionStore.clear();
            return {
                ...state,
                loggedIn: false,
                username: SessionStore.username,
                id: SessionStore.id,
            };
        default:
            return {
                ...state,
                username: SessionStore.username,
                id: SessionStore.id,
            };
    }
}

export { sessionReducer };