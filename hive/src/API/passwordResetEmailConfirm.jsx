const PasswordResetEmailConfirm = async(email) => {

    try {
        const response = await fetch('http://127.0.0.1:8000/password/reset/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
            })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();

        if (data.non_field_errors) {
            alert(data.non_field_errors);
        } else {
            return data;
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

export default PasswordResetEmailConfirm;