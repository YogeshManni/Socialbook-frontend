// StoryViewer.jsx
import React, { useEffect, useState } from "react";
import { getVideoDuration } from "../../helpers/helper";
import { Avatar } from "antd";

const StoryViewer = ({ stories, onClose }: any) => {
  const [duration, setDuration] = useState<any>(5000);
  const [progress, setProgress] = useState(0);

  const setTimer = (dr: number) => {
    return setTimeout(() => {
      onClose();
    }, dr);
  };

  useEffect(() => {
    var timer: any = null;
    const getDuration = async () => {
      try {
        if (stories.type === "video") {
          const _duration: any = await getVideoDuration(stories.img);

          timer = setTimer(Math.floor(_duration * 1000));

          setDuration(Math.floor(_duration * 1000));
          setProgress(0);
        } else {
          timer = setTimer(5000);
          setDuration(5000);
          setProgress(0);
        }
      } catch (err) {}
    };
    getDuration();

    return () => clearTimeout(timer);
  }, [stories, onClose]);

  useEffect(() => {
    // Start the progress bar animation
    const totalIntervals = duration / 100;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / totalIntervals;
        return newProgress >= 100 ? 100 : newProgress; // Cap progress at 100%
      });
    }, 100); // Run the interval every 100ms

    if (progress >= 100) {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Cleanup interval on unmount or when progress completes
  }, [duration, progress]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex pt-5 justify-center z-50">
      <div className="relative">
        {/* Header with Avatar and Username */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-3 items-center">
            <div className="w-8 h-6 cursor-pointer">
              <Avatar
                size={50}
                className="mb-7"
                src={stories.profilepic && stories.profilepic}
              />
            </div>
            <h2 className="font-semibold ms-5 mt-5 text-white">
              {stories.username}
            </h2>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute top-18 left-0 w-full h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500"
            style={{
              width: `${progress}%`,
              transition: "width 0.1s linear",
            }}
          ></div>
        </div>

        {/* Image or Video Display */}
        {!(stories.type === "video") ? (
          <img
            src={stories.img}
            alt="Story"
            className="max-w-full max-h-full object-contain rounded-lg"
            style={{ maxHeight: "70vh", maxWidth: "70vw" }} // Limits size to viewport but keeps aspect ratio
          />
        ) : (
          <div className="h-auto">
            <video
              autoPlay
              controls
              className="object-cover"
              style={{ maxHeight: "70vh", maxWidth: "70vw" }}
            >
              <source src={stories.img} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        <span className="text-white font-bold"> {stories.caption}</span>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default StoryViewer;
