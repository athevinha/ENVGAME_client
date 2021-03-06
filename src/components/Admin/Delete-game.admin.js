import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import GameService from "../../service/game.service";
import "../../App.css";
import { Link, Route, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import home_route from "../http_route/http-common";
export default class DeleteGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
    GameService.getAll().then((res) => {
      this.setState({ games: res.data });
    });
  }
  componentDidMount() {
    let home_link = home_route.home_link().baseURL;
    if (localStorage.tooken != "5NuPrvZgrVhHqKUsmxLXDt4B49Qdx72Gf7LP2Qxx") {
      window.location = home_link;
    }
  }
  Delete = (_id) => {
    GameService.delete(_id).then((res) => {
      toast.error(res.data, {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
    this.setState({
      games: this.state.games.filter((game) => game._id !== _id),
    });
  };
  render() {
    return (
      <div>
        <ToastContainer />
        {/* Same as */}
        <ToastContainer />
        <div className="enter_admin"></div>
        <hr />
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
        <hr />
        <table className="table table table_admin_delete">
          <thead>
            <tr>
              <th scope="col">_id</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Url</th>
              <th scope="col">Iframe</th>
              <th scope="col">TYPE</th>
              <th scope="col">Function</th>
            </tr>
          </thead>
          <tbody>
            {this.state.games.map((game, id) => {
              return (
                <tr
                  key={id}
                  className={game.love_game == true ? "love_game_tr" : ""}
                >
                  <th>{game._id}</th>
                  <td>{game.title}</td>
                  <td>{game.description}</td>
                  <td>{game.url.length >= 15 ? game.url.length : game.url}</td>
                  <td>
                    {game.iframe.length >= 15
                      ? game.iframe.length
                      : game.iframe}
                  </td>
                  <td>{game.mobile_game == true ? "MOBILE" : "PC"}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        this.Delete(game._id);
                      }}
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
