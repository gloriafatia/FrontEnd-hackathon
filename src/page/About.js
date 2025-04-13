import React, { useState, useEffect } from "react";

const About = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    // Simulimi i marrjes së informacionit në mënyrë dinamike (mund ta zëvendësoni me fetch ose axios)
    const fetchInfo = async () => {
      const data = {
        name: "MerrBio",
        description:
          "MerrBio është një platformë bujqësore që ofron produkte të pastra dhe organike.",
        mission:
          "Të promovojmë bujqësinë e qëndrueshme dhe të mbrojmë mjedisin duke ofruar mundësi për të blerë produkte të natyrshme dhe të freskëta.",
        vision:
          "Krijimi i një të ardhmeje të gjelbër dhe të qëndrueshme për brezat që vijnë.",
      };

      setInfo(data);
    };

    fetchInfo();
  }, []);

  if (!info) return <div>Loading...</div>;

  return (
    <div className="about-section bg-green-100 text-gray-800 py-10 px-4 md:px-10 lg:px-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-green-600">{info.name}</h2>
        <p className="text-lg md:text-xl mb-6 text-green-700">{info.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-green-500 mb-2">Misioni</h3>
            <p className="text-gray-700">{info.mission}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-green-500 mb-2">Vizioni</h3>
            <p className="text-gray-700">{info.vision}</p>
          </div>
        </div>

        <div className="mt-10">
          <button className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-300">
            Më shumë informacione
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
  