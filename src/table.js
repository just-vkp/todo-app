import React from "react";
import "./table";

class Table extends React.Component {
  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Action</th>
              <th>Important?</th>
            </tr>
          </thead>
          <tbody>
            {this.props.todoItems.map((item) => (
              <tr key={item.id}>
                <td>{item.text}</td>
                <td>{item.status}</td>
                <td>
                  {
                    <select
                      value={item.status}
                      onChange={(event) =>
                        this.props.handleActionChange(event, item.id)
                      }
                    >
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  }
                </td>
                <td>
                  <input
                    type="checkbox"
                    value={item.importence}
                    checked={item.importence}
                    onChange={(event) =>
                      this.props.handleImportence(event, item.id)
                    }
                  />
                  <label>Yes</label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
