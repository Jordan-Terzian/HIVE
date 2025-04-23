import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { ContainerStyle } from "./styles/ContainerStyle";
import LoginScreen from './routes/authScreens/loginScreen';
import RegisterScreen from './routes/authScreens/registerScreen';
import PasswordResetConfirmEmailScreen from './routes/authScreens/passwordResetConfirmEmailScreen';
import PasswordResetEmailSentScreen from './routes/authScreens/passwordResetEmailSentScreen';
import PasswordResetScreen from './routes/authScreens/passwordResetScreen';
import PersonalDetailsScreen from './routes/authScreens/personalDetailsScreen';
import LocationDetailsScreen from './routes/authScreens/locationDetailsScreen';
import AcademicDetailsScreen from './routes/authScreens/academicDetailsScreen';
import ProfileScreen from './routes/authScreens/profileScreen';
import Dashboard from './routes/main/dashboard'; 
import TutorDashboard from './routes/main/tutorDashboard';
import EditPersonalDetailsScreen from './routes/main/settings/editPersonalDetailsScreen';
import EditLocationDetailsScreen from './routes/main/settings/editLocationDetailsScreen';
import EditProfileScreen from './routes/main/settings/editProfileScreen';
import EditAcamdemicDetailsScreen from './routes/main/settings/editAcademicDetailsScreen';
import Notifications from './routes/main/notifications';
import TutorNotifications from './routes/main/tutorNotifications';
import FindTutors from './routes/main/findTutors';
import TutorProfile from './routes/main/tutorProfile';
import StudentProfile from './routes/main/studentProfile';
import Error from './routes/main/error';
import TermsConditions from './routes/main/termsConditions';
import TutorApprovalDashboard from './routes/main/tutorApprovalDashboard'
import ReportDashboard from './routes/main/reportDashboard';
import Message from './routes/main/message'
import HiveCalendar from './routes/main/calendar';
import ReportDetails from './routes/main/reportDetails';
import ProtectedRoute from './utils/protectedRoute';

function PasswordResetInfo() {
  const { uid, token } = useParams();

  return (
    <div>
      <p>Password Reset Confirmation</p>
      <p>UID: {uid}</p>
      <p>Token: {token}</p>
      {/* You can display confirmation messages or handle the confirmation logic here. */}
    </div>
  );
}

function App() {

  return (
    <div id="Container" style={ContainerStyle}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/password-reset-confirm-email" element={<PasswordResetConfirmEmailScreen />} />
          <Route path="/password-reset-email-sent" element={<PasswordResetEmailSentScreen />} />
          <Route path="/password-reset" element={<PasswordResetScreen />} />
          <Route path="/password/reset/confirm/:uid/:token/" component={PasswordResetInfo} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/register/personal-details" element={<PersonalDetailsScreen />} />
          <Route path="/register/location-details" element={<LocationDetailsScreen />} />
          <Route path="/register/academic-details" element={<AcademicDetailsScreen />} />
          <Route path="/register/profile" element={<ProfileScreen />} />
          <Route path="/home/dashboard" element={<ProtectedRoute component={Dashboard}/>} />
          <Route path="/home/tutor-dashboard" element={<ProtectedRoute component={TutorDashboard} />} />
          <Route path="/find-tutors" element={<ProtectedRoute component={FindTutors}/>} />
          <Route path="/tutor-approval-dashboard" element={<ProtectedRoute component={TutorApprovalDashboard} />} />
          <Route path="/report-dashboard" element={<ProtectedRoute component={ReportDashboard} />} />
          <Route path="/profile/tutor/:tutorId" element={<ProtectedRoute component={TutorProfile}/>} />
          <Route path="/profile/student/:student" element={<ProtectedRoute component={StudentProfile}/>} />
          <Route path="/report-details/:reportId" element={<ProtectedRoute component={ReportDetails} />} />
          <Route path="/notifications" element={<ProtectedRoute component={Notifications} />} />
          <Route path="/tutor-notifications" element={<ProtectedRoute component={TutorNotifications}/>} />
          <Route path="/messages/:userId" element={<ProtectedRoute component={Message}/>} />
          <Route path="/calendar" element={<ProtectedRoute component={HiveCalendar} />} />
          <Route path="/settings/edit-personal-details" element={<ProtectedRoute component={EditPersonalDetailsScreen} />} />
          <Route path="/settings/edit-location-details" element={<ProtectedRoute component={EditLocationDetailsScreen}/>} />
          <Route path="/settings/edit-profile" element={<ProtectedRoute component={EditProfileScreen}/>} />
          <Route path="/settings/edit-academic-details" element={<ProtectedRoute component={EditAcamdemicDetailsScreen}/>} />
          {/* Miscallaneous Pages */}
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
