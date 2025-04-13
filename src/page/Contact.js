import React from "react";

const Contact = () => {
  return (
    <div className="contact-section bg-green-50 text-gray-800 py-10 px-4 md:px-10 lg:px-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-green-600">Na Kontaktoni</h2>
        <p className="text-lg mb-10 text-green-700">
          Mund të na kontaktoni në informacionet e mëposhtme. Jemi gjithmonë të hapur për pyetje, sugjerime apo bashkëpunime.
        </p>

        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg text-left space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-green-600">Email</h3>
            <p className="text-gray-700">info@merrbio.al</p>
            <p className="text-gray-700">support@merrbio.al</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-green-600">Numra Kontakti</h3>
            <p className="text-gray-700">+355 68 123 4567</p>
            <p className="text-gray-700">+355 69 765 4321</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-green-600">Adresa</h3>
            <p className="text-gray-700">
              Rr. Dëshmorët e Kombit, Pallati 7, Tiranë, Shqipëri
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
