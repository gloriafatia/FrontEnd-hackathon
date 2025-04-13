import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulimi i dërgimit të të dhënave
    setTimeout(() => {
      setIsSubmitting(false);
      setStatusMessage("Mesazhi juaj u dërgua me sukses!");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <div className="contact-section bg-green-50 text-gray-800 py-10 px-4 md:px-10 lg:px-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-green-600">Na Kontaktoni</h2>
        <p className="text-lg mb-6 text-green-700">
          Kemi kënaqësinë të dëgjojmë mendimet dhe pyetjet tuaja. Plotësoni formularin më poshtë dhe do të ju kontaktojmë sa më shpejt të jetë e mundur.
        </p>

        {/* Formulari i kontaktit */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Emri juaj
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Mesazhi juaj
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              rows="5"
              required
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className={`w-full py-3 px-6 text-white rounded-md ${
                isSubmitting ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Dërgohet..." : "Dërgo Mesazhin"}
            </button>
          </div>

          {statusMessage && (
            <div
              className={`text-center mt-4 ${
                statusMessage.includes("suksess") ? "text-green-600" : "text-red-600"
              }`}
            >
              {statusMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
