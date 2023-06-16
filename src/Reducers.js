import UserProfile from "./Profile";

// Create a reducer that handles the user session
let sessionReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            UserProfile.username = action.payload.username;
            UserProfile.id = action.payload.id;
            return {
                ...state,
                loggedIn: true,
                username: UserProfile.username,
                id: UserProfile.id,
            };
        case 'logout':
            UserProfile.clear();
            return {
                ...state,
                loggedIn: false,
                username: UserProfile.username,
                id: UserProfile.id,
            };
        default:
            return {
                ...state,
                username: UserProfile.username,
                id: UserProfile.id,
            };
    }
}

export { sessionReducer };