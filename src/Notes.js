import styled from "styled-components";

const Notes = ({ notes }) => {
  return (
    <StyledNotesWrapper>
      {notes.map((note, i) => (
        <StyledNote key={i}>{note}</StyledNote>
      ))}
    </StyledNotesWrapper>
  );
};

const StyledNote = styled.li`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: black;
  text-align: left;
`;

const StyledNotesWrapper = styled.ul`
  width: 100%;
  margin-top: 2em;
  padding-right: 0.3em;
  box-sizing: border-box;
  max-height: 160px;
  overflow: auto;
`;

export default Notes;
