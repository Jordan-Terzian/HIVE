import { useUser } from '../contexts/userContext';
import { Navigate } from 'react-router-dom';

// To ensure that users that arent logged in cant access certain pages
const ProtectedRoute = ({ component: Component }) => {
    const { user, loading } = useUser();

    if (loading) {
        return <div>Loading...</div>;  
    }
    if (!user) {
        return <Navigate to="/error" />;
    }

    return <Component />;
};

export default ProtectedRoute;
