const Login = async (credentials, password, navigate, fetchUser) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/login/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: credentials,
                password: password,
            })
        });

        if (!response.ok) {
            // When the response is not ok, including 403 Forbidden, parse the error message
            const errorData = await response.json();
            if (errorData.detail) {
                // Display specific detail from the backend
                alert(errorData.detail);
            } else if (errorData.non_field_errors) {
                // Display non-field errors such as incorrect credentials
                alert(errorData.non_field_errors.join("\n"));
            } else {
                // Display other validation errors
                const errors = Object.keys(errorData).map((key) => `${key}: ${errorData[key].join(" ")}`);
                alert(errors.join("\n"));
            }
            navigate('/login');
            return;
        }

        // If the response is ok, process the data
        const data = await response.json();
        localStorage.setItem('token', data.access);
        localStorage.setItem('username', credentials);
        await fetchUser();

        // Redirect based on the role
        if (localStorage.getItem('role') === "Student") {
            navigate('/home/dashboard');
        } else if (localStorage.getItem('role') === 'Admin') {
            navigate('/tutor-approval-dashboard');
        } else {
            navigate('/home/tutor-dashboard');
        }

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        alert('There has been a problem with the login process. Please try again.');
    }
}

export default Login;
