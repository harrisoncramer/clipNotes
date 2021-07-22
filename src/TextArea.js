import React, { Component } from "react";
import { saveNote, getUrl, clearNotes } from "./util";
import styled from "styled-components";

class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textAreaValue: "",
      url: "", // For displaying...
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickOne = this.handleClickOne.bind(this);
    this.handleClickTwo = this.handleClickTwo.bind(this);
  }

  componentDidMount() {
    getUrl().then(({ url }) => {
      this.setState((state) => ({ ...state, url }));
    });
  }

  handleChange(event) {
    this.setState({ textAreaValue: event.target.value });
  }

  handleClickTwo(event) {
    getUrl()
      .then(({ url }) => clearNotes({ url }))
      .then(() => {
        this.props.setNotes([]);
        this.setState({ textAreaValue: "" });
      });
  }

  handleClickOne(event) {
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
      <div style={{ position: "relative" }}>
        <StyledH2>clipNotes</StyledH2>
        <StyledH3>{this.state.url}</StyledH3>
        <StyledTextArea
          value={this.state.textAreaValue}
          onChange={this.handleChange}
        />
        <ButtonWrapper>
          <StyledButton className="firstButton" onClick={this.handleClickOne}>
            Save
          </StyledButton>
          <StyledButtonAlt onClick={this.handleClickTwo}>Clear</StyledButtonAlt>
        </ButtonWrapper>
      </div>
    );
  }
}

const ButtonWrapper = styled.div`
  position: absolute;
  z-index: 100;
  margin-top: -30px;
  margin-left: 110px;
  .firstButton {
    margin-right: 0.4em;
  }
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled.button`
  --color: lightblue;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);

  &:hover {
    filter: brightness(108%);
    cursor: pointer;
  }

  color: black;
  background: var(--color);
  border-radius: 3px;
  border: none;
  padding: 0.25em 0.85em;
  font-size: 1.3em;
`;

const StyledButtonAlt = styled.button`
  --color: #f39e31;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);

  &:hover {
    filter: brightness(108%);
    cursor: pointer;
  }

  color: black;
  background: var(--color);
  border-radius: 3px;
  border: none;
  padding: 0.25em 0.85em;
  font-size: 1.3em;
`;

const StyledTextArea = styled.textarea`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  outline: none;
  resize: none;
  padding: 1em;
  font-size: 1.5em;
  background-color: #f8ee98;
  width: 200px;
  height: 300px;
`;

const StyledH3 = styled.h3`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  background-color: #6e3825;
  padding-bottom: 0.5em;
  margin: 0px;
  color: white;
`;

const StyledH2 = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  background-color: #6e3825;
  margin: 0px;
  padding: 0.5em;
  padding-bottom: 0px;
  color: white;
`;

export default TextArea;
