import { useState } from "react";

export default function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Envoi en cours...");

    try {
      const res = await fetch("http://localhost:5000/supports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "Assistance du portail", // Sujet par défaut
        }),
      });

      if (res.ok) {
        setStatus("Votre message a été envoyé avec succès ✅");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Échec de l'envoi du message ❌");
      }
    } catch (error) {
      console.error(error);
      setStatus("Une erreur est survenue ❌");
    }
  };

  return (
    <div className="w-full">
      {/* Section Héro */}
      <section
        className="w-full relative flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/about.png')", // public/about.png
          backgroundSize: "cover",
          backgroundPosition: "top",
          minHeight: "30vh",
        }}
      >
        <div className=" bg-opacity-50 w-full h-full flex items-center justify-center">
          <h2 className="text-2xl md:text-4xl font-bold text-center px-6">
            N’hésitez pas à nous contacter
          </h2>
        </div>
      </section>

      {/* Formulaire de support */}
      <div className="lg:max-w-1/2 mx-auto py-20 mx-20 px-6">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
          Contacter le support
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Si vous rencontrez des problèmes, veuillez remplir ce formulaire et
          notre équipe d’assistance vous répondra rapidement.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 space-y-4"
        >
          <div>
            <label className="block text-gray-700 mb-1">Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Envoyer le message
          </button>
        </form>

        {status && (
          <p className="text-center mt-4 text-gray-700 font-medium">{status}</p>
        )}
      </div>
    </div>
  );
}