import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GameService from "../../service/game.service";
import "../../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gameService from "../../service/game.service";
export default class UpdateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      newTitle: "",
      newDescription: "",
      newUrl: "",
      newIframe: "",
      _id: "",
    };
    GameService.getAll().then((res) => {
      console.log(res.data);
      this.setState({ games: res.data });
    });
    this.updateForm = React.createRef();
  }
  Update = (_id) => {
    this.updateForm.current.className = "update-admin display";
    this.setState({ _id: _id });
  };
  CloseUpdate = (e) => {
    e.preventDefault();
    this.updateForm.current.className = "update-admin hidden";
  };
  UpdateGame = (e) => {
    e.preventDefault();
    const _id = this.state._id;
    let newData = {
      newTitle: this.state.newTitle,
      newDescription: this.state.newDescription,
      newUrl: this.state.newUrl,
      newIframe: this.state.newIframe,
    };
    gameService.update(_id, newData).then((req, res) => {
      toast.info("Cập nhật thành công ", {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      let updateGames = this.state.games.map((game, id) => {
        if (game._id !== _id) {
          return game;
        } else {
          return {
            _id: _id,
            title: req.data.title,
            description: req.data.description,
            url: req.data.url,
            iframe: req.data.iframe,
          };
        }
      });
      console.log(updateGames);
      this.setState({ games: updateGames });
    });
    //===================
    this.updateForm.current.className = "update-admin hidden";
    this.setState({
      newTitle: "",
      newDescription: "",
      newUrl: "",
      newIframe: "",
    });
  };
  onUpdateGame = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <ToastContainer />
        {/* Same as */}
        <ToastContainer />
        <div className="update-admin hidden" ref={this.updateForm}>
          <div className="black-back"></div>
          <form onSubmit={this.UpdateGame} className="form-update">
            <input
              onChange={this.onUpdateGame}
              value={this.state.newTitle}
              name="newTitle"
              placeholder="Title..."
              className="form-control inputUpdate"
            />
            <input
              name="newDescription"
              value={this.state.newDescription}
              placeholder="Description..."
              onChange={this.onUpdateGame}
              className="form-control inputUpdate"
            />
            <input
              name="newUrl"
              value={this.state.newUrl}
              placeholder="Url..."
              onChange={this.onUpdateGame}
              className="form-control inputUpdate"
            />
            <input
              name="newIframe"
              value={this.state.newIframe}
              placeholder="Iframe..."
              onChange={this.onUpdateGame}
              className="form-control inputUpdate"
            />
            <input
              className="btn btn-block btn-info"
              type="submit"
              value="update"
            />
            <button
              className="btn btn-light close-update"
              onClick={this.CloseUpdate}
            >
              ❌
            </button>
          </form>
        </div>
        <div className="enter"></div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">_id</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Url</th>
              <th scope="col">Iframe</th>
              <th scope="col">Function</th>
            </tr>
          </thead>
          <tbody>
            {this.state.games.map((game, id) => {
              return (
                <tr key={id}>
                  <th>{game._id}</th>
                  <td>{game.title}</td>
                  <td>{game.description}</td>
                  <td>
                    {game.url && game.url.length >= 15
                      ? game.url.length
                      : game.url}
                  </td>
                  <td>
                    {game.iframe.length >= 15
                      ? game.iframe.length
                      : game.iframe}
                  </td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        this.Update(game._id);
                      }}
                    >
                      <i class="fa fa-refresh" aria-hidden="true"></i>
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