import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { HiLanguage } from "react-icons/hi2"; // Optional: Add an icon for visual flair

const LANGUAGES = [
  "English",
  "Hindi",
  "Telugu",
  "French",
  "German",
  "Japanese",
  "Chinese",
  "Russian",
  "Arabic",
  "Portuguese",
];

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();

  // Initialize state with user's existing data
  const [name, setName] = useState(authUser.fullName || "");
  const [bio, setBio] = useState(authUser.bio || "");
  const [language, setLanguage] = useState(
    authUser.preferredLanguage || "English"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      fullName: name,
      bio: bio,
      preferredLanguage: language,
    };

    if (!selectedImg) {
      await updateProfile(updateData);
      navigate("/");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ ...updateData, profilePic: base64Image });
      navigate("/");
    };
  };

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center backdrop-blur-md">
      <div className="w-5/6 max-w-2xl flex items-center justify-between max-sm:flex-col-reverse text-gray-300 backdrop-blur-2xl border-2 border-gray-600 rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-10 flex-1"
        >
          <h3 className="text-lg font-semibold">Profile Details</h3>

          {/* Image Upload Input */}
          <input
            onChange={(e) => setSelectedImg(e.target.files[0])}
            type="file"
            accept=".jpeg, .png, .jpg"
            id="image"
            hidden
          />
          <label
            htmlFor="image"
            className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors"
          >
            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : assets.avatar_icon
              }
              alt=""
              className={`w-12 h-12 object-cover rounded-full border border-gray-500`}
            />
            <p className="text-sm">Change Profile Photo</p>
          </label>

          {/* Name Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 ml-1">Full Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Your name"
              className="p-2 bg-black/20 border-2 border-gray-600 rounded-md focus:border-violet-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Language Selector */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 ml-1 flex items-center gap-1">
              <HiLanguage /> Preferred Language (for AI Translation)
            </label>
            <select
              onChange={(e) => setLanguage(e.target.value)}
              value={language}
              className="p-2 bg-black/20 border-2 border-gray-600 rounded-md focus:border-violet-500 focus:outline-none transition-colors cursor-pointer"
            >
              {LANGUAGES.map((lang) => (
                <option
                  key={lang}
                  value={lang}
                  className="bg-gray-800 text-white"
                >
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Bio Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 ml-1">Bio</label>
            <textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              rows={3}
              placeholder="Write a short bio..."
              required
              className="p-2 bg-black/20 border-2 border-gray-600 rounded-md focus:border-violet-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="text-white p-2 mt-2 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Save Changes
          </button>
        </form>

        {/* Right Side Image Preview */}
        <div className="flex items-center justify-center p-6 max-sm:w-full">
          <img
            src={
              selectedImg
                ? URL.createObjectURL(selectedImg)
                : authUser?.profilePic || assets.logo_icon
            }
            alt="Profile Preview"
            className="w-40 h-40 object-cover rounded-full border-4 border-gray-700 shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
