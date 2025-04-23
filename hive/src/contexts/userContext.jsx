import React, { createContext, useState, useEffect, useContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const roleResponse = await fetch(`http://127.0.0.1:8000/profile/role/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
      });

      if (!roleResponse.ok) {
        throw new Error('Failed to fetch user role');
      }

      const roleData = await roleResponse.json();
      const isNumericUsername = /^\d+$/.test(localStorage.getItem('username'));
      let userData;

      localStorage.setItem('role', roleData.role);

      if (roleData.role === "Student" || roleData.role === "Tutor" || roleData.role === "Admin") {
        // Determine the correct URL part based on the role
        const userType = (roleData.role === "Student" || roleData.role === "Admin") ? "user" : "tutor";

        // If username is all numeric, assume it is a phone number
        if (isNumericUsername) {
          const userResponse = await fetch(`http://127.0.0.1:8000/profile/${userType}/phone/${localStorage.getItem('username')}/`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            }
          });

          if (!userResponse.ok) {
            throw new Error(`${roleData.role} with phone number not found`);
          }

          userData = await userResponse.json();
        } else {
          // If username is not all numeric, assume it is an email
          const userResponse = await fetch(`http://127.0.0.1:8000/profile/${userType}/${localStorage.getItem('username')}/`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            }
          });

          if (!userResponse.ok) {
            throw new Error(`${roleData.role} with email not found`);
          }

          userData = await userResponse.json();
        }
      } else {
        throw new Error('Invalid role data received');
      }

      setUser(userData);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data on mount if token is present
  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
