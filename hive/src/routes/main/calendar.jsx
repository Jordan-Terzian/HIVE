import React, { useState, useEffect } from "react";
import NavBar from "../../components/molecules/navBar";
import { Box } from "@mui/material";
import { useUser } from "../../contexts/userContext";
import { Calendar } from 'rsuite';
import "rsuite/dist/rsuite-no-reset.min.css";
import FormatAppointmentsForCalendar from "../../utils/formatAppointmentForCalendar";
import renderCellContent from "../../utils/renderCellContent";
import { GetCourseName } from "../../API/getCoursesName";
import { useAppointments } from "../../contexts/appointmentsContext";
import { Navigate } from 'react-router-dom';


const HiveCalendar = () => {
  const { user } = useUser();
  const [calendarEvents, setCalendarEvents] = useState([]);
  const { activeAppointments } = useAppointments();

  useEffect(() => {
    const fetchAndFormatAppointments = async () => {
      try {
        // Fetch appointments
  
        // Format appointments
        const formattedAppointments = await Promise.all(activeAppointments.map(async (appointment) => {
          try {
            const courseName = await GetCourseName(appointment.course);
            return FormatAppointmentsForCalendar(appointment, courseName);
          } catch (error) {
            console.error('Error fetching course name:', error);
            return null;
          }
        }));
  
        setCalendarEvents(formattedAppointments.filter(appointment => appointment !== null));
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
  
    if (user && user.id) {
      fetchAndFormatAppointments();
    }
  }, []); 

  if (localStorage.getItem('role') === 'Admin') {
    return <Navigate to="/error" />;
  }
  
  return (
    <Box display="grid" gridTemplateColumns="240px auto" height="100vh" >
      <NavBar activeItem="Calendar" user={user} />

      <Box display="flex" flexDirection="column" padding="16px" width="100%" bgcolor={"white"}>
        <Calendar events={calendarEvents} renderCell={(date) => renderCellContent(date, calendarEvents)} />
      </Box>
    </Box>
  );
};

export default HiveCalendar;
