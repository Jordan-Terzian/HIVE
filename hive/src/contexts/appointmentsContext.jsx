import React, { createContext, useState, useEffect, useContext } from 'react';

export const AppointmentsContext = createContext();

export const AppointmentsProvider = ({ children }) => {
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [activeAppointments, setActiveAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      
      // Fetch pending appointments
      const pendingResponse = await fetch(`http://127.0.0.1:8000/user/appointments/pending`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!pendingResponse.ok) {
        throw new Error('Failed to fetch pending appointments');
      }

      const pendingData = await pendingResponse.json();
      setPendingAppointments(pendingData);

      // Fetch past appointments
      const pastResponse = await fetch(`http://127.0.0.1:8000/user/appointments/past`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!pastResponse.ok) {
        throw new Error('Failed to fetch past appointments');
      }

      const pastData = await pastResponse.json();
      setPastAppointments(pastData);

      // Fetch past appointments
      const activeResponse = await fetch(`http://127.0.0.1:8000/user/appointments/active`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!activeResponse.ok) {
        throw new Error('Failed to fetch past appointments');
      }

      const activeData = await activeResponse.json();
      setActiveAppointments(activeData);

    } catch (error) {
      console.error("Error fetching appointments: ", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <AppointmentsContext.Provider value={{ pendingAppointments, pastAppointments, activeAppointments, fetchAppointments }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (!context) throw new Error("useAppointments must be used within an AppointmentsProvider");
  return context;
};
