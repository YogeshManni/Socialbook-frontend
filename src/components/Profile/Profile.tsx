import {
  Avatar,
  Button,
  Card,
  Input,
  Spin,
  Upload,
  UploadProps,
  message,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { MessageOutlined, UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import { getUser } from "../../helpers/helper";
import { saveUserDataDb, updateUserinDb } from "../../services/api";
import upload from "../../lib/upload";
import Chat from "../Chat/Chat";
import { ChatContext } from "../../App";

function Profile(props: any) {
  const { setChat, setChatUser }: any = useContext(ChatContext);
  const [dateTime, setDateTime]: any = useState("");
  const [userdata, setUserData]: any = useState(null);

  const [isuploading, setUploading] = useState<boolean>(false);
  const currentUser = getUser();

  useEffect(() => {
    //console.log(props);
    //initlaizing datetime for new profle pic
    if (!dateTime) setDateTime(String(moment().format()));
    setChatUser(props.user);
    setUserData(props.user);
  }, []);

  const saveUsersData = async () => {
    const data = await updateUserinDb(userdata);
    if (data.status === "success") {
      message.success("Data updated Successfully !!");
    } else {
      message.error("Some error occured, please try again !!");
    }
  };
  function uploadImage(file: any, url: string) {
    const updateDp = async () => {
      const res = await updateUserinDb({
        filename: url,
        data: props,
      });
      if (res.status == "success") {
        setUploading(false);
        message.success("Profile pic changed successfully !");
      } else {
        setUploading(false);
        message.error("Error ocurred while uploading pic, please try again !");
      }

      setUserData(res.data);
    };
    updateDp();
  }

  const uploadprops: UploadProps = {
    name: "image-file",
    multiple: false,

    action: `${process.env.REACT_APP_BASEURL}/users/uploadImage`,

    data: { name: `${getUser().username}${dateTime}` },

    onChange(info: any) {},
    async beforeUpload(file) {
      if (!file.type.includes("image")) {
        message.error("Please upload an image only");

        return false;
      }
      let _username = getUser().username;
      if (!_username)
        _username = String(Math.floor(Math.random() * 500000) + 1);
      const newFileName = `${_username}${dateTime}${file.name}`;
      setUploading(true);
      const imageUrl = await upload(file, newFileName);
      uploadImage(file, String(imageUrl));

      return true;
    },
  };

  const isOwner = (_username: string) => {
    return currentUser.username === _username;
  };
  return (
    <>
      {userdata && (
        <div className="profileContainer">
          <Spin
            tip="Uploading....."
            spinning={isuploading}
            size="large"
            className="text-[100px] !"
            delay={500}
          >
            <Card
              hoverable
              className="h-[400px] flex justify-center  shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] p-5"
            >
              <Avatar size={200} src={userdata.img} />

              <div className="m-3 flex items-center flex-col">
                <b>
                  <p>{userdata.fullname.toUpperCase()}</p>
                </b>

                <p className="text-[13px]">{userdata.phoneno}</p>
                {userdata.username === currentUser.username ? (
                  <Upload {...uploadprops} className="mt-2 = !">
                    <Button
                      className=" bg-sbutton border-sbutton round-[20px] !"
                      icon={<UploadOutlined />}
                    >
                      Upload Profile pic
                    </Button>
                  </Upload>
                ) : (
                  <Button
                    className=" bg-sbutton border-sbutton round-[20px] text-dullwhite mt-4"
                    icon={<MessageOutlined />}
                    onClick={() => setChat(true)}
                  >
                    Chat
                  </Button>
                )}
              </div>
            </Card>
          </Spin>
          <Card
            hoverable
            className="max-h-[600px]  usersinfo w-full shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] md:p-2 2xl:ml-3 mt-3 2xl:mt-0"
          >
            <div className="bioDiv">
              <b>User Name</b>
              <span>{userdata.username}</span>
              {/* <Input value={userdata.username} className="border-none" /> */}
            </div>
            <hr />
            <div className="bioDiv">
              <b>Full Name</b>
              <span
                contentEditable={isOwner(userdata.username)}
                onInput={(e: any) => {
                  userdata.fullname = e.target.innerHTML;
                }}
              >
                {userdata.fullname}
              </span>
            </div>
            <hr />
            <div className="bioDiv">
              <b>Email</b>
              <span
                contentEditable={isOwner(userdata.username)}
                onInput={(e: any) => {
                  userdata.email = e.target.innerHTML;
                }}
              >
                {userdata.email}
              </span>
            </div>
            <hr />
            <div className="bioDiv">
              <b>Organization</b>
              <span
                contentEditable={isOwner(userdata.username)}
                onInput={(e: any) => {
                  userdata.org = e.target.innerHTML;
                }}
              >
                {userdata.org}
              </span>
            </div>
            <hr />
            <div className="bioDiv">
              <b>Role</b>
              <span
                contentEditable={isOwner(userdata.username)}
                onInput={(e: any) => {
                  userdata.role = e.target.innerHTML;
                }}
              >
                {userdata.role}
              </span>
            </div>
            <hr />
            <div className="bioDiv">
              <b>Phone number</b>
              <span
                contentEditable={isOwner(userdata.username)}
                onInput={(e: any) => {
                  userdata.phoneno = e.target.innerHTML;
                }}
              >
                {userdata.phoneno}
              </span>
            </div>
            <hr />
            <div className="bioDiv">
              <b>Date Joined</b>
              <span>{moment(userdata.datejoined).format("LLL")}</span>
            </div>

            {isOwner(userdata.username) && (
              <Button
                onClick={saveUsersData}
                className="!float-right mt-3 bg-sbutton text-dullwhite hover"
              >
                {" "}
                Save Changes
              </Button>
            )}
          </Card>
        </div>
      )}
    </>
  );
}

export default Profile;
