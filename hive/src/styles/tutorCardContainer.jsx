import styled from 'styled-components';

const TutorCardContainer = styled.div`
  width: 100%; // Default for mobile screens
  margin-bottom: 16px;
  margin-right: 45px; // added margin right for separation

  @media (min-width: 600px) { // Slightly larger mobile screens and up
    width: calc(50% - 24px); // considering 16px margin right and 8px additional for flexibility
  }

  @media (min-width: 1199px) { // Tablet and larger screens
    width: calc(33.33% - 24px);
  }

  @media (min-width: 1200px) { // Desktop and up
    width: calc(25% - 24px);
  }
`;

export default TutorCardContainer;
