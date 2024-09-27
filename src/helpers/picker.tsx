import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
function Emoji({ handleComment }: any) {
  return (
    <div>
      <Picker
        data={data}
        onEmojiSelect={(event: any) => {
          handleComment(event);
        }}
        style={{ zIndex: "99" }}
        className="z-30 !"
      />
    </div>
  );
}

export default Emoji;
