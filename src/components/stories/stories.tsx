// Stories.jsx
import React, { useEffect, useState } from "react";
import StoryAvatar from "./storyavatar";
import StoryUploader from "./storiesuploader";
import StoryViewer from "./storyviewer";
import { getUser } from "../../helpers/helper";
import { getStoriesfromDb } from "../../services/api";

const Stories = () => {
  const [stories, setStories] = useState<any>({});
  const [selectedStory, setSelectedStory] = useState<any>(null);

  useEffect(() => {
    const getStories = async () => {
      const _stories = await getStoriesfromDb(getUser().email);
      console.log(_stories);
      setStories(_stories.posts);
    };
    getStories();
  }, []);

  return (
    <div className="p-4">
      <div className="flex">
        <StoryUploader />
        <div className="flex space-x-4">
          {stories.length > 0 &&
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
