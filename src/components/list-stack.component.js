import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Stack = props => (
  <tr>
    <td>{props.stack.stack_name}</td>
    <td>{props.stack.stack_created}</td>
    <td>{props.stack.stack_default_language}</td>
    <td>
      <Link to={"/stack/edit/" + props.todo._id}>Edit</Link>
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.stacksList()}</tbody>
        </table>
      </div>
    );
  }

  stacksList() {
    return this.state.stacks.map(function(c, i) {
      return <Stack stack={c} key={i} />;
    });
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/stacks/")
      .then(response => {
        this.setState({ stacks: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
