import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const isAuthenticated = false; // This will be handled with actual auth later
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Your Life Expectancy Dashboard</h1>
        <p>This is a placeholder for your life expectancy calculator.</p>
      </div>
      
      <div className="dashboard-content">
        <div className="calculator-card">
          <h2>Life Expectancy Calculator</h2>
          <p>Coming soon: Complete your profile to calculate your life expectancy.</p>
          <button className="dashboard-button">Start Assessment</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
