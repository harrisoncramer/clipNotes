import React, { Component } from "react";
import { saveNote, getUrl } from "./util";

class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textAreaValue: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ textAreaValue: event.target.value });
  }

  handleClick(event) {
    // Save note to chrome web storage...
    getUrl()
      .then(({ url }) => saveNote({ url, note: this.state.textAreaValue }))
      .then(() => {
        this.props.setNotes([...this.props.notes, this.state.textAreaValue]);
        this.setState({ textAreaValue: "" });
      });
  }

  render() {
    return (
      <div>
        <label>New Note:</label>
        <textarea
          value={this.state.textAreaValue}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>Save</button>
        <button onClick={this.handleGetNotes}>Get Notes</button>
      </div>
    );
  }
}

export default TextArea;

