import { Avatar, Card, Col, Modal, Row, Select } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";
import "./People.css";
import { getUsersFromDb } from "../../services/api";
import Profile from "../Profile/Profile";
import Search from "antd/es/input/Search";
import { filterUserData } from "./filter";
import { Loader } from "../../helpers/helper";
function People() {
  // searched users
  const [users, setUsers]: any = useState();
  // users fetched from db
  const [dbUsers, setDbUsers]: any = useState([]);
  const [modalState, setModalState]: any = useState(false);
  const [currentUser, setCurrentUserState]: any = useState(null);
  const [isSearching, setSearching] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [filter, setFilter] = useState<string>("Name");

  const _getUsers = async () => {
    const res = await getUsersFromDb();

    try {
      //console.log(res);
      setUsers([...res]);
      setDbUsers([...res]);
      setQuery("");
    } catch (err) {
      //console.log(err);
    }
  };
  useEffect(() => {
    _getUsers();
  }, []);

  const { Option } = Select;
  const selectBefore = (
    <Select
      defaultValue="Name"
      className="w-[115px] md:w-[140px] "
      onChange={(e) => {
        setFilter(e);
      }}
    >
      <Option value="Name">Name</Option>
      <Option value="Role">Role</Option>
      <Option value="Organization">Organization</Option>
    </Select>
  );

  const filterUsers = (e: any) => {
    setSearching(true);

    const query = e.target.value;

    // if serach is over display all the users
    if (query.length === 0) {
      setUsers(dbUsers);
    } else {
      const filteredUsers = filterUserData(dbUsers, query, filter);
      setUsers(filteredUsers);
    }
    setQuery(query);
    setSearching(false);
  };

  return (
    <div className="peopleContainer">
      <Search
        addonBefore={selectBefore}
        placeholder="Search students/faculty"
        enterButton="Search"
        onChange={filterUsers}
        size="large"
        loading={isSearching}
        value={query}
        className="md:w-[50%]"
      />
      <Row
        style={{ marginTop: "50px" }}
        gutter={[18, 18]}
        /*    className="!ml-[20%] sm:!ml-[0%]" */
        className="flex justify-center sm:justify-start"
      >
        {!users ? (
          <Loader />
        ) : (
          users.map((item: any, idx: any) => (
            <Col key={idx}>
              <Card
                onClick={() => {
                  setCurrentUserState(item);
                  setModalState(true);
                }}
                hoverable
                className="peopleCards"
                cover={
                  <img
                    className="h-[250px] object-cover"
                    alt="user"
                    src={item.img}
                  />
                }
              >
                <b>
                  <p>{item.username}</p>
                </b>
                <hr />
                <div className="cardData">
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.role || item.org || item.phoneno || item.email}{" "}
                    {/* Display any one of these three items */}
                  </p>
                </div>
              </Card>
            </Col>
          ))
        )}
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
