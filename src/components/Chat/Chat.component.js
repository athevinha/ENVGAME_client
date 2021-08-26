import "./Chat.css";
import avatar_unknow from "./avatar.jpg";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../../service/user.service";
import { ToastContainer, toast } from "react-toastify";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";

const socket = io("http://3.0.241.73:5000/");
export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: "",
      listchat: [],
      scrollPixelsY: 0,
    };
    this.chat_content = React.createRef();
  }
  componentDidMount() {}
  componentWillUnmount() {
    let { user } = this.props;
    console.log(user);
  }
  onChat = (e) => {
    this.setState({ chat: e.target.value });
  };

  onSubmitChat = (e) => {
    e.preventDefault();
    if (this.state.chat != "") {
      const d = new Date();
      let mess_obj = {
        username:
          this.props.user.username == null
            ? "Unknowed"
            : this.props.user.username,
        mess: this.state.chat,
        image: this.props.user.avatar == null ? false : this.props.user.avatar,
        time: `${d.getHours()}:${d.getMinutes()} | ${d.getDate()}/${
          d.getMonth() + 1
        }/${d.getFullYear()}`,
      };
      socket.emit("send message", mess_obj);
      this.setState({ chat: "" });
    }
  };
  componentDidMount() {
    socket.on("send message", (res) => {
      let { listchat } = this.state;
      listchat.push(res.data);
      this.setState({ listchat: listchat });
    });
  }
  render() {
    return (
      <ScrollToBottom className="auto">
        <div className="background-iframe ">
          <div className="enter"></div>
          <div className="enter"></div>
          <ToastContainer />
          {/* Same as */}
          <ToastContainer />
          <div className="messages chat_router">
            {this.state.listchat.map((mess_obj, id) => {
              return (
                <div className="message">
                  <span key={id}>
                    <img
                      src={
                        mess_obj.image == false ? avatar_unknow : mess_obj.image
                      }
                      className="image_chat"
                    />
                    <i className="time_chat">
                      <small>{mess_obj.time}</small>
                    </i>
                    {" | "}
                    <b>{mess_obj.username}:</b> {mess_obj.mess}{" "}
                  </span>
                </div>
              );
            })}
            <div className="enter"></div>
            <div className="enter"></div>
            <div className="enter"></div>
            <div className="enter"></div>

            <form
              class="form-group"
              className="input_chat"
              onSubmit={this.onSubmitChat}
            >
              <input
                type="text"
                className="form-control input_T input_chat_mess"
                onChange={this.onChat}
                value={this.state.chat}
                aria-describedby="helpId"
                placeholder="Send Message..."
              />
              <button type="submit" className="btn btn-info submit_chat">
                <i class="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </ScrollToBottom>
    );
  }
}