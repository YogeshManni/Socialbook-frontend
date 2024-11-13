// Stories.jsx
import React, { useContext, useEffect, useState } from "react";
import StoryAvatar from "./storyavatar";
import StoryUploader from "./storiesuploader";
import StoryViewer from "./storyviewer";

import { ChatContext } from "../../App";

const Stories = () => {
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const { stories } = useContext<any>(ChatContext);

  return (
    <div className="p-4">
      <div className="flex">
        <StoryUploader />
        <div className="flex space-x-4">
          {stories &&
            stories.length > 0 &&
            stories.map((story: any) => (
              <StoryAvatar
                key={story.id}
                user={story}
                onClick={() => {
                  setSelectedStory(story);
                }}
              />
            ))}
        </div>
      </div>
      {selectedStory && (
        <StoryViewer
          stories={selectedStory || []}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </div>
  );
};

export default Stories;
