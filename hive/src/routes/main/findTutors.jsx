import React, { useState, useEffect } from "react";
import NavBar from "../../components/molecules/navBar";
import { Box } from "@mui/material";
import { useUser } from "../../contexts/userContext";
import TutorCard from "../../components/molecules/tutorCard";
import FilterBy from "../../components/organisms/filterBar";
import GetTutors from "../../API/getTutors";
import TutorCardContainer from "../../styles/tutorCardContainer";
import { GetCourseId } from "../../API/getCoursesId";
import { Navigate } from 'react-router-dom';

const FindTutors = () => {
  const { user } = useUser();
  const [tutors, setTutors] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedCourseIds, setSelectedCourseIds] = useState([]);

  useEffect(() => {
    GetTutors()
      .then(data => setTutors(data))
      .catch(error => console.error("Error fetching tutors:", error));
  }, []);


  useEffect(() => {
    if (selectedSubject) {
      GetCourseId(selectedSubject)
        .then(id => {
          if (id) setSelectedCourseIds([id]);
          else setSelectedCourseIds([]);
        })
        .catch(error => console.error("Error fetching course ID:", error));
    } else {
      setSelectedCourseIds([]);
    }
  }, [selectedSubject]);

  // Filter tutors

  const filteredTutors = tutors.filter(tutor => {
    const matchesCountry = !selectedCountry || tutor.country === selectedCountry.value;
    const matchesRating = !selectedRating || tutor.tutor_details?.average_rating >= selectedRating.value;
    const matchesSubject = !selectedCourseIds.length || selectedCourseIds.some(id => tutor.courses.includes(id));

    return matchesCountry && matchesRating && matchesSubject;
  });

  if (localStorage.getItem('role') !== 'Student') {
    return <Navigate to="/error" />;
  }


  return (
    <Box display="grid" gridTemplateColumns="240px 86% 1px auto" height="100vh">
      <NavBar activeItem="Find Tutors" user={user} />

      {/* Main content container */}
      <Box display="flex" flexDirection="column" padding="16px">

        {/* Filter bar */}
        <Box mb={2} >
          <FilterBy
            selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}
            selectedRating={selectedRating} setSelectedRating={setSelectedRating}
            selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}
          />
        </Box>

        {/* Grey line */}
        <Box height="1px" bgcolor="grey" width="100%" mb={2} />

        {/* Tutors list */}
        <Box width="100%">
          <Box mt={2} display="flex" flexWrap="wrap" justifyContent="flex-start">
            {filteredTutors.map((tutor, index) => (
              <TutorCardContainer key={index}>
                <TutorCard tutor={tutor} currentTab="Find Tutors" tutorID={tutor.id} />
              </TutorCardContainer>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FindTutors;
