import React, { useState, useEffect } from "react";
import "./ChatPage.css";
import { Getallfollowersforuser } from "../api/getallfollowers";
import { msg } from "../api/msg";
import clicktochat from "../images/Designer.png";
import io from "socket.io-client";
const socket = io("http://localhost:3003");
const ChatPage = (props) => {
  const { RoomId } = props;
  const [sideusers, setsideusers] = useState([]);
  const [Messages, setMessages] = useState([]);
  const [Note, setNote] = useState({ message: "" });
  const currentuser = localStorage.getItem("token");
  useEffect(() => {
    // Loadpreviousmessages();
    loadinactiveusers();
  }, []);

  socket.on("messagerec", (message) => {
    // setMessages([
    //   ...messages,
    //   `[ ${message.sender_id}, ${message.data},'2023-05-18 00:27:45']`,
    // ]);
    console.log(message);
    let finalmsg = [[message.sender_id, message.data, "2023-05-18 00:27:45"]];
    setMessages(Messages.concat(finalmsg));

    console.log(Messages);
  });

  const HandleUserClick = (e) => {
    console.log(e);
    socket.emit("connectuser", { sender_id: currentuser, reciever_id: e });
    Loadpreviousmessages();
  };
  const loadinactiveusers = async () => {
    const { data } = await Getallfollowersforuser(currentuser);

    setsideusers(data);

    console.log(sideusers);
  };

  const Loadpreviousmessages = async () => {
    // console.log(RoomId);
    const { data } = await msg(RoomId);

    const dictValues = eval(data[0][0]);
    for (let i = 0; i < dictValues.length; i++) {
      const action = Object.values(dictValues[i]);
      console.log(action);
      setMessages((Messages) => [...Messages, action]);
    }
    console.log(Messages);

    // console.log(action);
    // const das=JSON.parse(Messages[0][0])
    // console.log(das);

    // console.log(data[0][0]);
  };
  const onChange = (e) => {
    setNote({ ...Note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />

      <div class="container">
        <div class="row clearfix">
          <div class="col-lg-12">
            <div class="card chat-app">
              <div id="plist" class="people-list">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fa fa-search"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search..."
                  />
                </div>
                <ul class="list-unstyled chat-list mt-2 mb-0 for-scrollbar">
                  {sideusers.length
                    ? sideusers.map((e, index) => {
                        return (
                          <li
                            class="clearfix active"
                            key={index}
                            onClick={() => HandleUserClick(e[0])}
                          >
                            <img src={e[6]} alt="avatar" />
                            <div class="about">
                              <div class="name">{e[3]}</div>
                              <div class="status">
                                {" "}
                                <i class="fa fa-circle online"></i> online{" "}
                              </div>
                            </div>
                          </li>
                        );
                      })
                    : null}

                  {/* <li class="clearfix">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="avatar"
                    />
                    <div class="about">
                      <div class="name">Christian Kelly</div>
                      <div class="status">
                        {" "}
                        <i class="fa fa-circle offline"></i> left 10 hours ago{" "}
                      </div>
                    </div>
                  </li>
            
                  <li class="clearfix">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      alt="avatar"
                    />
                    <div class="about">
                      <div class="name">Dean Henry</div>
                      <div class="status">
                        {" "}
                        <i class="fa fa-circle offline"></i> offline since Oct
                        28{" "}
                      </div>
                    </div>
                  </li> */}
                </ul>
              </div>
              <div class="chat">
                <div class="chat-header clearfix">
                  <div class="row">
                    <div class="col-lg-6">
                      <a
                        href="javascript:void(0);"
                        data-toggle="modal"
                        data-target="#view_info"
                      >
                        <img
                          src={sideusers.length ? sideusers[0][6] : null}
                          alt="avatar"
                        />
                      </a>
                      <div class="chat-about">
                        <h6 class="m-b-0">
                          {sideusers.length ? sideusers[0][3] : null}
                        </h6>
                        <small>Last seen: 2 hours ago</small>
                      </div>
                    </div>
                    <div class="col-lg-6 hidden-sm text-right">
                      <a
                        href="javascript:void(0);"
                        class="btn btn-outline-secondary"
                      >
                        <i class="fa fa-camera"></i>
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-outline-primary"
                      >
                        <i class="fa fa-image"></i>
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-outline-info"
                      >
                        <i class="fa fa-cogs"></i>
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-outline-warning"
                      >
                        <i class="fa fa-question"></i>
                      </a>
                    </div>
                  </div>
                </div>
                {Messages.length ? (
                  <div class="chat-history">
                    <ul class="m-b-0">
                      {Messages.map((e, index) => {
                        return e[0] === currentuser ? (
                          <li class="clearfix" key={index}>
                            <div class="message-data">
                              <span class="message-data-time">
                                10:12 AM, Today
                              </span>
                            </div>
                            <div class="message my-message">{e[1]}</div>
                          </li>
                        ) : (
                          <li class="clearfix" key={index}>
                            <div class="message-data text-right">
                              <span class="message-data-time">
                                10:10 AM, Today
                              </span>
                              <img src={clicktochat} alt="avatar" />
                            </div>
                            <div class="message other-message float-right">
                              {e[1]}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : (
                  <img
                    src={clicktochat}
                    alt="avatar"
                    height={200}
                    width={400}
                  />
                )}
                <div class="chat-message clearfix">
                  <div class="input-group mb-0">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="fa fa-send" onClick={props.sendMessage}></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter text here..."
                      id="textinput"
                      onChange={onChange}
                      // value={Note.message}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
