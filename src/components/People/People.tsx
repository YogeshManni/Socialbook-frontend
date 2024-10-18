import { Avatar, Card, Col, Modal, Row } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";
import "./People.css";
import { getUsersFromDb } from "../../services/api";
import Profile from "../Profile/Profile";
import Search from "antd/es/input/Search";
function People() {
  // searched users
  const [users, setUsers]: any = useState([]);
  // users fetched from db
  const [dbUsers, setDbUsers]: any = useState([]);
  const [modalState, setModalState]: any = useState(false);
  const [currentUser, setCurrentUserState]: any = useState(null);
  const [isSearching, setSearching] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const _getUsers = async () => {
    const res = await getUsersFromDb();
    console.log(res);
    setUsers([...res]);
    setDbUsers([...res]);
    setQuery("");
  };
  useEffect(() => {
    _getUsers();
  }, []);

  const filterUsers = (e: any) => {
    setSearching(true);
    const query = e.target.value;

    // if serach is over display all the users
    if (query.length === 0) {
      setUsers(dbUsers);
    } else {
      // use map to filter out the matching users, also filter out undefined
      const filteredUsers = dbUsers
        .map((user: any) => {
          if (user.username.toLowerCase().includes(query)) return user;
        })
        .filter((user: any) => user);

      console.log(filteredUsers);
      setUsers(filteredUsers);
    }
    setQuery(query);
    setSearching(false);
  };

  return (
    <div className="peopleContainer">
      <Search
        placeholder="Search students/faculty"
        enterButton="Search"
        onChange={filterUsers}
        size="large"
        loading={isSearching}
        value={query}
        className="md:w-[50%]"
      />
      <Row style={{ marginTop: "50px" }} gutter={[18, 18]}>
        {users &&
          users.map((item: any, idx: any) => (
            <Col key={idx}>
              <Card
                onClick={() => {
                  setCurrentUserState(item);
                  setModalState(true);
                }}
                hoverable
                className="peopleCards"
                cover={<img className="h-[250px]" alt="user" src={item.img} />}
              >
                <b>
                  <p>{item.username}</p>
                </b>
                <hr />
                <div className="cardData">
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.role || item.org || item.phoneno}{" "}
                    {/* Display any one of these three items */}
                  </p>
                </div>
              </Card>
            </Col>
          ))}
      </Row>
      {modalState ? (
        <Modal
          className="peopleModal"
          width="60vw"
          footer={null}
          title="Profile"
          open={modalState}
          onCancel={() => {
            setModalState(false);
            _getUsers();
          }}
        >
          <Profile user={currentUser} />
        </Modal>
      ) : null}
    </div>
  );
}

export default People;
