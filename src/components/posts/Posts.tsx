import React, { forwardRef, useEffect, useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import "./Posts.scss";
import {
  BookOutlined,
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
  SendOutlined,
  ShareAltOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Modal, Skeleton } from "antd";
import {
  addCommentTodb,
  getPostsFromDb,
  updatePostLikesInDb,
} from "../../services/api";
import notFoundImage from "../../assets/img/notfoundimg.jpg";
import Comments from "../Discussion/Comments/Comments";
import moment from "moment";
import { Image } from "antd";
import { getUser } from "../../helpers/helper";
import SuggestedPeople from "../People/SuggestedPeople";

const Posts = () => {
  const [posts, setPosts]: any = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postId, setPostId] = useState(0);
  const [comment, setComment] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  const getPosts = async () => {
    const email = getUser().email;
    const posts = await getPostsFromDb({ email: email });
    posts.posts.forEach((item: any, ind: number) => {
      item.input = "";
      item.showEmoji = false;
    });
    console.log(posts.posts);
    setPosts(posts.posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleComment = (e: any, post: any) => {
    console.log(e);
    if (e.native) post.input += e.native;
    else post.input = e.target.value;
    setComment(post.input);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function handleLikes(post: any) {
    const user = getUser().username;
    let type = "add";
    if (!post.liked_users) post.liked_users = [];
    if (!post.liked_users.includes(user)) {
      post.liked_users.push(user);
      post.likes += 1;
    } else {
      var index = post.liked_users.indexOf(user);
      if (index !== -1) {
        post.liked_users.splice(index, 1);
      }
      post.likes -= 1;
      type = "rem";
    }
    console.log(posts);
    setPosts([...posts]);
    updatePostLikesInDb({ id: post.id, username: user, type: type });
  }

  async function addComment(postId: any, post: any) {
    if (comment.trim() === "") {
      alert("Please type a comment to post, Empty comment won't be posted !!");
      return;
    }
    const newComment = {
      discussionid: postId,
      username: getUser().username,
      comment: comment,
      date: moment().format("LLL"),
      type: "posts",
    };

    const res = await addCommentTodb(newComment);
    setPostId(postId);
    post.input = "";
    setIsModalOpen(true);
  }
  return (
    <section className="flex flex-col  items-center">
      {!posts ? (
        <Skeleton active />
      ) : (
        posts.map((post: any, ind: number) => (
          <div key={ind}>
            <div
              key={ind}
              className="relative card space-y-4 max-w-[430px] shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] p-4 rounded-[20px]"
            >
              {/* Heading */}
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center ">
                  <div className="w-8 h-6  cursor-pointer">
                    <Avatar
                      size={30}
                      src={
                        post.profilepic
                          ? post.profilepic
                          : `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${ind}`
                      }
                    />
                  </div>
                  <h2 className="font-semibold">{post.username}</h2>
                </div>
                {/* <DotsHorizontalIcon className="w-5 h-5 cursor-pointer" /> */}
              </div>

              {/* Posted Image */}

              {!(post.type === "video") ? (
                <div className="relative  aspect-square overflow-hidden z-20">
                  {/* If the image src doesn't contaain https:// i.e if its not from firebase or null then show notFoundImg */}
                  <Image
                    className="object-cover"
                    src={
                      post?.img.includes("https://") ? post.img : notFoundImage
                    }
                    alt={post.username}
                  />
                </div>
              ) : (
                <div className="h-auto">
                  <video
                    controls
                    className="h-[420px] w-full  object-cover max-h-auto"
                  >
                    <source src={post.img} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2">
                <div className="flex justify-between mb-2">
                  <div className="inline-flex items-center gap-0">
                    <Button
                      className="border-none px-[0px]"
                      onClick={(e) => handleLikes(post)}
                    >
                      {post.liked_users &&
                      post.liked_users.includes(getUser().username) ? (
                        <HeartFilled className="text-red text-[20px]" />
                      ) : (
                        <HeartOutlined className="text-[20px]" />
                      )}
                    </Button>
                    <Button
                      className="border-none px-[20px]"
                      onClick={() => {
                        setPostId(post.id);
                        showModal();
                      }}
                    >
                      <Badge count={post.totalcomments} showZero>
                        <MessageOutlined className="text-[20px] text-red-500 !" />
                      </Badge>
                    </Button>
                    <Button className="border-none px-[0px]">
                      <ShareAltOutlined className="text-[20px] text-red-500 !" />
                    </Button>
                  </div>
                  <Button className="border-none">
                    <BookOutlined className="text-[22px]" />
                  </Button>
                </div>
                <span className=" font-semibold">{`${post.likes} likes`}</span>
                <p>
                  <span className="font-semibold">{post.username} </span>
                  {post.caption}
                </p>
                <h3 className="text-xs text-gray-500">
                  {moment(post.date).format("LLL")}
                </h3>
              </div>
              <hr className="text-[#d1d5db]" />
              <div className="flex gap-4" style={{ marginTop: "5px" }}>
                {post.showEmoji && (
                  <div className="mt-[50px] z-30 absolute !">
                    <Picker
                      data={data}
                      onEmojiSelect={(event: any) => {
                        handleComment(event, post);
                      }}
                      style={{ zIndex: "99" }}
                      className="z-30 !"
                    />
                  </div>
                )}
                <Button className="border-none p-[0px] !">
                  <SmileOutlined
                    className="text-[18px]"
                    onClick={() => {
                      post.showEmoji = !post.showEmoji;
                      setShowEmojis(!showEmojis);
                    }}
                  />
                </Button>

                <textarea
                  className="focus:outline-none w-full resize-none mt-2 pb-0 mb-[-15px]"
                  key={ind}
                  value={post.input}
                  placeholder="Add a comment"
                  onFocus={() => {
                    post.showEmoji = false;
                    setShowEmojis(false);
                  }}
                  onKeyDown={(e: any) => {
                    if (e.key == "Enter") {
                      addComment(post.id, post);
                    }
                  }}
                  onChange={(event) => {
                    handleComment(event, post);
                  }}
                />
                <Button
                  onClick={() => addComment(post.id, post)}
                  className="border-none px-[0px] text-[18px] mt-[-2px]"
                >
                  <SendOutlined />
                </Button>
              </div>
            </div>

            <hr className="my-[20px] text-[#d1d5db]" />
          </div>
        ))
      )}

      {isModalOpen ? (
        <Modal
          footer={null}
          title="Comments"
          open={isModalOpen}
          onCancel={() => {
            //updatePosts on ModalHide
            handleCancel();
            getPosts();
          }}
        >
          <Comments _discussionId={postId} type={"posts"} />
        </Modal>
      ) : null}
    </section>
  );
};

export default Posts;
