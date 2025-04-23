import React, { useEffect, useState } from "react";
import NavBar from "../../components/molecules/navBar";
import { Box, Typography } from "@mui/material";
import { useUser } from "../../contexts/userContext";
import OpenReports from "../../API/openReports";
import OpenReportCard from "../../components/molecules/openReportCard";
import StudentAppointmentCardContainter from "../../styles/studentAppointmentCardContainer";
import { Navigate } from "react-router-dom";

const ReportDashboard = () => {
  const { user } = useUser();
  const [reports, setReports] = useState([]);

  // Fetch open reports
  useEffect(() => {
    OpenReports()
      .then(data => setReports(data))
      .catch(error => console.error("Error fetching reports:", error));
  }, []);

  if (localStorage.getItem('role') !== 'Admin') {
    return <Navigate to="/error" />;
  }


  return (
    <Box display="grid" gridTemplateColumns="240px 84% 1px auto" height="100vh">
      <NavBar activeItem="Reports" user={user} />

      <Box display="flex" flexDirection="column" padding="16px" width="100%">
        <Box mt={2}>
          <Typography variant="h6">Open Reports</Typography>
          <Box mt={2} display="flex" flexDirection="row" flexWrap={"wrap"} >
            {reports.length > 0 ? (
              reports.map(report => (
                <StudentAppointmentCardContainter key={report.id}>
                  <OpenReportCard report={report}/>
                </StudentAppointmentCardContainter>
              ))
            ) : (
              <Typography variant="subtitle1" align="center" style={{ width: "100%" }}>
                No reports to show
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ReportDashboard;
