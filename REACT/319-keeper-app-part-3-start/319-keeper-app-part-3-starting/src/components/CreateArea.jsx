import React, { useState } from "react";

function CreateArea(props) {
  const [note,setNote] = useState({
    title: "",
    content: "",
  })

  function handleChange(event) {
    const {name, value} = event.target;
    setNote(prevNote => {
      return{
        ...prevNote,
        [name]: value
      };
    })
  }

  function handleSubmit(event) {
    props.addItem(note);
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault(); // prevent default form submission behavior

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={note.title} onChange={handleChange} name="title" placeholder="Title" />
        <textarea value={note.content} onChange={handleChange} name="content" placeholder="Take a note..." rows="3" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
