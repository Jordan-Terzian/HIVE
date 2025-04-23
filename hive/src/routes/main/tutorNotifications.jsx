import React, { useEffect, useState } from "react";
import NavBar from "../../components/molecules/navBar";
import { Box, Typography } from "@mui/material";
import { useUser } from "../../contexts/userContext";
import NotificationCard from "../../components/molecules/notificationsCard";
import GetNotifications from "../../API/getNotifications";
import { useAppointments } from "../../contexts/appointmentsContext";
import { Navigate } from 'react-router-dom';

const TutorNotifications = () => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState([]);
  const { fetchAppointments } = useAppointments();

  // Fetch notifications
  useEffect(() => {
    GetNotifications()
      .then(data => {
        setNotifications([...data].reverse());
      });

  }, []);

  if (localStorage.getItem('role') !== 'Tutor') {
    return <Navigate to="/error" />;
  }


  return (
    <Box display="grid" gridTemplateColumns="240px auto" height="100vh" gap="16px">
      <NavBar activeItem="Notifications" user={user} />

      {/* Main content container */}
      <Box display="flex" flexDirection="column" padding="16px" width="100%">
        {notifications.map(notification => (
          (notification.status !== "active" && notification.status !== "declined" && notification.status !== "past") ? (
            <Box mt={2} key={notification.id}>
              <NotificationCard
                status={notification.status}
                name={notification.student}
                appointment={notification}
                fetchAppointments={fetchAppointments}
              />
            </Box>
          ) : null
        ))}
      </Box>
    </Box>
  );
};

export default TutorNotifications;
