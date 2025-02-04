import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ClientContext = createContext(null);

export const useClientContext = () => {
  return useContext(ClientContext);
};

export const ClientProvider = ({ children }) => {
  const [clientInfo, setClientInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientInfo = async () => {
      const token = localStorage.getItem('token'); // ✅ Get token from localStorage

      if (!token) {
        setError('No authentication token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://backend-client-dashboard.onrender.com/api/client-info', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClientInfo(response.data);
      } catch (error) {
        console.error('Error fetching client info:', error);
        setError(error.response?.data?.message || 'Failed to fetch client data.');
      } finally {
        setLoading(false);
      }
    };

    fetchClientInfo();
  }, []);

  return (
    <ClientContext.Provider value={{ clientInfo, setClientInfo, loading, error }}>
      {children}
    </ClientContext.Provider>
  );
};
