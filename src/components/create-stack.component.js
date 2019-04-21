import React, { Component } from "react";
import { graphql, gql } from "../common";

export default class CreateStack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stack_name: "",
      stack_default_language: ""
    };
    this.onChangeStackName = this.onChangeStackName.bind(this);
    this.onChangeDefaultLanguage = this.onChangeDefaultLanguage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeStackName(e) {
    this.setState({
      stack_name: e.target.value
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
    console.log(`Stack Created: ${this.state.stack_name}`);

    const newStack = {
      stack_name: this.state.stack_name,
      stack_description: this.state.stack_description,
      stack_default_language: this.state.stack_default_language
    };

    graphql
      .mutate({
        mutation: gql`
          {
            createStack(${newStack}) {
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
          stack_description: response.data.stack_description,
          stack_default_language: response.data.stack_default_language
        });
      });

    // axios
    //   .post("http://localhost:4000/stacks/add", newStack)
    //   .then(res => console.log(res.data));

    this.setState({
      stack_name: "",
      stack_default_language: ""
    });

    this.props.history.push("/");
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Create New Stack</h3>
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
            <label>Defalt Language: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.stack_default_language}
              onChange={this.onChangeDefaultLanguage}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Stack"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
