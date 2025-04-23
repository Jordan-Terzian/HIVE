const PasswordReset = async(token, uid, new_password1, new_password2) => {
    console.log("UID: ", uid)
    console.log("token: ", token)
    console.log("password: ", new_password1)
    console.log("confirmpassword: ", new_password2)

    try {
        const response = await fetch(`http://127.0.0.1:8000/password/reset/confirm/${uid}/${token}/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
                uid: uid,
                new_password1: new_password1,
                new_password2: new_password2,
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
        }
        const data = await response.json();

        if (data.non_field_errors) {
            alert(data.non_field_errors);
        } else {
            return data
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

export default PasswordReset;