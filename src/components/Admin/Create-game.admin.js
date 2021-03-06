import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GameService from "../../service/game.service";
import "../../App.css";
import { ToastContainer, toast } from "react-toastify";
import { Link, Route, Switch } from "react-router-dom";
import home_route from "../http_route/http-common";
import "./admin.css";
export default class CreateGame extends Component {
  random_x2y = (x, y) => {
    return Math.floor(Math.random() * y) + x;
  };
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: this.random_x2y(2000, 5000).toString(),
      url: "https://athevinha.github.io/GameJS/img_games/",
      iframe: "",
      how2play: "",
      love_game: false,
      mobile_game: false,
      rank: [],
    };
  }
  onCreateGame = (e) => {
    // console.log(e.target.name + ": " + e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  componentDidMount() {
    let home_link = home_route.home_link().baseURL;
    if (localStorage.tooken != "5NuPrvZgrVhHqKUsmxLXDt4B49Qdx72Gf7LP2Qxx") {
      window.location = home_link;
    }
  }
  CreateGame = (e) => {
    e.preventDefault();
    GameService.create(this.state)
      .then((req, res) => {
        this.setState({
          title: "",
          description: this.random_x2y(2000, 5000).toString(),
          url: "https://athevinha.github.io/GameJS/img_games/",
          iframe: "",
          how2play: "",
          love_game: false,
          mobile_game: false,
          rank: [],
        });
        toast.info("Thêm game thành công ", {
          position: "top-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        if (!error.response) {
          // network error
          this.errorStatus = "Error: Network Error";
        } else {
          this.errorStatus = error.response.data.message;
        }
      });
  };
  render() {
    return (
      <div className="dark_blue">
        <ToastContainer />
        {/* Same as */}
        <ToastContainer />
        <form onSubmit={this.CreateGame} className="form">
          <Link
            className="btn btn-success"
            style={{ marginRight: "20px" }}
            to={"/admin/games/create"}
          >
            Create
          </Link>
          <Link
            className="btn btn-primary"
            style={{ marginRight: "20px" }}
            to={"/admin/games/update"}
          >
            Update
          </Link>
          <Link
            className="btn btn-danger"
            style={{ marginRight: "20px" }}
            to={"/admin/games/delete"}
          >
            Delete
          </Link>
          <Link
            className="btn btn-light"
            style={{ marginRight: "20px" }}
            to={"/admin/games/read"}
          >
            Read
          </Link>
          <input
            onChange={this.onCreateGame}
            value={this.state.title}
            name="title"
            placeholder="Title..."
            className="form-control formCreate input_N"
          />
          <input
            name="description"
            value={this.state.description}
            placeholder="Description..."
            onChange={this.onCreateGame}
            className="form-control formCreate input_N"
          />
          <input
            name="url"
            value={this.state.url}
            placeholder="Url..."
            onChange={this.onCreateGame}
            className="form-control formCreate input_N"
          />
          <input
            name="iframe"
            value={this.state.iframe}
            placeholder="Iframe..."
            onChange={this.onCreateGame}
            className="form-control formCreate input_N"
          />
          <input
            name="how2play"
            value={this.state.how2play}
            placeholder="How to play game..."
            onChange={this.onCreateGame}
            className="form-control formCreate input_N"
          />
          {/* ==================== Form Check Love game ====================== */}
          <p className="lovegame_lab table_admin_delete">Love game ❤ ?</p>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input formCreate "
              type="radio"
              id="inlineCheckbox1"
              name="love_game"
              value={false}
              onChange={this.onCreateGame}
            />
            <label
              class="form-check-label table_admin_delete"
              for="inlineCheckbox1 input_N"
            >
              FALSE
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input formCreate "
              type="radio"
              id="inlineCheckbox2"
              name="love_game"
              value={true}
              onChange={this.onCreateGame}
            />
            <label
              class="form-check-label table_admin_delete"
              for="inlineCheckbox2 input_N"
            >
              TRUE
            </label>
          </div>
          {/* ==================== Form Check Mobile Game ====================== */}
          <p className="lovegame_lab table_admin_delete">Mobile Game 📱 ?</p>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input formCreate "
              type="radio"
              id="inlineCheckbox1"
              name="mobile_game"
              value={false}
              onChange={this.onCreateGame}
            />
            <label
              class="form-check-label table_admin_delete"
              for="inlineCheckbox1 input_N"
            >
              FALSE
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input formCreate "
              type="radio"
              id="inlineCheckbox2"
              name="mobile_game"
              value={true}
              onChange={this.onCreateGame}
            />
            <label
              class="form-check-label table_admin_delete"
              for="inlineCheckbox2 input_N"
            >
              TRUE
            </label>
          </div>
          <input
            className="btn btn-block btn-danger playButton createButton"
            type="submit"
            value="CREATE"
          />
        </form>
      </div>
    );
  }
}
