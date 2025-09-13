import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { getUser } from "../../utils/auth";

const AddMessageInGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fake upload (replace with cloudinary / S3 later)
    const uploadedFiles = files.map((f) => ({
      fileName: f.name,
      fileUrl: URL.createObjectURL(f),
    }));

    const newMessage = {
      groupId: id,
      sender: getUser()._id,
      title,
      content,
      files: uploadedFiles || "null",
    };

    try {
      const res = await fetch("http://localhost:5000/api/group-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });

      console.log(res);

      if (!res.ok) throw new Error("Failed to send message");

      navigate(`/portal/admin/viewgroup/${id}`);
    } catch (err) {
      console.error("Error creating message:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
      >
        {/* Send Group Message */}
        <h2 className="text-xl font-bold mb-4">Envoyer un message de groupe</h2>

        <input
          type="text"
          // Message Title
          placeholder="Titre du message"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
        />

        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="bg-black-800 quill-dark text-black rounded h-100 mb-5"
        />
        <br />

        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="block mt-5 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded w-full"
        >
          {/* Send */}
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default AddMessageInGroup;