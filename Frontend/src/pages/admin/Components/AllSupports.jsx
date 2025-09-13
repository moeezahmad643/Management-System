import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaCheckCircle } from "react-icons/fa";

export default function AllSupports(props) {
  const [supports, setSupports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  // Fetch supports
  const fetchSupports = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/supports?limit=${props.limit}`
      );
      const data = await res.json();

      if (res.ok) {
        setSupports(data);
      } else {
        setError(data.message || "Échec du chargement des messages de support"); // Failed to fetch supports
      }
    } catch (err) {
      console.error(err);
      setError("Échec du chargement des messages de support"); // Failed to fetch supports
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupports();
  }, []);

  // Mark as Read
  const markAsRead = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/supports/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "read" }),
      });
      if (res.ok) {
        fetchSupports();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section
      className={
        props.width == "half" ? "w-1/2 pb-6 px-2 lg:w-full" : "w-full pb-6 px-2"
      }
    >
      <div className="w-full rounded-lg overflow-hidden bg-gray-900 text-white border border-gray-700">
        {/* Dropdown Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center px-6 py-4 bg-gray-800 hover:bg-gray-700"
        >
          <h1 className="text-xl font-bold">
            Tous les messages de support {/* All Support Messages */}
          </h1>
          <span>{isOpen ? "▲" : "▼"}</span>
        </button>

        {isOpen && (
          <div className="p-6">
            {loading ? (
              <p className="text-center">
                Chargement des supports... {/* Loading supports... */}
              </p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="p-3 text-left">Sujet {/* Subject */}</th>
                    <th className="p-3 text-left">Message</th>
                    <th className="p-3 text-left">Statut {/* Status */}</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {supports.map((support) => {
                    let windowWidth = window.innerWidth;
                    const showIcons = windowWidth <= 1000;

                    return (
                      <tr
                        key={support._id}
                        className="border-t border-gray-700"
                      >
                        <td className="p-3">{support.subject}</td>
                        <td className="p-3 truncate max-w-xs">
                          {support.message}
                        </td>
                        <td className="p-3 capitalize">{support.status}</td>
                        <td className="p-3 flex gap-2 justify-center">
                          <button
                            onClick={() =>
                              navigate(`/portal/admin/supports/${support._id}`)
                            }
                            className="bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700"
                          >
                            {showIcons ? <FaEye /> : "Voir"} {/* View */}
                          </button>

                          {support.status === "unread" && (
                            <button
                              onClick={() => markAsRead(support._id)}
                              className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                            >
                              {showIcons ? (
                                <FaCheckCircle />
                              ) : (
                                "Marquer comme lu" /* Mark as Read */
                              )}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {/* More Button */}
            <div
              className={
                props.moreButton
                  ? "flex justify-center mt-6"
                  : "flex justify-center mt-6 hidden"
              }
            >
              <button
                onClick={() => navigate(`/portal/admin/supports`)}
                className="w-screen bg-indigo-600 px-6 py-2 rounded font-semibold hover:bg-indigo-700"
              >
                Charger plus {/* Load More */}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}