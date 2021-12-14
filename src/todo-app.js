import React from "react";
import "./table.css";
import Table from "./table";
import ContextMenu from "./context-menu";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todoItems: [], itemName: "", completedTask: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleActionChange = this.handleActionChange.bind(this);
    this.handleDoneStatusChange = this.handleDoneStatusChange.bind(this);
    this.handleImportence = this.handleImportence.bind(this);
  }

  handleChange(event) {
    this.setState({ itemName: event.target.value }, () => {});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.itemName.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.itemName,
      id: Date.now(),
      status: "New",
      importence: false,
      deadline: "Today",
    };
    this.setState((state) => ({
      todoItems: [newItem, ...state.todoItems],
      itemName: "",
    }));
  }

  handleImportence(event, id) {
    const selectedId = id;
    const todoItems = [...this.state.todoItems];
    const taskIndex = todoItems.findIndex((i) => i.id === selectedId);
    if (
      event.target.checked === true &&
      todoItems[taskIndex].importence !== true
    ) {
      todoItems[taskIndex].importence = true;
    } else {
      todoItems[taskIndex].importence = false;
    }
    this.setState({ todoItems: todoItems }, () => {
      console.log(this.state.todoItems);
    });
  }

  handleActionChange(event, id) {
    const selectedId = id;
    const todoItems = [...this.state.todoItems];
    this.state.todoItems.map((item) => {
      if (item.id === selectedId) {
        item.status = event.target.value;
        let index = todoItems.indexOf(item);
        if (event.target.value === "Done") {
          let doneTask = todoItems.splice(index, 1);
          let doneTasks = [...doneTask, ...this.state.completedTask];
          this.setState({ completedTask: doneTasks });
        }
      }
      return todoItems;
    });
    this.setState({ todoItems: todoItems, itemName: "" });
  }

  handleDoneStatusChange(event, id) {
    const selectedId = id;
    const completedTask = [...this.state.completedTask];
    const taskIndex = completedTask.findIndex((i) => i.id === selectedId);
    if (taskIndex !== -1) {
      const unDoneTask = completedTask.splice(taskIndex, 1);
      unDoneTask[0]["status"] = event.target.value;
      this.setState({
        todoItems: [...this.state.todoItems, ...unDoneTask],
        completedTask: completedTask,
        itemName: "",
      });
    }
  }

  render() {
    return (
      <div>
        <h3>TODO APP</h3>
        <ContextMenu />
        <select>
          <option value="Today">Today</option>
          <option value="Tomorrow">Tomorrow</option>
          <option value="This Week">This Week</option>
        </select>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo-item">Set your Next Task: </label>
          <input onChange={this.handleChange} value={this.state.itemName} />
          <button>Add #{this.state.todoItems.length + 1} Task</button>
        </form>
        <hr />
        <Table
          todoItems={this.state.todoItems}
          handleActionChange={this.handleActionChange}
          handleImportence={this.handleImportence}
        />
        <hr />
        <h5>Completed Task : {this.state.completedTask.length}</h5>
        <Table
          todoItems={this.state.completedTask}
          handleActionChange={this.handleDoneStatusChange}
        />
      </div>
    );
  }
}

export default Todo;
