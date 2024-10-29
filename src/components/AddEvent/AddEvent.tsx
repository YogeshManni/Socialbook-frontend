import React, {
  forwardRef,
  Component,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./AddEvent.css";
import moment from "moment";
import { getUser } from "../../helpers/helper";
import { Button, Form, Input, Modal } from "antd";
const AddEvent = forwardRef(({ getAddEvent, newPost, postData }: any, ref) => {
  const [content, setContent] = useState("");
  const [modelState, setModalState] = useState(false);
  const [eventName, SetEventName] = useState("");
  const [eventNameNotFound, SetEventNameNotFound] = useState(false);
  const editorRef = useRef<any>("");
  const editorContentRef = useRef<any>("");
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["link"],
      ["image"],
      ["clean"],
    ],
  };

  const isUpdate = () => {
    return postData !== null && postData.username === getUser().username;
  };

  const isNewOrUpdate = () => {
    return !postData || isUpdate();
  };

  const validateEventName = async () => {
    //validate if input is not empty or just spaces

    if (eventName.trim() === "" || eventName.length < 1) {
      SetEventNameNotFound(true);
      return;
    }

    if (postData != null && getUser().username !== postData.username) {
      getAddEvent(null);
    } else {
      const editorContent = editorContentRef.current.value;

      // Extract first image from article to show as thumbnail for events
      let rex = new RegExp('srcs*=s*"(.+?)"');
      let frontImage: any = rex.exec(editorContent);
      const data = {
        id: (postData && postData.id) || null,
        frontText: eventName,
        img: (frontImage && frontImage[1]) || null,
        avtSrc: "",
        userName: getUser().username,
        content: editorContent,
        date: moment().format("LLL"),
      };
      getAddEvent(data);
    }
    setModalState(false);
  };

  // react hook to call a method in child component from parent one
  useImperativeHandle(ref, () => ({
    addEvent() {
      // show modal only if same user is updating or its a new event
      isNewOrUpdate() ? setModalState(true) : getAddEvent(null);
      // set react quill's content again (Somehow its losing the data, possibility is because of re-render)
      setContent(editorContentRef.current.value);
    },
  }));

  const [editorHeight, setEditorHeight] = useState(10);

  useEffect(() => {
    let parentHeight = editorRef.current.parentElement.clientHeight;
    if (window.innerWidth < 500) parentHeight -= 60;
    setEditorHeight(parentHeight);
    if (isUpdate()) {
      console.log(postData.fronttext);
      SetEventName(postData.fronttext);
    }
    setContent(!newPost && postData.content);

    return () => {
      // console.log("unmounted!!");
    };
    // editorContentRef.current.value = postData;
  }, []);

  return (
    <>
      {/*  {newPost ? ( */}
      <div ref={editorRef}>
        <ReactQuill
          theme="snow"
          ref={editorContentRef}
          style={{ height: editorHeight - 50 }}
          value={content}
          /*  Show toolbar to owner of event only, hide in other cases  */
          modules={isNewOrUpdate() ? modules : { toolbar: false }}
          readOnly={
            postData === null || getUser().username === postData.username
              ? false
              : true
          }
        />
      </div>

      {modelState && (
        <Modal
          title={isUpdate() ? "Update Event" : "Enter event name"}
          open={true}
          okButtonProps={{ style: { backgroundColor: "#8b5cf6" } }}
          onCancel={() => setModalState(false)}
          width={500}
          footer={null}
          style={{ top: "30%" }}
        >
          <Form onFinish={validateEventName}>
            <Form.Item
              name="event"
              validateStatus={eventNameNotFound ? "error" : undefined}
              help={eventNameNotFound ? "Please enter event name!" : undefined}
            >
              <Input
                size="large"
                defaultValue={eventName}
                onChange={(e: any) => {
                  SetEventName(e.target.value);
                  SetEventNameNotFound(false);
                }}
                placeholder={isUpdate() ? "Update Event" : "Enter event name"}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                onClick={() => setModalState(false)}
                size="large"
                className="mr-5 "
              >
                Cancel
              </Button>
              <Button
                className=""
                type="primary"
                htmlType="submit"
                size="large"
              >
                {isUpdate() ? "Update" : "Create"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
});

export default AddEvent;
