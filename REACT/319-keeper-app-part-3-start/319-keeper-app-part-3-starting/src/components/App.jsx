import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [items, setItems] = useState([]);

  function addItem(newNote) {
    setItems(prevItems => [...prevItems, newNote]);
  }

  function deleteItem(id) {
    setItems(prevItems => {
      return prevItems.filter((item, index) => index !== id)
    });
  }
  

  return (
    <div>
      <Header />
      <CreateArea addItem={addItem}/>
      {items.map((item, index) => (
        <Note key={index} id={index} title={item.title} content={item.content} onDelete={deleteItem} />
      ))}
      <Footer />
    </div>
  );
}

export default App;
