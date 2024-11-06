// StoryUploader.jsx
import { message, Modal, Spin, Upload, UploadProps } from "antd";
import React, { useState } from "react";
import upload from "../../lib/upload";
import { getUser } from "../../helpers/helper";
import CreatePost from "../createpost/CreatePost";

const StoryUploader = () => {
  const [isOpen, setModalOpen] = useState<boolean>(false);

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="flex story mr-4">
      <div className="flex flex-col items-center">
        <button onClick={() => setModalOpen(true)} className="group relative">
          <img
            src={getUser().img}
            alt={getUser().username}
            className="object-cover w-16 h-16 rounded-full border-2  p-0.5 transition-all duration-300 ease-in-out transform group-hover:scale-105"
          />
        </button>
        <span className="mt-1 inline-block leading-tight">+ Upload</span>
      </div>

      {isOpen && (
        <Modal
          title={"Add Story"}
          open={true}
          okButtonProps={{ style: { backgroundColor: "#8b5cf6" } }}
          onCancel={() => setModalOpen(false)}
          width={800}
          height={500}
          footer={null}
          style={{ top: "10%" }}
        >
          <div className="mt-5 md:h-[700px] h-full ">
            <CreatePost isStory={true} setModalOpen={closeModal} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StoryUploader;
