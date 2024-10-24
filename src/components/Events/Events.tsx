import React, { forwardRef, useEffect, useRef, useState } from "react";
import "./Events.css";
import {
  CommentOutlined,
  EyeOutlined,
  HeartOutlined,
  MessageOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Modal, Skeleton } from "antd";
import { Col, Row } from "antd";
import AddEvent from "../AddEvent/AddEvent";
import {
  addEventToDb,
  getEventFromDb,
  updateEventLikesInDb,
  updateEventViews,
  updateEventInDb,
} from "../../services/api";
import Comments from "../Discussion/Comments/Comments";
import { getUser, Loader } from "../../helpers/helper";
import eventImg from "../../assets/img/event.jpg";
const { Meta } = Card;
<style></style>;
const Events = () => {
  const [modelState, setModalState] = useState(false);
  const [commentsModalState, setCommentsModalState] = useState(false);

  const [events, setEvents] = useState<any>(null);
  const [newPost, setNewPost] = useState(false);
  const [postData, setPostData]: any = useState(null);
  const [eventId, setEventId] = useState(null);
  const addEventRef = useRef<any>();
  const addEvent = async (eventData: any) => {
    if (!eventData) {
      setModalState(false);
      return;
    }
    let res = null;
    console.log(eventData);
    if (postData !== null && postData.username === getUser().username) {
      //update event
      res = await updateEventInDb(eventData);
    } else {
      if (postData && postData.username) return;
      //add new event
      res = await addEventToDb(eventData);
    }
    _getEvents();
    setModalState(false);
  };

  const _getEvents = async () => {
    const eves = await getEventFromDb();
    console.log(eves);
    setEvents(eves);
  };

  useEffect(() => {
    _getEvents();
  }, []);

  const updateLikes = async (data: any) => {
    const result = await updateEventLikesInDb(data);
    setEvents([...events]);
  };

  const handleCardClick = async (item: any) => {
    setPostData(item);
    setNewPost(false);
    setModalState(true);
    await updateEventViews({ id: item.id, views: item.views + 1 });
    _getEvents();
  };
  return (
    <>
      {!events ? (
        <Loader />
      ) : (
        <>
          <Button
            className="bg-sbutton"
            onClick={() => {
              setPostData(null);
              setNewPost(true);
              setModalState(true);
            }}
            size={"large"}
            style={{ float: "right" }}
          >
            <span className="!text-dullwhite font-bold">
              <PlusOutlined />
              &nbsp; Add Event
            </span>
          </Button>

          <Row style={{ marginTop: "50px" }} gutter={[18, 18]}>
            {events.map((item: any, idx: any) => (
              <Col key={idx}>
                <div className="d-card">
                  <Card
                    hoverable
                    className="cards"
                    onClick={() => {
                      handleCardClick(item);
                    }}
                    cover={
                      <img
                        className="h-[200px] object-cover"
                        alt="example"
                        src={item.img !== "null" ? item.img : eventImg}
                      />
                    }
                  >
                    <Meta
                      avatar={
                        <Avatar
                          src={item.userimg || `${item.avtsrc}&key=${idx}`}
                        />
                      }
                      title={item.username}
                      description={item.fronttext || `Content ahead`}
                    />
                    <br />
                    <hr />
                    <div className="options">
                      <span>
                        <Button className="border-none px-[0px]">
                          <EyeOutlined className="text-[20px]" />
                        </Button>
                        <span className="text-[13px]">{item.views}</span>
                      </span>
                      <span>
                        <Button className="border-none px-[0px]">
                          <MessageOutlined
                            className="icons text-[20px]"
                            onClick={(e) => {
                              setEventId(item.id);
                              setCommentsModalState(true);
                              e.stopPropagation();
                            }}
                          />
                        </Button>
                        <span className="text-[13px]">
                          {item.totalcomments}
                        </span>
                      </span>
                      <span>
                        <Button className="border-none px-[0px]">
                          <HeartOutlined
                            className="icons text-[20px]"
                            onClick={(e) => {
                              item.likes = (item.likes ? item.likes : 0) + 1;
                              updateLikes({
                                likes: item.likes,
                                id: item.id,
                              });
                              e.stopPropagation();
                            }}
                          />
                        </Button>
                        <span className="text-[13px]">{item.likes}</span>
                      </span>
                    </div>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
          <div>
            {modelState ? (
              <Modal
                title="Add Event"
                open={true}
                okButtonProps={{ style: { backgroundColor: "#8b5cf6" } }}
                onOk={() => addEventRef.current.addEvent()}
                okText={
                  postData &&
                  postData.username === getUser().username &&
                  "Update"
                }
                onCancel={() => setModalState(false)}
                width={window.innerWidth}
                bodyStyle={{ height: window.innerHeight - 200 }}
                style={{ top: 20 }}
              >
                <AddEvent
                  ref={addEventRef}
                  newPost={newPost}
                  getAddEvent={addEvent}
                  postData={postData}
                ></AddEvent>
              </Modal>
            ) : null}

            {commentsModalState ? (
              <Modal
                footer={null}
                title="Comments"
                open={commentsModalState}
                onCancel={() => {
                  setCommentsModalState(false);
                  _getEvents();
                }}
              >
                <Comments _discussionId={eventId} type={"event"} />
              </Modal>
            ) : null}
          </div>
        </>
      )}
    </>
  );
};

export default Events;
