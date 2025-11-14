import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated after OAuth callback
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/status`, {
  credentials: 'include'
});

        
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            navigate('/home');
          } else {
            navigate('/login');
          }
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        navigate('/login');
      }
    };

    checkAuthStatus();
  }, [navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '18px'
    }}>
      Processing authentication...
    </div>
  );
};

export default AuthCallback;