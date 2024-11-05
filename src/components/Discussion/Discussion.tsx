import React, { useEffect, useState } from "react";
import "./Discussion.css";
import Icon, {
  ArrowLeftOutlined,
  LikeOutlined,
  MessageOutlined,
  PlusOutlined,
  SendOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Avatar, Form, Input, List, message, Skeleton, Space } from "antd";
import { Button, Modal } from "antd";
import Comments from "./Comments/Comments";
import moment from "moment";
import {
  getDiscussionsFromDb,
  addDiscussionsToDb,
  addDiscussionCommToDb,
  getDiscussionCommToDb,
} from "../../services/api";
import { getUser } from "../../helpers/helper";

import Moderate from "../../lib/mod";
function Discussion() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDiscussion, setDiscussion]: any = useState([]);
  const [_newDiscussion, _setDiscussion]: any = useState([]);
  const [dissData, setDissData]: any = useState([]);
  const [discussionId, setDiscussionId]: any = useState(0);
  const [discussionCommId, setDiscussionCommId]: any = useState(0);
  const [modelState, setModalState] = useState(false);
  const [discussionName, setDiscussionName] = useState<string>("");
  const [dissNameNotFound, setDissNameNotFound] = useState<boolean>(false);
  const [disCmtSelected, selectDissComments] = useState<boolean>(false);
  const [disLoader, setDisLoader] = useState<boolean>(false);
  const [disCommLoader, setDisCommLoader] = useState<boolean>(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const checkText = async (text: string) => {
    return await Moderate(text);
  };

  async function handleLikes(item: any) {
    console.log(item);
    item.firstTime = false;
    item.likes += 1;
    await addDiscussionCommToDb(item);
    setDiscussion([...newDiscussion]);
  }

  /********* Validate discussion name ******/

  const validateDiscussionName = async () => {
    //validate if input is not empty or just spaces
    if (discussionName.trim() === "" || discussionName.length < 1) {
      setDissNameNotFound(true);
      return;
    }
    const data = {
      username: getUser().username,
      name: discussionName,

      date: new Date(),
    };

    /**** Add discussion to db ***/
    const res = await addDiscussionsToDb(data);
    res.img = getUser().img;
    setDiscussion([res, ...newDiscussion]);
    setModalState(false);
  };

  /**** Add discussion comment to db  ********/
  const addDiscussionComment = async () => {
    if (_newDiscussion.length <= 0) return;

    const isNotValid = await checkText(_newDiscussion);
    console.log(isNotValid);
    if (!isNotValid) {
      const user = getUser();
      // create packet for discussion comment
      const data = {
        discussionid: discussionId,
        name: user.username,
        img: user.img,
        firstTime: true,
        likes: 0,
        commentid: dissData.length + 1,
        discussion: _newDiscussion,
      };
      const res = await addDiscussionCommToDb(data);

      setDissData([data, ...dissData]);
      _setDiscussion("");
    } else {
      message.error({
        duration: 5,
        content: "Inappropriate text detected, please check again !!",
      });
    }
  };

  useEffect(() => {
    async function _getDisccussions() {
      const data = await getDiscussionsFromDb();

      setDiscussion(data);
      setDisLoader(false);
    }
    setDisLoader(true);
    _getDisccussions();
  }, []);

  const getDissComments = async (id: number) => {
    setDisCommLoader(true);
    setDiscussionId(id);

    const data = await getDiscussionCommToDb(id);

    setDissData(data.data);
    selectDissComments(true);
    setDisCommLoader(false);
  };

  return (
    <div className="discussionContainer">
      <Button
        className="bg-sbutton mb-2 hover:!text-blue-500 text-white font-bold"
        onClick={() => {
          setModalState(true);
        }}
        size={"large"}
        style={{ float: "right" }}
      >
        <span className=" font-bold">
          <PlusOutlined />
          &nbsp; New Discussion
        </span>
      </Button>

      <Button
        className={`${
          !disCmtSelected && "hidden"
        } md:hidden visible bg-sbutton mb-2`}
        onClick={() => {
          selectDissComments(false);
        }}
        size={"large"}
        style={{ float: "right" }}
      >
        <span className="!text-dullwhite font-bold">
          <ArrowLeftOutlined />
          &nbsp; Back
        </span>
      </Button>

      {/********** Discussions *********/}
      <div className="listDiv flex boxShadow">
        <div
          className={`border-r-[0.5px] border-[#9ca3af] overflow-y-auto cursor-pointer ${
            !disCmtSelected ? "w-[100vw] md:w-[30vw]" : "w-0 md:w-[30vw]"
          }`}
        >
          {disLoader ? (
            <Skeleton active />
          ) : (
            <List
              itemLayout="vertical"
              size="large"
              dataSource={newDiscussion}
              renderItem={(item: any, idx: number) => (
                <List.Item
                  key={`${item.name}${idx}`}
                  className={`hover:bg-[rgba(94,94,94,0.2)] ${
                    item.id === discussionId
                      ? "bg-[rgba(94,94,94,0.2)]"
                      : "bg-[rgba(223,223,223,0.2)]"
                  } `}
                  onClick={() => getDissComments(item.id)}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={
                          item?.img?.includes("https://")
                            ? item.img
                            : `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${item.id}`
                        }
                      />
                    }
                    title={<span className="text-[14px]">{item.username}</span>}
                    description={
                      <p className="text-[13px]">
                        {moment(item.date).fromNow()}
                      </p>
                    }
                  />
                  <p className="ml-10 mt-[-10px]">{item.name}</p>
                </List.Item>
              )}
            />
          )}
        </div>

        {/**** Discussion comments ********/}
        <div
          className={`${
            disCmtSelected ? "w-[100vw] md:w-[70vw]" : "w-[0vw] md:w-[70vw]"
          } `}
        >
          <div className="!h-[73vh] overflow-y-auto">
            <div className="ml-4  overflow-y-auto">
              {disCommLoader ? (
                <Skeleton active />
              ) : (
                <List
                  itemLayout="vertical"
                  size="large"
                  dataSource={dissData}
                  renderItem={(item: any, idx: number) => (
                    <List.Item
                      key={`${item.name}${idx}`}
                      actions={[
                        <Button onClick={() => handleLikes(item)}>
                          <IconText
                            icon={LikeOutlined}
                            text={String(item.likes)}
                            key="list-vertical-like-o"
                          />
                        </Button>,
                        <Button
                          onClick={() => {
                            showModal();
                            setDiscussionCommId(item.id);
                          }}
                        >
                          <IconText
                            icon={MessageOutlined}
                            text=""
                            key="list-vertical-message"
                          />
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            src={
                              item?.img?.includes("https://")
                                ? item.img
                                : `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${item.id}`
                            }
                          />
                        }
                        title={item.name}
                        description={moment(item.date).fromNow()}
                      />
                      {item.discussion}
                    </List.Item>
                  )}
                />
              )}
            </div>
          </div>

          <Space.Compact style={{ width: "100%" }} className={`commentBox`}>
            <Input
              disabled={!disCmtSelected}
              className="!mx-2"
              onSubmit={addDiscussionComment}
              value={_newDiscussion}
              onChange={(e) => _setDiscussion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addDiscussionComment();
              }}
              placeholder="Write a comment"
            />
            <Button
              disabled={!disCmtSelected}
              onClick={addDiscussionComment}
              className="bg-orgbutton mr-5"
            >
              <SendOutlined className="" />
            </Button>
          </Space.Compact>
        </div>
      </div>

      {modelState && (
        <Modal
          title="Add Discussion Name"
          open={true}
          okButtonProps={{ style: { backgroundColor: "#8b5cf6" } }}
          onCancel={() => setModalState(false)}
          width={500}
          footer={null}
          style={{ top: "30%" }}
        >
          <Form onFinish={validateDiscussionName}>
            <Form.Item
              name="discussion"
              validateStatus={dissNameNotFound ? "error" : undefined}
              help={
                dissNameNotFound ? "Please enter discussion name!" : undefined
              }
              rules={[
                { required: true, message: "Please enter discussion name!" },
              ]}
            >
              <Input
                size="large"
                onChange={(e: any) => {
                  setDiscussionName(e.target.value);
                  setDissNameNotFound(false);
                }}
                placeholder="Enter discussion name"
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                onClick={() => setModalState(false)}
                size="large"
                className="mr-5 bg-sbutton"
              >
                Cancel
              </Button>
              <Button
                className="bg-sbutton"
                type="primary"
                htmlType="submit"
                size="large"
              >
                Create
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}

      {isModalOpen ? (
        <Modal
          footer={null}
          title="Comments"
          open={isModalOpen}
          onCancel={handleCancel}
        >
          <Comments
            _discussionId={`${discussionId}${discussionCommId}`}
            type={"discussion"}
          />
        </Modal>
      ) : null}
    </div>
  );
}

export default Discussion;
