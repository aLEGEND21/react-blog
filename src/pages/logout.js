import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionDispatchContext } from '../Contexts';

function Logout() {
    let sessionDispatch = useContext(SessionDispatchContext);
    const navigate = useNavigate();

    // Dispatch the logout action to clear the session
    sessionDispatch({type: 'logout'});

    // Redirect to the home page
    useEffect(() => {
        navigate('/');
    }, []);

    return null;

}

export default Logout;
