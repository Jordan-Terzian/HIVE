// API/registerAPI.js

import GetCoursesId from './getCoursesId';
import Login from './loginRequest';
import { UploadTutorDocuments } from './uploadTutorFile';


export const registerAPI = async (registerDetails, bio, profilePicture, navigate, fetchUser, price) => {

    if (registerDetails.role === 'Student') {

        try {
            // Retrieve course IDs
            const courses = await GetCoursesId(registerDetails.selectedSubjects);

            // Initialize a FormData object
            const formData = new FormData();

            // Append string data to formData
            formData.append('first_name', registerDetails.firstName);
            formData.append('last_name', registerDetails.lastName);
            formData.append('email', registerDetails.email);
            formData.append('password', registerDetails.password);
            formData.append('phone_number', registerDetails.phoneNumber);
            formData.append('time_zone', 'AEST');
            formData.append('address', registerDetails.streetAddress);
            formData.append('suburb', registerDetails.suburb);
            formData.append('state', registerDetails.state);
            formData.append('country', registerDetails.country.value);
            formData.append('postcode', registerDetails.postcode);
            formData.append('date_of_birth', registerDetails.selectedDate);
            formData.append('gender', registerDetails.gender);
            formData.append('role', registerDetails.role);
            formData.append('bio', bio);
            formData.append('year_of_schooling', registerDetails.academicYear ? registerDetails.academicYear.value : '');

            // Append JSON data to formData
            courses.forEach(course => {
                formData.append('courses', course);
            });

            // Append file to formData
            if (profilePicture) {
                formData.append('profile_picture', profilePicture, profilePicture.name);
            }

            // API call for registration
            const response = await fetch('http://127.0.0.1:8000/register/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to register: ${JSON.stringify(errorData)}`);
            }

            const responseData = await response.json();

            Login(registerDetails.email, registerDetails.password, navigate, fetchUser);


            return responseData;

        } catch (error) {
            console.error('Registration error: ', error);
            throw error;
        }
    } else if (registerDetails.role === 'Tutor') {
        // Retrieve course IDs
        const courses = await GetCoursesId(registerDetails.selectedSubjects);

        // Initialize a FormData object
        const formData = new FormData();

        // Append string data to formData
        formData.append('first_name', registerDetails.firstName);
        formData.append('last_name', registerDetails.lastName);
        formData.append('email', registerDetails.email);
        formData.append('password', registerDetails.password);
        formData.append('phone_number', registerDetails.phoneNumber);
        formData.append('time_zone', 'AEST');
        formData.append('address', registerDetails.streetAddress);
        formData.append('suburb', registerDetails.suburb);
        formData.append('state', registerDetails.state);
        formData.append('country', registerDetails.country.value);
        formData.append('postcode', registerDetails.postcode);
        formData.append('date_of_birth', registerDetails.selectedDate);
        formData.append('gender', registerDetails.gender);
        formData.append('role', registerDetails.role);
        formData.append('bio', bio);
        formData.append('year_of_schooling', registerDetails.academicYear ? registerDetails.academicYear.value : '');
        formData.append('tutor_details_experience', registerDetails.experience);
        formData.append('tutor_details_price_per_hour', parseFloat(price.substring(1)).toFixed(2).toString());
               
        // Append JSON data to formData
        courses.forEach(course => {
            formData.append('courses', course);
        });

        // Append file to formData
        if (profilePicture) {
            formData.append('profile_picture', profilePicture, profilePicture.name);
        }
        
        // API call for registration
        const response = await fetch('http://127.0.0.1:8000/register/tutor/', {
            method: 'POST',
            body: formData,

        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to register: ${JSON.stringify(errorData)}`);
        }

        const responseData = await response.json();

        await Login(registerDetails.email, registerDetails.password, navigate, fetchUser);
        await UploadTutorDocuments(registerDetails.files);
        await fetchUser();

        return responseData;

    };
}


