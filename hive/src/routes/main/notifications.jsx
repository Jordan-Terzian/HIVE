import React, { useState, useEffect } from "react";
import NavBar from "../../components/molecules/navBar";
import { Box } from "@mui/material";
import { useUser } from "../../contexts/userContext";
import NotificationCard from "../../components/molecules/notificationsCard";
import GetNotifications from "../../API/getNotifications";
import { Navigate } from 'react-router-dom';

const Notifications = () => {
  const { user } = useUser();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    GetNotifications()
      .then(data => {
        setNotifications([...data].reverse());
      });
  }, []);

  if (localStorage.getItem('role') !== 'Student') {
    return <Navigate to="/error" />;
  }

  return (
    <Box display="grid" gridTemplateColumns="240px auto" height="100vh" gap="16px">
      <NavBar activeItem="Notifications" user={user} />

      {/* Main content container */}
      <Box display="flex" flexDirection="column" padding="16px" width="100%">
        {notifications.map(notification => (
          (notification.status !== "pending" && notification.status !== "past") ? (
            <Box mt={2} key={notification.id}>
              <NotificationCard 
                status={notification.status} 
                name={notification.tutor} 
              />
            </Box>
          ) : null
        ))}
      </Box>
    </Box>
  );
};

export default Notifications;

