// StoryAvatar.jsx
import React from "react";

const StoryAvatar = ({ user, onClick }: any) => (
  <div className="flex flex-col items-center">
    <button onClick={() => onClick(user)} className="group relative">
      <img
        src={user.profilepic}
        alt={user.username}
        className="w-16 h-16 object-cover rounded-full border-2 border-blue-500 p-0.5 transition-all duration-300 ease-in-out transform group-hover:scale-105"
      />
      {
        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full"></span>
      }
    </button>
    <span className="mt-1 inline-block leading-tight">{user.username}</span>
  </div>
);

export default StoryAvatar;
