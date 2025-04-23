import React, { useState, useEffect } from "react";
import NavBar from "../../components/molecules/navBar";
import { Box, Typography } from "@mui/material";
import { useUser } from "../../contexts/userContext";
import { useAppointments } from "../../contexts/appointmentsContext";
import TutorNotificationStudentDetail from "../../components/molecules/tutorNotificationStudentDetail";
import ImportantPages from "../../components/molecules/importantPages";
import StudentAppointmentCardContainter from "../../styles/studentAppointmentCardContainer";
import appointmentRespond from "../../API/appointmentRespond";
import { Navigate, useNavigate } from 'react-router-dom';

const TutorDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { pendingAppointments, pastAppointments, activeAppointments, fetchAppointments } = useAppointments();

  const [isAppointmentFormVisible, setIsAppointmentFormVisible] = useState(false);
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);

  useEffect(() => {
    if (user?.tutor_details?.approved === false) {
      alert('Your account is not approved yet. Please wait for the admin to approve your account.')
      navigate('/login');
    }

    fetchAppointments();
    const now = new Date(); // current date and time

    activeAppointments.forEach(appointment => {
      const appointmentEndTime = new Date(appointment.end);
      appointmentEndTime.setDate(appointmentEndTime.getDate() - 1); // subtract a day
      appointmentEndTime.setHours(appointmentEndTime.getHours() + 13); // add 13 hours

      if (appointmentEndTime < now && appointment.status === "active") {
        appointmentRespond(appointment.id, null, fetchAppointments, "past");
      }
    });
  }, []);

  if (localStorage.getItem('role') !== 'Tutor') {
    return <Navigate to="/error" />;
  }

  return (
    <Box display="grid" gridTemplateColumns="240px 84% 1px auto" height="100vh">
      {isAppointmentFormVisible && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          bgcolor="rgba(0, 0, 0, 0.5)"
          zIndex={999}
        ></Box>
      )}
      <NavBar activeItem="Dashboard" user={user} />

      {/* Main content container */}
      <Box display="flex" flexDirection="column" padding="16px" width="100%">
        {/* Upcoming Appointments */}
        <Box>
          <Typography variant="h6">Upcoming Appointments</Typography>
          <Box mt={2} display="flex" flexDirection="row" flexWrap={"wrap"} >
            {activeAppointments.length ? (
              activeAppointments.
                sort((a, b) => new Date(a.start) - new Date(b.start)).
                map(appointment => (
                  <StudentAppointmentCardContainter key={appointment.id} >
                    <TutorNotificationStudentDetail appointmentId={editingAppointmentId} appointment={appointment} fetchAppointments={fetchAppointments} type={"upcoming"}
                      onShowAppointmentForm={() => {
                        setIsAppointmentFormVisible(true);
                        setEditingAppointmentId(appointment.id)
                      }}
                      onHideAppointmentForm={() => setIsAppointmentFormVisible(false)}
                      isAppointmentFormVisible={isAppointmentFormVisible}
                      user={user}
                    />
                  </StudentAppointmentCardContainter>
                ))
            ) : (
              <Typography align="center" style={{ width: '100%' }}>No Active Appointments to see</Typography>
            )}
          </Box>
        </Box>

        {/* Appointment Requests */}
        <Box mt={4}>
          <Typography variant="h6">Appointment Requests</Typography>
          <Box mt={2} display="flex" flexDirection="row" flexWrap={"wrap"} >
            {pendingAppointments.length ? (
              pendingAppointments.map(appointment => (
                <StudentAppointmentCardContainter key={appointment.id}>
                  <TutorNotificationStudentDetail appointment={appointment} fetchAppointments={fetchAppointments} type={"request"} />
                </StudentAppointmentCardContainter>
              ))
            ) : (
              <Typography align="center" style={{ width: '100%' }}>No Appointment Requests to see</Typography>
            )}
          </Box>
        </Box>

        {/* Important Pages */}
        <Box mt={4}>
          <Typography variant="h6">Important Pages</Typography>
          <Box mt={2}>
            {/* Cards for important pages will go here */}
            <StudentAppointmentCardContainter>
              <ImportantPages />
            </StudentAppointmentCardContainter>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TutorDashboard;