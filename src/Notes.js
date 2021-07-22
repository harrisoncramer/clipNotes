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

const StyledNote = styled.p`
  font-size: 1.3em;
  color: black;
  text-align: left;
`;

const StyledNotesWrapper = styled.div`
  max-height: 160px;
  overflow: auto;
  padding: 1em;
`;

export default Notes;
