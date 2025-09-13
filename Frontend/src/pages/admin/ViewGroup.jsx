import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser } from "../../utils/auth";

const ViewGroup = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [group, setGroup] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/groups/${id}`);
        const data = await res.json();
        setGroup(data);
      } catch (err) {
        console.error("Failed to fetch group:", err);
      }
    };

    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/group-messages/${id}`);
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/user/"+getUser()._id, {
          credentials: "include",
        });
        const data = await res.json();
        setCurrentUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchGroup();
    fetchMessages();
    fetchUser();
  }, [id]);

  if (!group || !currentUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-300">
        {/* Loading group... */}
        Chargement du groupe...
      </div>
    );
  }

  // Role checks
  const isAdmin = currentUser.role === "admin";
  const isMember = group.members?.some((m) => m._id === currentUser._id);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Top bar */}
      <div className="flex justify-between items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
        <h2 className="text-xl font-semibold">{group?.title || "Groupe"}</h2>

        {/* Send Message → Envoyer un message */}
        {(isAdmin || isMember) && (
          <button
            onClick={() => navigate(`/portal/admin/add-message/${id}`)}
            className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm"
          >
            Envoyer un message
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-gray-800 p-4 rounded-lg shadow-md w-full"
            >
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>{msg.sender?.name || "Inconnu"}</span> {/* Unknown → Inconnu */}
                <span>{new Date(msg.createdAt).toLocaleString()}</span>
              </div>
              {msg.title && (
                <h3 className="text-lg font-bold text-green-400">{msg.title}</h3>
              )}
              <div
                className="mt-2 text-gray-200"
                dangerouslySetInnerHTML={{ __html: msg.content }}
              />
              {msg.files && msg.files.length > 0 && (
                <div className="mt-2 space-y-1">
                  {msg.files.map((file, idx) => (
                    <a
                      key={idx}
                      href={file.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-blue-400 hover:underline text-sm"
                    >
                      📎 {file.fileName}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          // No messages yet
          <p className="text-gray-400 text-center">Aucun message pour l’instant</p>
        )}
      </div>
    </div>
  );
};

export default ViewGroup;