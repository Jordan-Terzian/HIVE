const GetStudentProfile = async (id) => {
    const url = `http://127.0.0.1:8000/profile/user/id/${id}/`;
    
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    };
  
    try {
      // Make the fetch request
      const response = await fetch(url, options);
  
      // Check for a successful response
      if (!response.ok) {
        throw new Error(`Network response was not ok ${response.statusText}`);
      }
  
      // Parse and return the JSON from the response
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }
  
export default GetStudentProfile;