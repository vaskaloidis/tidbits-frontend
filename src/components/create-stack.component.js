import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class CreateChunk extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chunk_name: "",
      chunk_default_language: "",
      chunk_created: ""
    };
    this.onChangeChunkName = this.onChangeChunkName.bind(this);
    this.onChangeDefaultLanguage = this.onChangeDefaultLanguage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeChunkName(e) {
    this.setState({
      chunk_name: e.target.value
    });
  }

  onChangeDefaultLanguage(e) {
    this.setState({
      todo_responsible: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Chunk Created: ${this.state.chunk_name}`);

    const newChunk = {
      chunk_name: this.state.chunk_name,
      chunk_default_language: this.state.chunk_default_language
    };

    axios
      .post("http://localhost:4000/chunks/add", newChunk)
      .then(res => console.log(res.data));

    this.setState({
      chunk_name: "",
      chunk_default_language: "",
      chunk_created: ""
    });

    this.props.history.push("/");
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Create New Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_description}
              onChange={this.onChangeTodoDescription}
            />
          </div>
          <div className="form-group">
            <label>Responsible: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_responsible}
              onChange={this.onChangeTodoResponsible}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Low"
                checked={this.state.todo_priority === "Low"}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Medium"
                checked={this.state.todo_priority === "Medium"}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="High"
                checked={this.state.todo_priority === "High"}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">High</label>
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Todo"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
