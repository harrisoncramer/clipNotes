const Notes = ({ notes }) => {
  console.log(notes);
  return (
    <>
      {notes.map((note, i) => (
        <div key={i}>{note}</div>
      ))}
    </>
  );
};

export default Notes;
