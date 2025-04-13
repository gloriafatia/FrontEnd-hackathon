import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import video from '../assets/Video.mp4';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/krye");
    }
  }, [navigate]);

  return (
    <div className="relative w-full h-screen">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        loop
        muted
        autoPlay
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Bold and Dynamic Text Styling */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h2
          className="text-white text-4xl md:text-6xl font-extrabold tracking-wider uppercase"
          style={{
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)', 
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: '0.1em',
            animation: 'fadeIn 2s ease-out'
          }}
        >
          Nga toka jone, ne tryezen tuaj
        </h2>
      </div>
    </div>
  );
};

export default Home;
