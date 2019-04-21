import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql, gql } from "../common";

const Stack = props => (
  <tr>
    <td>{props.stack.name}</td>
    <td>{props.stack.description}</td>
    <td>{props.stack.default_language}</td>
    <td>
      <Link to={"/stack/" + props.stack.id}>View</Link>
    </td>
    <td>
      <Link to={"/stack/edit/" + props.stack.id}>Edit</Link>
    </td>
  </tr>
);

export default class StacksList extends Component {
  constructor(props) {
    super(props);
    this.state = { stacks: [] };
  }

  render() {
    return (
      <div>
        <h3>Stacks</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Default Language</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>{this.stacksList()}</tbody>
        </table>
      </div>
    );
  }

  stacksList() {
    return this.state.stacks.map(function(c, i) {
      console.log(c);
      return <Stack stack={c} key={i} />;
    });
  }

  componentDidMount() {
    graphql
      .query({
        query: gql`
          {
            stacks {
              id
              name
              description
              defaultLanguage
            }
          }
        `
      })
      .then(result => {
        console.log(result.data.stacks);
        this.setState({ stacks: result.data.stacks });
      });
  }
}
