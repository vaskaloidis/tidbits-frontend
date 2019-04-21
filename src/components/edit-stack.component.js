import React, { Component } from "react";
import { graphql, gql } from "../common";

export default class EditStack extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDefaultLanguage = this.onChangeDefaultLanguage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      stack_name: "",
      stack_description: "",
      stack_default_language: ""
    };
  }

  componentDidMount() {
    graphql
      .query({
        query: gql`
            {
              stack(id: ${this.props.match.params.id}) {
                name
                description
                defaultLanguage
              }
            }
          `
      })
      .then(response => {
        console.log(response);
        this.setState({
          stack_name: response.data.stack.name,
          stack_description: response.data.stack_description,
          stack_default_language: response.data.stack_default_language
        });
      });
  }

  onChangeName(e) {
    this.setState({
      stack_name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      stack_description: e.target.value
    });
  }

  onChangeDefaultLanguage(e) {
    this.setState({
      stack_default_language: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      id: this.props.match.params.id,
      stack_name: this.state.stack_name,
      stack_description: this.state.stack_description,
      stack_default_language: this.state.stack_default_language
    };
    graphql
      .mutate({
        mutation: gql`
          {
            updateStack(id: ${this.props.match.params.id}) {
              name
              description
              defaultLanguage
            }
          }
        `
      })
      .then(response => {
        console.log(response);
        this.setState({
          stack_name: response.data.stack_name,
          stack_description: response.data.stack_description,
          stack_default_language: response.data.stack_default_language
        });
      });
    // axios
    //   .post(
    //     "http://localhost:4000/todos/update/" + this.props.match.params.id,
    //     obj
    //   )
    //   .then(res => console.log(res.data));

    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <h3>Update Stack</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.stack_name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.stack_description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Default Language: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.stack_default_language}
              onChange={this.onChangeDefaultLanguage}
            />
          </div>
          <input
            type="submit"
            value="Update Stack"
            className="btn btn-primary"
          />
        </form>
      </div>
    );
  }
}
