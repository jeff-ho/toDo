import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [toDoItem, setToDoItem] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [isEdit, setIsEdit] = useState("");
  const [newToDoItem, setNewToDoItem] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8001/api/items").then((res) => {
      setToDoList(res.data);
    });
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8001/api/item", {
        item: toDoItem,
      });

      setToDoList((prev) => [...prev, res.data]);
      setToDoItem("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/api/item/${id}`);
      const newToDoList = toDoList.filter((item) => item._id !== id);
      setToDoList(newToDoList);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateItem = async (id) => {
    try {
      await axios.put(`http://localhost:8001/api/item/${id}`, {
        item: newToDoItem,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const renderUpdateForm = (id) => {
    return (
      <form
        className="update-form-container"
        onSubmit={() => handleUpdateItem(id)}
      >
        <input
          className="update-form-input"
          type="text"
          value={newToDoItem}
          onChange={(e) => setNewToDoItem(e.target.value)}
        ></input>
        <button className="update-button" type="submit">
          Update
        </button>
      </form>
    );
  };

  return (
    <div className="App">
      <h1>To Do List</h1>
      <form className="todo-form" onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Add List Item"
          value={toDoItem}
          onChange={(e) => {
            setToDoItem(e.target.value);
          }}
        ></input>
        <button type="submit">Add</button>
      </form>
      <div className="list-items">
        {toDoList.map((item, i) => {
          return isEdit === item._id ? (
            renderUpdateForm(item._id)
          ) : (
            <div className="list-item-container" key={i}>
              <p className="list-item">{item.item}</p>
              <div className="button-container">
                <button
                  className="update-button"
                  onClick={() => {
                    setIsEdit(item._id);
                  }}
                >
                  Update
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteItem(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
