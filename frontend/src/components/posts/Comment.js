import React, { useEffect, useState, useRef } from "react";
import { add_comment } from "../../api/addcomment";
import { getallcomment } from "../../api/getallcomments";
import { gettags } from "../../api/gettags";
import { translate } from "../../api/translate";

const Comment = (props) => {
  let user_id = localStorage.getItem('token')
  useEffect(() => {
    loadcomments();
    loadtags();
  }, []);

  const inputRef = useRef(null);
  const translateRef = useRef(null);

  const [comments, setcomments] = useState([]);
  const [tags, settags] = useState([]);

  const handletranslate = async (text, ele) => {
    let data = await translate(text);
    let retext = data.data["message"];
    let index = comments.indexOf(ele);
    let newarray = [...comments];
    newarray[index][3] = retext;
    setcomments(newarray);
  };
  const loadtags = async () => {
    let data = await gettags(props.post_id);
    if (data.status === 200) {
      settags(data.data);
    }
  };
  const loadcomments = async () => {
    let data = await getallcomment(props.post_id);
    if (data.status === 200) {
      setcomments(data.data);
    }
  };

  const addcomment = async () => {
    let data = await add_comment(
      inputRef.current.value,
      props.post_id,
      user_id
    );
    if (data.status === 200) {
      inputRef.current.value = "";
      loadcomments();
    }
  };
  return (
    <div className="w-full mb-3 border-t-2">
      <div className="flex my-2 text-stone-700">
        {tags.map((element) => {
          return <p key={element}>#{element[0]}</p>;
        })}
      </div>
      <div className="h-20 overflow-y-scroll">
        {comments.map((element) => {
          return (
            <div className="" key={element[0]}>
              <div className="mx-2 my-1" ref={translateRef}>
                {" "}
                {element[3]}{" "}
                <small>
                  <button
                    className="ml-3 text-stone-500 shadow-none hover:shadow-none"
                    onClick={() => handletranslate(element[3], element)}
                  >
                    translate comment
                  </button>
                </small>
              </div>{" "}
            </div>
          );
        })}
      </div>
      <div className="border-t-2 w-full">
        <small>{comments.length} comments</small>
      </div>

      <div className="flex justify-content-between pt-2">
        <input
          type="text"
          className="z-20 rounded focus:outline-none w-10/12"
          ref={inputRef}
          name="comment"
          placeholder="Add a comment"
        />
        <button
          onClick={addcomment}
          className="mx-2 text-sky-500 shadow-none hover:shadow-none"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Comment;
