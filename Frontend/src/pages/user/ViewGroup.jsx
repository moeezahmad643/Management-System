// frontend/src/pages/ViewGroup.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { io } from "socket.io-client";
import { getUser } from "../../utils/auth";

const SOCKET_URL = "http://localhost:5000"; // Backend Node uniquement

const ViewGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = getUser() || null;

  const [group, setGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [sending, setSending] = useState(false);

  const socketRef = useRef(null);
  const scrollRef = useRef(null);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const isUserNearBottom = () => {
    const el = scrollRef.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < 150;
  };

  const scrollToBottom = (behavior = "smooth") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  };

  // Convertir base64 en Blob
  const base64ToBlob = (base64Data, contentType = "application/octet-stream") => {
    let rawBase64 = base64Data;
    if (base64Data.startsWith("data:")) {
      const parts = base64Data.split(",");
      rawBase64 = parts[1] || "";
    }
    const byteString = atob(rawBase64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: contentType });
  };

  // Télécharger un Blob
  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "téléchargement";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  };

  // Télécharger depuis une URL distante
  const fetchAndDownload = async (url, filename) => {
    try {
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      downloadBlob(blob, filename);
    } catch (err) {
      console.warn("Échec du téléchargement, ouverture dans un nouvel onglet :", err);
      window.open(url, "_blank", "noopener");
    }
  };

  // Déterminer si un fichier est prévisualisable
  const isPreviewable = (f) => {
    const t = (f.fileType || "").toString().toLowerCase();
    if (t.startsWith("image") || t.startsWith("video") || t === "image" || t === "video") return true;
    if (f.fileUrl && /\.(jpe?g|png|gif|webp|svg|mp4|webm|ogg)(\?|$)/i.test(f.fileUrl)) return true;
    return false;
  };

  // Gestion clic sur fichier
  const handleFileClick = async (e, f) => {
    const previewable = isPreviewable(f);

    if (f.fileUrl) {
      if (previewable) return;
      e.preventDefault();
      await fetchAndDownload(f.fileUrl, f.fileName);
      return;
    }

    if (f.fileData) {
      const mime = f.fileType || "application/octet-stream";
      if (previewable) {
        const dataUri = f.fileData.startsWith("data:")
          ? f.fileData
          : `data:${mime};base64,${f.fileData}`;
        window.open(dataUri, "_blank", "noopener");
        return;
      }
      e.preventDefault();
      try {
        const blob = base64ToBlob(f.fileData, mime);
        downloadBlob(blob, f.fileName);
      } catch (err) {
        console.error("Échec du téléchargement base64 :", err);
        const dataUri = f.fileData.startsWith("data:")
          ? f.fileData
          : `data:${mime};base64,${f.fileData}`;
        window.open(dataUri, "_blank", "noopener");
      }
      return;
    }
  };

  // Récupérer groupe et messages
  useEffect(() => {
    let mounted = true;

    const fetchGroup = async () => {
      try {
        const res = await fetch(`${SOCKET_URL}/api/groups/${id}`);
        const data = await res.json();
        if (res.ok && mounted) setGroup(data);
      } catch {
        if (mounted) setError("Impossible de charger le groupe");
      }
    };

    const fetchMessages = async () => {
      try {
        const res = await fetch(`${SOCKET_URL}/api/group-messages/${id}`);
        const data = await res.json();
        if (res.ok && mounted) {
          const sorted = Array.isArray(data)
            ? data.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            : [];
          setMessages(sorted);
          setTimeout(() => scrollToBottom("auto"), 60);
        }
      } catch {
        if (mounted) setError("Impossible de charger les messages");
      }
    };

    fetchGroup();
    fetchMessages();
    return () => {
      mounted = false;
    };
  }, [id]);

  // Gestion socket
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    const socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    const joinRoom = () => {
      if (id) socket.emit("joinGroup", id);
    };

    socket.on("connect", joinRoom);
    socket.on("reconnect", joinRoom);

    const handleNew = (msg) => {
      if (typeof msg.sender === "string" && currentUser) {
        if (msg.sender === currentUser._id) {
          msg.sender = {
            _id: currentUser._id,
            name: currentUser.name || currentUser.email,
          };
        }
      }

      setMessages((prev) => {
        if (prev.some((m) => m._id === msg._id)) return prev;
        return [...prev, msg];
      });

      if (isUserNearBottom() || msg.sender?._id === currentUser?._id) {
        setTimeout(() => scrollToBottom("smooth"), 40);
        setHasNewMessages(false);
      } else {
        setHasNewMessages(true);
      }
    };

    socket.on("newGroupMessage", handleNew);
    socket.on("connect_error", (err) => console.warn("Erreur socket:", err));

    return () => {
      socket.off("newGroupMessage", handleNew);
      socket.off("connect_error");
      socket.off("connect");
      socket.off("reconnect");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [id, currentUser]);

  useEffect(() => {
    if (isUserNearBottom()) setTimeout(() => scrollToBottom("smooth"), 30);
  }, [messages]);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files || []));
  };

  const convertFilesToDataUri = (files) => {
    return Promise.all(
      files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () =>
              resolve({
                fileName: file.name,
                base64: reader.result,
                fileType: file.type,
              });
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    );
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setError("");
    if (!currentUser?._id) return setError("Connexion requise.");
    if (!content.trim() && !files.length)
      return setError("Message ou fichier requis.");

    setSending(true);
    try {
      const preparedFiles = await convertFilesToDataUri(files);
      const payload = { groupId: id, sender: currentUser._id, content, files: preparedFiles };

      const res = await fetch(`${SOCKET_URL}/api/group-messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errBody = null;
        try {
          errBody = await res.json();
        } catch(err) {
          console.error("Erreur parsing JSON:", err);
        }
        const serverMsg = errBody?.message || errBody?.error || `Erreur serveur ${res.status}`;
        throw new Error(serverMsg);
      }

      const savedMessage = await res.json();
      if (!socketRef.current || !socketRef.current.connected) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === savedMessage._id)) return prev;
          return [...prev, savedMessage];
        });
        setTimeout(() => scrollToBottom("smooth"), 40);
      }

      setContent("");
      setFiles([]);
    } catch (err) {
      console.error("Erreur envoi:", err);
      setError(err.message || "Impossible d’envoyer le message.");
    } finally {
      setSending(false);
    }
  };

  const isAdmin = currentUser?.role === "admin";
  const isMember = group?.members?.some((m) =>
    typeof m === "object" ? m._id === currentUser?._id : m === currentUser?._id
  );
  const canSend = group?.twoWay ? isMember || isAdmin : isAdmin;

  if (!group) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-300">
        Chargement du groupe...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Barre du haut */}
      <div className="flex justify-between items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div>
          <h2 className="text-xl font-semibold">{group.title}</h2>
          <p className="text-sm text-gray-400">{group.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-400">Membres: {group.members?.length || 0}</div>
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          >
            Retour
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-h-full"
        onScroll={() => isUserNearBottom() && setHasNewMessages(false)}
      >
        {messages.length === 0 ? (
          <p className="text-center text-gray-400">Aucun message pour le moment</p>
        ) : (
          messages.map((msg) => {
            const mine = msg.sender?._id === currentUser?._id;
            return (
              <div
                key={msg._id}
                className={`max-w-3xl mx-auto w-full ${mine ? "flex justify-end" : "flex justify-start"}`}
              >
                <div
                  className={`rounded-lg p-4 shadow-md w-fit max-w-[85%] ${
                    mine ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-100"
                  }`}
                >
                  <div className="text-xs text-gray-300 mb-2">
                    {msg.sender?.name || msg.sender?.username || msg.sender?.email || "Inconnu"}
                  </div>

                  <div
                    className="prose prose-invert max-w-none mt-1 work-section"
                    dangerouslySetInnerHTML={{ __html: msg.content || "" }}
                  />

                  {msg.files?.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {msg.files.map((f, idx) =>
                        f.fileUrl ? (
                          <a
                            key={idx}
                            href={f.fileUrl}
                            onClick={(e) => handleFileClick(e, f)}
                            target={isPreviewable(f) ? "_blank" : undefined}
                            rel={isPreviewable(f) ? "noreferrer" : undefined}
                            className="block text-sm text-blue-300 hover:underline"
                            {...(!isPreviewable(f) ? { download: true } : {})}
                          >
                            📎 {f.fileName}
                          </a>
                        ) : f.fileData ? (
                          <a
                            key={idx}
                            href={`data:${f.fileType || "application/octet-stream"};base64,${f.fileData}`}
                            onClick={(e) => handleFileClick(e, f)}
                            className="block text-sm text-blue-300 hover:underline"
                            download={!isPreviewable(f) ? f.fileName : undefined}
                            target={isPreviewable(f) ? "_blank" : undefined}
                            rel={isPreviewable(f) ? "noreferrer" : undefined}
                          >
                            📎 {f.fileName}
                          </a>
                        ) : (
                          <div key={idx} className="text-sm text-gray-300">
                            📎 {f.fileName}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  <div className="text-right text-xs text-gray-400 mt-2">
                    {msg.createdAt && new Date(msg.createdAt).toLocaleString("fr-FR")}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Indicateur nouveaux messages */}
      {hasNewMessages && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
          <button
            onClick={() => {
              scrollToBottom();
              setHasNewMessages(false);
            }}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-sm shadow"
          >
            Nouveaux messages
          </button>
        </div>
      )}

      {/* Zone de saisie */}
      {canSend && (
        <form onSubmit={handleSend} className="bg-gray-800 border-t border-gray-700 p-4">
          <div className="max-w-4xl mx-auto space-y-3">
            <div className="bg-gray-900 border border-gray-700 rounded quill-dark">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={quillModules}
                placeholder="Écrire un message..."
              />
            </div>

            <div className="flex gap-3 items-center">
              <label className="cursor-pointer text-sm text-gray-300">
                <input type="file" multiple onChange={handleFileChange} className="hidden" />
                <span className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">
                  Joindre des fichiers
                </span>
              </label>

              {files.length > 0 && (
                <span className="text-sm text-gray-300">{files.length} fichier(s) sélectionné(s)</span>
              )}

              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setContent("");
                    setFiles([]);
                    setError("");
                  }}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                >
                  Effacer
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="px-4 py-1 bg-green-600 hover:bg-green-700 rounded text-sm"
                >
                  {sending ? "Envoi..." : "Envoyer"}
                </button>
              </div>
            </div>

            {error && <div className="text-red-400 text-sm">{error}</div>}
          </div>
        </form>
      )}
    </div>
  );
};

export default ViewGroup;