import React, { createContext, useEffect, useRef, useState } from "react";
import {
  AppstoreAddOutlined,
  DesktopOutlined,
  FileOutlined,
  LogoutOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Layout, Menu, theme, Tour } from "antd";
import Events from "./components/Events/Events";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Discussion from "./components/Discussion/Discussion";
import Posts from "./components/posts/Posts";
import logo from "./assets/img/logo.png";
import People from "./components/People/People";

import "./App.css";
import Login from "./components/Login/Login";
import { getUser, logout, setAuthHeader } from "./helpers/helper";
import Register from "./components/Register/Register";
import CreatePost from "./components/createpost/CreatePost";
import SuggestedPeople from "./components/People/SuggestedPeople";
import Chat from "./components/Chat/Chat";
import { removeUser } from "./components/Chat/socket";
import Stories from "./components/stories/stories";
import { getStoriesfromDb } from "./services/api";
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

export const ChatContext = createContext({});

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  route?: any,
  children?: MenuItem[]
): MenuItem {
  return {
    label,
    key,
    icon,
    route,
    children,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Posts", "0", <PieChartOutlined />, "/posts"),
  getItem("Events", "1", <DesktopOutlined />, "/events"),
  getItem("Discussions", "2", <FileOutlined />, "/discussions"),
  getItem("Create", "3", <AppstoreAddOutlined />, "/create"),
  getItem("People", "4", <UserOutlined />, "/people"),
  getItem("Logout", "5", <LogoutOutlined />, "/"),
];

// create a hashmap to get index of routes
const MenuKeys: any = {
  "/posts": "0",
  "/events": "1",
  "/discussions": "2",
  "/create": "3",
  "/people": "4",
  "/": "5",
};

// Sider properties
const siderStyle: React.CSSProperties = {
  height: "100vh",
  position: "fixed",
  zIndex: 999,
};

export const LogoComponent = () => {
  return (
    <div className="h-[20px] auto m-5 flex items-center justify-center">
      <img src={logo} className="h-10" alt="logo"></img>
    </div>
  );
};

const App: React.FC = () => {
  const [chatUser, setChatUser] = useState(false);

  const navigate = useNavigate();

  const [stories, setStories] = useState<any>([]);
  const [openChat, setChat] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState(false);
  const [location, setLocation] = useState<string>("/home");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuClick: MenuProps["onClick"] = (e: any) => {
    //
    let data: any = items[e.key];
    if (data.label === "Logout") {
      logout();
    } else {
      navigate(data.route);
    }
  };

  const [type, setType] = useState("signIn");

  const handleOnClick = (text: any) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  //get current route
  //console.log(useLocation().pathname, location);
  const currLoc = useLocation().pathname;
  if (location !== currLoc) {
    //console.log("hit");
    setLocation(currLoc);
  }

  const containerClass =
    "appContainer " + (type === "signUp" ? "right-panel-active" : "");

  //  get stories from db
  const getStories = async () => {
    const _stories = await getStoriesfromDb(getUser().email);
    //console.log(_stories.posts);
    setStories(_stories.posts);
  };

  useEffect(() => {
    // only get stories if user is logged in
    if (getUser()) getStories();
  }, []);
  return (
    <>
      <ChatContext.Provider
        value={{
          setChat,
          setChatUser,
          chatUser,
          stories,
          getStories,
        }}
      >
        {!getUser() ? (
          <div className="h-[100vh]">
            <div className={containerClass} id="container">
              <Routes>
                {/*  {type == "signIn" ? ( */}
                <Route
                  path="/"
                  element={<Login changeType={handleOnClick}></Login>}
                ></Route>
                {/*      ) : ( */}
                <Route
                  path="/register"
                  element={<Register changeType={handleOnClick}></Register>}
                ></Route>
                {/*  )} */}
              </Routes>
              <div className="overlay-container hidden lg:block">
                <div className="overlay">
                  <div className="overlay-panel overlay-left">
                    <h1 className="text-[50px]">Welcome Back!</h1>
                    <p className="text-[20px] mt-2">
                      To keep connected with us please login with your personal
                      info :)
                    </p>
                    <Link to="/">
                      <Button
                        className="bg-sbutton w-[100px] border-dullwhite mt-5"
                        type="primary"
                        size="large"
                        id="signIn"
                        onClick={() => handleOnClick("signIn")}
                      >
                        Sign In
                      </Button>
                    </Link>
                  </div>
                  <div className="overlay-panel overlay-right">
                    <h1 className="text-[50px]">Hello, Friend!</h1>
                    <p className="text-[20px] mt-2">
                      Don't have an account? Click on Sign Up below and get one
                      :)
                    </p>
                    <Link to="/register">
                      <Button
                        className="bg-sbutton w-[100px] border-dullwhite mt-5"
                        type="primary"
                        size="large"
                        id="signUp"
                        onClick={() => handleOnClick("signUp")}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Layout style={{ minHeight: "100vh" }} hasSider={true}>
            <Sider
              className="hidden md:block"
              style={siderStyle}
              breakpoint="lg"
              collapsedWidth="0"
              collapsible
              /*   style={{ position: "fixed" }} */
              onBreakpoint={(broken) => {
                ////console.log(broken);
              }}
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
            >
              <div className="h-[20px] auto m-5 flex items-center justify-center">
                <img src={logo} className=" h-auto" alt="logo"></img>
              </div>
              <Menu
                onClick={menuClick}
                theme="dark"
                selectedKeys={[MenuKeys[location] || "0"]}
                mode="inline"
                items={items}
              />
            </Sider>

            {/* Bottom Navigation for Mobile */}
            <div
              className={`z-50 fixed bottom-0 w-full flex justify-around bg-gray-800 text-white md:hidden border-t border-gray-700`}
            >
              {items.map((item: any) => (
                <button
                  key={item.key}
                  className={` ${
                    currLoc === item.route && "text-blue-500"
                  } flex flex-col items-center py-2`}
                  onClick={() => {
                    item.route === "/" ? logout() : navigate(item.route);
                  }}
                >
                  {item.icon}
                  <span className="text-xs">{item.label}</span>
                </button>
              ))}
            </div>

            <Layout>
              <Header
                style={{
                  padding: 0,
                  background: colorBgContainer,
                  height: 110,
                }}
              >
                {/* <LogoComponent /> */}
                <div className="flex items-center justify-center">
                  <Stories />
                </div>
              </Header>
              <Content className={`${!collapsed ? "ml-[200px]" : "ml-[16px]"}`}>
                <br />
                <div
                  style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                  }}
                >
                  <Routes>
                    <Route
                      path="/posts"
                      element={
                        <div className="flex justify-around">
                          <Posts />
                          <div className="xl:block hidden">
                            <SuggestedPeople />
                          </div>
                        </div>
                      }
                    ></Route>

                    <Route path="/events" element={<Events></Events>}></Route>
                    <Route path="/discussions" element={<Discussion />}></Route>
                    <Route path="/create" element={<CreatePost />}></Route>
                    <Route path="/people" element={<People />}></Route>
                  </Routes>
                  {openChat && <Chat />}
                </div>
              </Content>

              <Footer
                style={{
                  textAlign: "center",
                }}
              >
                Yogesh Manni ©{new Date().getFullYear()}
              </Footer>
            </Layout>
          </Layout>
        )}
      </ChatContext.Provider>
    </>
  );
};

export default App;
