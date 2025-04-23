import React, { useEffect } from "react";
import NavBar from "../../components/molecules/navBar";
import { Box, Typography } from "@mui/material";
import { useUser } from "../../contexts/userContext";
import { useAppointments } from "../../contexts/appointmentsContext";
import StudentAppointmentCard from "../../components/molecules/studentAppointmentCard";
import PastAppointmentCard from "../../components/molecules/pastAppointmentCard";
import StudentAppointmentCardContainter from "../../styles/studentAppointmentCardContainer";
import appointmentRespond from "../../API/appointmentRespond";
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useUser();
  const { pendingAppointments, pastAppointments, activeAppointments, fetchAppointments } = useAppointments();

  useEffect(() => {
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


  if (localStorage.getItem('role') !== 'Student') {
    return <Navigate to="/error" />;
  }

  return (
    <Box display="grid" gridTemplateColumns="240px 84% 1px auto" height="100vh">
      <NavBar activeItem="Dashboard" user={user} />

      {/* Main content container */}
      <Box display="flex" flexDirection="column" padding="16px" width="100%">
        {/* Upcoming Appointments */}
        <Box>
          <Typography variant="h6">Upcoming Appointments</Typography>
          <Box mt={2} display="flex" flexDirection="row" flexWrap={"wrap"} >
            {activeAppointments.length ? (
              activeAppointments.map(appointment => (
                <StudentAppointmentCardContainter key={appointment.id}>
                  <StudentAppointmentCard appointment={appointment} fetchAppointments={fetchAppointments} type={"upcoming"} />
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
                  <StudentAppointmentCard appointment={appointment} fetchAppointments={fetchAppointments} type={"request"} />
                </StudentAppointmentCardContainter>
              ))
            ) : (
              <Typography align="center" style={{ width: '100%' }}>No Appointment Requests to see</Typography>
            )}
          </Box>
        </Box>

        {/* Past Appointments */}
        <Box>
          <Typography variant="h6">Past Appointments</Typography>
          <Box mt={2} display="flex" flexDirection="row" flexWrap={"wrap"} >
            {pastAppointments.length ? (
              pastAppointments.map(appointment => (
                <StudentAppointmentCardContainter key={appointment.id}>
                  <PastAppointmentCard appointment={appointment} fetchAppointments={fetchAppointments}/>
                </StudentAppointmentCardContainter>
              ))
            ) : (
              <Typography align="center" style={{ width: '100%' }}>No Past Appointments to see</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
