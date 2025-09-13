import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ViewSupports() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [support, setSupport] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSupport = async () => {
    try {
      const res = await fetch(`http://localhost:5000/supports/${id}`);
      const data = await res.json();
      if (res.ok) {
        setSupport(data);
      } else {
        setSupport(null);
      }
    } catch (err) {
      console.error(err);
      setSupport(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupport();
  }, [id]);

  const markAsRead = async () => {
    try {
      const res = await fetch(`http://localhost:5000/supports/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Résolu" }),
      });
      if (res.ok) fetchSupport();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-2xl">Chargement du message de support...</h1>
      </div>
    );

  if (!support)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-2xl">Message de support introuvable</h1>
      </div>
    );

  return (
    <div className="flex items-center min-h-screen bg-gray-900 text-white p-10">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-3xl mx-auto">
        <p className="mb-4 p-4 bg-gray-900 rounded">
          <span className="font-bold text-lg">Objet :</span> {support.subject}
        </p>

        <div className="mb-4 p-4 bg-gray-900 rounded">
          <span className="font-bold text-lg">Message :</span>
          <p className="mt-2">{support.message}</p>
        </div>

        <p className="mb-4 p-4 bg-gray-900 rounded">
          <span className="font-bold text-lg">Statut :</span>{" "}
          <span className="capitalize">{support.status}</span>
        </p>

        <p className="mb-4 p-4 bg-gray-900 rounded text-gray-400">
          <span className="font-semibold">Créé le :</span>{" "}
          {new Date(support.createdAt).toLocaleString()}
        </p>

        {/* Boutons */}
        <div className="flex gap-4 mt-4">
          {support.status === "unread" && (
            <button
              onClick={markAsRead}
              className="bg-green-600 px-6 py-2 rounded hover:bg-green-700"
            >
              Marquer comme lu
            </button>
          )}

          <button
            onClick={() => navigate("/portal/admin/supports")}
            className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
}