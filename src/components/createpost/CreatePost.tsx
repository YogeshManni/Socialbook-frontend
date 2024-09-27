import React, { useState, useEffect, useRef } from "react";

import {
  Avatar,
  Button,
  Col,
  message,
  Row,
  Spin,
  Steps,
  theme,
  Upload,
  UploadProps,
  Image,
} from "antd";
import { InboxOutlined, SmileOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { addPost } from "../../services/api";
import moment from "moment";
import { getUser } from "../../helpers/helper";
import upload from "../../lib/upload";
import Emoji from "../../helpers/picker";
import Input from "antd/es/input/Input";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [u_img, setImage]: any = useState("");
  const [dateTime, setDateTime]: any = useState("");
  const [imgName, setImgName] = useState("");
  const finalCaption = useRef("");
  const [user, setUser]: any = useState({});
  const [current, setCurrent] = useState(0);
  const [postType, setPostType] = useState("image");
  const [isuploading, setUploading] = useState(false);
  const navigate = useNavigate();

  {
    /* First Step to select content to upload*/
  }
  useEffect(() => {
    console.log("dsd");
    //initlaizing datetime for new post name
    if (!dateTime) setDateTime(String(moment().format()));
    setUser(getUser());
  }, []);

  const SelectContent = () => {
    const { Dragger } = Upload;

    function getImage(img: any, callback: any) {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    }

    // Set image data after uploading it to firebase
    function setImageData(file: any, url: string) {
      console.log(file);

      if (file) {
        console.log(dateTime);

        if (file.type.includes("video")) {
          setPostType("video");
        }
        setImgName(file.name);
        // set image url to save in db
        setImage(url);
        // set next step for uploading
        setCurrent(current + 1);
        setUploading(false);
      } else {
        setUploading(false);
      }
    }
    const props: UploadProps = {
      name: "image-file",
      multiple: false,
      listType: "picture",

      // upload image to firebase and fetch the image url for db
      async beforeUpload(file) {
        /* if (!file.type.includes("image")) {
          message.error("Please upload an image only");
          return false;
        } */

        let _username = user.username;
        if (!_username)
          _username = String(Math.floor(Math.random() * 500000) + 1);
        const newFileName = `${_username}${dateTime}${file.name}`;
        setUploading(true);
        const imageUrl = await upload(file, newFileName);
        setImageData(file, String(imageUrl));
        return true;
      },
    };

    return (
      <>
        <Spin
          tip="Uploading....."
          spinning={isuploading}
          size="large"
          className="text-[100px] !"
          delay={500}
        >
          <Dragger {...props} className="flex flex-col h-[60vh] ">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>

            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </Spin>
      </>
    );
  };

  {
    /* Second step to Enter details about post */
  }

  const PostDetails = () => {
    const [caption, setCaption] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const updateCaption = (e: any) => {
      let _caption = caption;

      // if its an emoji add native value
      if (e.native) {
        _caption += e.native;
      } else {
        _caption = e.target.value;
      }

      // assign outer finalCaption
      finalCaption.current = _caption;
      console.log(finalCaption.current);
      setCaption(_caption);
    };

    return (
      <div className="detailsData">
        <Row className="">
          <Col md={24} lg={12}>
            {postType === "image" ? (
              <Image
                src={u_img}
                alt="uploadImage"
                className="h-[50vh] max-h-[450px]"
              />
            ) : (
              <video className="h-[50vh]" controls>
                <source src={u_img} type="video/mp4" />
              </video>
            )}
          </Col>
          <Col md={24} lg={12} className="flex flex-col px-10 w-full">
            <div className="flex  w-full space-x-5 mt-[20px]">
              <Avatar
                size="large"
                src={
                  getUser().img.includes("https://")
                    ? getUser().img
                    : `https://xsgames.co/randomusers/avatar.php?g=pixel&key=1`
                }
              />
              <b className="mt-2">
                <span>{user.username}</span>
              </b>
            </div>
            <TextArea
              className="mt-5 mb-5 w-full"
              showCount
              value={caption}
              maxLength={500}
              onChange={(e) => updateCaption(e)}
              placeholder="Write a caption for post"
              style={{ height: 320 }}
              onFocus={() => setShowEmoji(false)}
            />
            <SmileOutlined
              className="text-[20px] mb-3"
              onClick={() => setShowEmoji(!showEmoji)}
            />
            {showEmoji && <Emoji handleComment={updateCaption} />}
          </Col>
        </Row>
      </div>
    );
  };

  const steps = [
    {
      title: "First",
      content: <SelectContent />,
    },
    {
      title: "Second",
      content: <PostDetails />,
    },
  ];

  const { token } = theme.useToken();

  const next = () => {
    if (imgName === "") {
      message.open({
        type: "error",
        content: "Please upload an image or video to proceed further !!",
        duration: 7,
      });
      return;
    }
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const uploadPost = async () => {
    const data = {
      username: user.username,
      email: user.email,
      likes: 0,
      img: u_img,
      caption: finalCaption.current,
      date: moment().format("MMM Do yyyy, h:mm:ss a"),
      type: postType,
    };
    setDateTime(null);

    const res = await addPost(data);
    if (res.status === "success") {
      message.success(`Post uploaded successfully !!`);
      navigate("/posts");
    } else {
      message.error("Some error occured, please try again !!");
    }
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <div className="flex  justify-center">
      <div className="w-[70vw]">
        <Steps current={current} items={items} />

        <div style={contentStyle}>{steps[current].content}</div>

        <div style={{ marginTop: 24 }} className="h-[40vh]">
          {current < steps.length - 1 && (
            <Button className="bg-blue-500 !" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button onClick={uploadPost}>Done</Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default CreatePost;
