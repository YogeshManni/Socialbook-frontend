import React, { useEffect, useState } from "react";
import { getUser, Loader } from "../../helpers/helper";
import { getPeopleFromDb } from "../../services/api";
import { Avatar, List, Modal, Skeleton } from "antd";
import Profile from "../Profile/Profile";
import { Link } from "react-router-dom";

interface User {
  id: Number;
  username: string;
  email: string;
  role: string;
  organization: string;
  location: string;
  profilePicture: string;
  img: string;
}
function SuggestedPeople() {
  const [users, setUsers] = useState<User[]>();
  const [modalState, setModalState] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const _getSuggPeople = async () => {
      try {
        const user = getUser();
        const res = await getPeopleFromDb(user.role, user.id);
        console.log(res);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    _getSuggPeople();
  }, []);

  return (
    <section className="flex flex-col">
      <div className="flex justify-between w-full">
        <span className="text-[15px] font-bold text-[#9ca3af]  pb-3">
          {" "}
          Suggested for you
        </span>
        <Link to="/people">
          <span className="text-[#9ca3af] cursor-pointer">See all </span>
        </Link>
      </div>
      <hr className="pb-3 !border-[#9ca3af]" />
      {!users ? (
        <Loader width={400} />
      ) : (
        <List
          className="w-[500px]"
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(item: User) => (
            <List.Item
              actions={[
                <span
                  key="list-loadmore-more"
                  className="cursor-pointer"
                  onClick={() => {
                    setCurrentUser(item);
                    setModalState(true);
                  }}
                >
                  View
                </span>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.img} size={40} />}
                title={<p className="pb-2">{item.username}</p>}
                description={item.role}
              />
            </List.Item>
          )}
        />
      )}
      {modalState ? (
        <Modal
          className="peopleModal"
          width="60vw"
          footer={null}
          title="Profile"
          open={modalState}
          onCancel={() => {
            setModalState(false);
          }}
        >
          <Profile user={currentUser} />
        </Modal>
      ) : null}
    </section>
  );
}

export default SuggestedPeople;
