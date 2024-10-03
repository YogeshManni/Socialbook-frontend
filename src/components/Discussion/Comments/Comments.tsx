import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button, Divider, Input, List, Skeleton, Space } from "antd";

import "./Comments.css";
import { SendOutlined } from "@ant-design/icons";
import moment from "moment";
import { addCommentTodb, getCommentFromdb } from "../../../services/api";
import { getUser } from "../../../helpers/helper";

interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}
function Comments(props: any) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [comment, setComment] = useState("");

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    let fakeData = [
      {
        img: "/data/img1",
        username: "bob",
        comment: "What a wonderful story",
        date: "25/07/2023",
      },
    ];
    setData([...data, ...fakeData]);
    setLoading(false);
    /*   if (loading) {
        return;
      }
      setLoading(true);
      fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
        .then((res) => res.json())
        .then((body) => {
          setData([...data, ...body.results]);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        }); */
  };

  useEffect(() => {
    const _getComments = async () => {
      const res = await getCommentFromdb(props._discussionId, props.type);
      console.log(res);
      setData([...data, ...res]);
      setLoading(false);
    };
    _getComments();
  }, []);

  const addComment = async () => {
    const newComment = {
      discussionid: props._discussionId,
      username: getUser().username,
      comment: comment,
      date: moment().format("LLL"),
      type: props.type,
    };

    const res = await addCommentTodb(newComment);
    setData([...data, res]);
    setComment("");
  };

  return (
    <>
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <List
          dataSource={data}
          renderItem={(item: any) => (
            <List.Item key={item.img} className="listItem">
              <div className="flex flex-col">
                <List.Item.Meta
                  className="metaList"
                  avatar={
                    <Avatar
                      src={
                        item.img ||
                        `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${props._discussionid}`
                      }
                    />
                  }
                  title={<span>{item.username}</span>}
                  description={item.comment}
                />
                <div className="commentDateTime mt-[6px] ml-[50px] !">
                  {moment(item.date).fromNow()}
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
      <Space.Compact style={{ width: "100%" }} className="commentBox">
        <Input
          onSubmit={addComment}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addComment();
          }}
          placeholder="Write a comment"
        />
        <Button
          onClick={() => addComment()}
          className="border-none text-[18px]   bg-[#60a5fa]"
        >
          <span className="mt-[-20px]">
            <SendOutlined />
          </span>
        </Button>
      </Space.Compact>
    </>
  );
}

export default Comments;
