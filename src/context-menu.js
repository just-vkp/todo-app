import React from "react";

class ContextMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xPos: "0px",
      yPos: "0px",
      showMenu: false,
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClick);
    document.addEventListener("click", this.handleContextMenu);
  }

  handleClick = (event) => {
    if (this.state.showMenu) {
      this.setState({ showMenu: false });
    }
  };

  handleContextMenu = (event) => {
    event.preventDefault();

    this.setState({
      xPos: `${event.pageX}px`,
      yPos: `${event.pageY}px`,
      showMenu: true,
    });
  };
  render() {
    const { showMenu, xPos, yPos } = this.state;
    if (showMenu) {
      return (
        <ul className="contextMenu" style={{ top: xPos, left: yPos }}>
          <li>Edit</li>
          <li>Delete</li>
        </ul>
      );
    } else return null;
  }
}

export default ContextMenu;

// document.addEventListener("contextMenu", (event) => {
//   event.preventDefault();
//   const xPos = `${event.pageX}px`;
//   const yPos = `${event.pageY}px`;
// });
