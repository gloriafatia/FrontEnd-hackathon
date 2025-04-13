import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/krye");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to the Homepage!</h1>
    </div>
  );
};

export default Home;
