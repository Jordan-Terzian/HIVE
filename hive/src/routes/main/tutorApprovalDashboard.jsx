import React, { useEffect, useState } from "react";
import NavBar from "../../components/molecules/navBar";
import { Box, Typography } from "@mui/material";
import { useUser } from "../../contexts/userContext";
import UnapprovedTutors from "../../API/unapprovedTutors";
import StudentAppointmentCardContainter from "../../styles/studentAppointmentCardContainer";
import TutorApprovalCard from "../../components/molecules/tutorApprovalCard";
import { useNavigate, Navigate } from "react-router-dom";


const TutorApprovalDashboard = () => {
  const { user } = useUser();
  const [tutors, setTutors] = useState([]);

  const navigate = useNavigate();

  // Fetch unapproved tutors
  useEffect(() => {
    UnapprovedTutors()
      .then(data => setTutors(data))
      .catch(error => console.error("Error fetching tutors:", error));
  }, []);

  if (localStorage.getItem('role') !== 'Admin') {
    return <Navigate to="/error" />;
  }

  return (
    <Box display="grid" gridTemplateColumns="240px 84% 1px auto" height="100vh">
      <NavBar activeItem="Tutor Approval" user={user} />

      <Box display="flex" flexDirection="column" padding="16px" width="100%">
        <Box mt={2}>
          <Typography variant="h6">Pending Approval</Typography>
          <Box mt={2} display="flex" flexDirection="row" flexWrap={"wrap"}>
            {tutors.length > 0 ? (
              tutors.map(tutor => (
                <StudentAppointmentCardContainter key={tutor.id}>
                  <TutorApprovalCard tutor={tutor} currentTab="Tutor Approval" navigate={navigate} />
                </StudentAppointmentCardContainter>
              ))
            ) : (
              <Typography variant="subtitle1" align="center" style={{ width: "100%" }}>
                No tutors awaiting approval
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TutorApprovalDashboard;
