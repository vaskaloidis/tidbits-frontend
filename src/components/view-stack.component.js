import React, { Component } from "react";
import { Link } from "react-router-dom";

import { graphql, gql } from "../common";

const Tidbit = props => (
  <tr>
    <td>{props.stack.name}</td>
    <td>{props.stack.language}</td>
    <td>
      <Link to={"/tidbit/edit/" + props.stack.id}>Edit</Link>
    </td>
  </tr>
);

export default class ViewStack extends Component {
  constructor(props) {
    super(props);
    this.state = { tidbits: [] };
  }

  render() {
    return (
      <div>
        <h3>Stacks</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Language</th>
            </tr>
          </thead>
          <tbody>{this.tidbitsList()}</tbody>
        </table>
      </div>
    );
  }

  tidbitsList() {
    return this.state.stack.tidbits.map(function(c, i) {
      return <Tidbit tidbit={c} key={i} />;
    });
  }

  componentDidMount() {
    console.log("We are here");
    console.log(this.props.match.params.id);
    graphql
      .query({
        query: gql`
          {
            stack(id: ${this.props.match.params.id}) {
              name
              description
              defaultLanguage
              tidbits {
                id
                name
                language
                bits {
                  content
                }
              }
            }
          }
        `
      })
      .then(result => {
        console.log(result);
        this.setState({ stack: result.data.stack });
      });
  }
}
