import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImg) {
      await updateProfile({ fullName: name, bio });
      navigate("/");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio });
      navigate("/");
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e215d] via-[#282142] to-[#4b2067] bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-2xl shadow-2xl bg-white/10">
        {/* ------------left side profile update */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-10 flex-1"
        >
          <h3 className="text-lg font-semibold text-white mb-2">Profile Details</h3>
          <label
            htmlFor="avatar"
            className="flex items-center cursor-pointer gap-3"
          >
            <input
              type="file"
              onChange={(e) => setSelectedImg(e.target.files[0])}
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : authUser.profilePic || assets.avatar_icon
              }
              className={`w-16 h-16 object-cover border-4 border-white/30 shadow-lg ${selectedImg && "rounded-full"}`}
              alt=""
            />
            <span className="text-sm text-white/80">Upload profile image</span>
          </label>

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder="Your name "
            className="p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white/10 text-white placeholder-gray-300 transition"
          />
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write Profile bio"
            required
            rows={4}
            className="p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white/10 text-white placeholder-gray-300 transition"
          ></textarea>
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer shadow-md hover:scale-105 transition"
          >
            Save
          </button>
        </form>
        {/* ----------right side only image */}
        <img
          src={selectedImg ? URL.createObjectURL(selectedImg) : authUser.profilePic || assets.logo_icon}
          alt=""
          className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 border-4 border-white/30 shadow-lg object-cover`}
        />
      </div>
    </div>
  );
};

export default Profile;
