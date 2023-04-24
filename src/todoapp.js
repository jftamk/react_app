import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./todostyle.css";
//Init arrays
const list = [];
const taglist = [];
const filt = [];
const testtags = [];
const arcs = [];
let i = 1;
//Create empty arrays for sessionstorage
for (i = 0; i < 1; i++) {
  const newlist = [];
  const tostorage = JSON.stringify(newlist);
  sessionStorage.setItem("todos", tostorage);
  sessionStorage.setItem("arch", tostorage);
}
function TODOAPPComponent() {
  const [todo, setTodo] = useState(""); //Todo items
  const [tags, setTag] = useState(taglist); // For item tags
  const [testtag, settesttag] = useState(testtags); //For tag filtering
  const [arclist, setarc] = useState(arcs); //For archiving items

  const [editing, setediting] = useState(null);
  const [textEdit, settextEdit] = useState("");
  const [state, setState] = useState(list); //main list

  const [name, setName] = useState("");

  //Init with the todo list--------------
  useEffect(() => {
    const json = sessionStorage.getItem("todos");
    const lit = JSON.parse(json);
    setState(lit);
  }, []);

  //Add to do item-----------------------
  function handleSubmit(e) {
    e.preventDefault();
    //Object to be added to the to do list gets values from input
    const newItem = {
      todo: todo,
      tag: tags,
      time: new Date().toLocaleString(),
    };
    const json = sessionStorage.getItem("todos");
    const li = JSON.parse(json);
    li.push(newItem);
    li.forEach((o, i) => (o.id = i + 1)); //Add object to todo list and give id's for each.
    setTag(taglist);
    filt.push(tags);
    setState(li); //Set state to current to do list and add this version to sessionstorage.
    const json2 = JSON.stringify(li);
    sessionStorage.setItem("todos", json2);
  }

  //Delete to do--------------------------------
  function deleteTodo(id) {
    //Create list where id is not included
    const ok = [...state].filter((todo) => todo.id !== id);
    const json = JSON.stringify(ok);
    sessionStorage.setItem("todos", json);
    //Set this list to state
    setState(ok);
  }

  //Delete todo from archive-------------------
  function deletearcTodo(id) {
    const json = sessionStorage.getItem("arch");
    const archived = JSON.parse(json);
    //Get list from archive and create list where id not included.
    const ok = [...archived].filter((todo) => todo.id !== id);
    console.log(ok);
    //Add and update archive list
    const json1 = JSON.stringify(ok);
    sessionStorage.setItem("arch", json1);
    //Set this new archive list as state
    setarc(ok);
  }

  //Edit todo-------------------------------------
  function editTodo(id) {
    //Go through array and update values.
    const updatedTodos = [...state].map((todo) => {
      if (todo.id === id) {
        todo.todo = textEdit;
        todo.time = new Date().toLocaleString();
      }
      return todo;
    });
    //Set state with updated values
    setState(updatedTodos);
    //Add and update to sessionStorage
    const json4 = JSON.stringify(updatedTodos);
    sessionStorage.setItem("todos", json4);
    setediting(null);
  }

  //Search todo items--------------------------------
  function filterTodo(e) {
    //Get typed input as search word and filter where word is found and set as state.
    const searchword = e.target.value;
    if (searchword !== "") {
      const result = state.filter((list) => {
        return list.todo.toLowerCase().startsWith(searchword.toLowerCase());
      });
      setState(result);
    } else {
      console.log("empty");
    }

    setName(searchword);
  }

  //Filter by tags----------------------------------
  function filterTodotag() {
    const filteredtodos = [];
    const json3 = sessionStorage.getItem("todos");
    const fetchedtags = JSON.parse(json3);
    //get todo list and go through

    for (var y = 0; y < fetchedtags.length; y++) {
      var newobj = fetchedtags[y].tag;
      console.log(newobj);
      //loop second time to find where items in todo tags are also in inputted tags in filter field.
      for (let i = 0; i < testtag.length; i++) {
        if (newobj.includes(testtag[i])) {
          filteredtodos.push(fetchedtags[y]);
        }
      }
    }
    //Set state with found todos
    setState(filteredtodos);
  }

  //Show all items/reset search--------------------------------
  function showAll() {
    const json = sessionStorage.getItem("todos");
    const lid = JSON.parse(json);
    setState(lid);
  }

  //Show items in the archive------------------------------
  function showArchive() {
    const json = sessionStorage.getItem("arch");
    const lid = JSON.parse(json);
    setarc(lid);
  }
  //For drag and drop------------------------------------------
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(state);
    const [itemmoved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, itemmoved);
    setState(items);
  }

  //Move items marked as done to Done List---------------------
  function movetoArchive(id) {
    //Create list where id not included
    const tododone = [...state].filter((todo) => todo.id === id);
    const vari = tododone[0];
    const json = sessionStorage.getItem("arch");
    const archived = JSON.parse(json);
    archived.push(vari);
    //Add to archive list and state to do list where added is removed and in the archive list instead.
    const ok = [...state].filter((todo) => todo.id !== id);
    const json1 = JSON.stringify(ok);
    sessionStorage.setItem("todos", json1);
    setState(ok);

    archived.forEach((o, i) => (o.id = i + 1));
    setarc(archived);
    const json9 = JSON.stringify(archived);
    sessionStorage.setItem("arch", json9);
  }
  //Order by oldest items first
  function orderasc() {
    const json6 = sessionStorage.getItem("todos");
    const sortby = JSON.parse(json6);
    const timeorderasc = sortby.sort((a, b) => (a.time > b.time ? 1 : -1));
    setState(timeorderasc);
    const json7 = JSON.stringify(timeorderasc);
    sessionStorage.setItem("todos", json7);
  }

  //Order by last edited
  function orderdesc() {
    const json6 = sessionStorage.getItem("todos");
    const sortby = JSON.parse(json6);
    const timeorderdesc = sortby.sort((a, b) => (a.time < b.time ? 1 : -1));
    setState(timeorderdesc);
    const json8 = JSON.stringify(timeorderdesc);
    sessionStorage.setItem("todos", json8);
  }

  return (
    <div className="Apps">
      <h1>Todo List</h1>
      <div className="container">
        <div className="settings">
          <h2>ADD NEW</h2>
          <div style={{ background: "#89b5af", borderRadius: "5px" }}>
            <p>Todo: </p>
            <input
              placeholder="Add todo item"
              type="text"
              name="todo"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <p>Tags: </p>
            <div classname="taginit">{tags}</div>
            <input
              placeholder="Press enter to save tags"
              type="text"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  setTag([...tags, " #" + e.target.value]);
                  e.target.value = "";
                }
              }}
            />
            <br></br>
            <button onClick={handleSubmit}>Add to the list</button>
          </div>
          <div className="searchitems">
            <p>Search: </p>
            <input
              placeholder="Search todo items"
              onChange={filterTodo}
              className="input"
            />
          </div>
          <div className="filtertags">
            <p>Filter by tag(s): </p> <br></br>
            <input
              placeholder="Press enter to save tag"
              type="text"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  settesttag([...testtag, " #" + e.target.value]);
                  e.target.value = "";
                }
              }}
            />{" "}
            <button onClick={filterTodotag}>Filter</button>{" "}
            <button onClick={(e) => settesttag(testtags)}>Reset tags</button>
            <br></br>
            <div classname="taginit">{testtag}</div>
          </div>
          <button
            className="showall"
            onClick={showAll}
            style={{ fontSize: "20px" }}
          >
            Show all items / <br></br>
            Reset search/filtering
          </button>
          <div style={{ background: "#89b5af", borderRadius: "5px" }}>
            <h4>Order by editing time</h4>
            <button onClick={orderasc}>Oldest items first</button>
            <button onClick={orderdesc}>Last edited first</button>
          </div>
          <br></br>
        </div>

        <div classname="todolist">
          <h2>TO DO LIST</h2>
          <DragDropContext classname="todolist" onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="dropp">
              {(provided, snapshot) => {
                return (
                  <div
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver
                        ? "lightblue"
                        : "#f3f2c9",
                    }}
                    {...provided.droppableProps}
                    className={"droppable-col"}
                  >
                    <div>
                      {state.map(({ id, todo, tag, time }, index) => {
                        return (
                          <Draggable
                            key={id}
                            draggableId={time}
                            index={index}
                            style={{
                              background: "#003638",
                              color: "white",
                            }}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div>
                                  <div
                                    className={`dragbox ${
                                      snapshot.isDragging && "dragging"
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {todo}
                                    <br></br>
                                    <label>
                                      {" "}
                                      <input
                                        onClick={() => movetoArchive(id)}
                                        type="checkbox"
                                      />
                                      DONE
                                    </label>{" "}
                                    <br></br>{" "}
                                    <div className="tags-input">
                                      <ul>
                                        <li className="tag" key={index}>
                                          <span>{"" + tag}</span>
                                        </li>
                                      </ul>
                                    </div>
                                    <br></br> last edited: {time}
                                    {id === editing ? (
                                      <input
                                        type="text"
                                        onChange={(e) =>
                                          settextEdit(e.target.value)
                                        }
                                      />
                                    ) : (
                                      <div>{todo.todo}</div>
                                    )}
                                    {id === editing ? (
                                      <button onClick={() => editTodo(id)}>
                                        Finish changes
                                      </button>
                                    ) : (
                                      <button onClick={() => setediting(id)}>
                                        RENAME
                                      </button>
                                    )}
                                    <button
                                      onClick={() => deleteTodo(id)}
                                      style={{
                                        fontWeight: "bold",
                                        background: "red",
                                      }}
                                    >
                                      DELETE
                                    </button>
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                    </div>
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="archive">
          <h2>DONE</h2>
          <button onClick={showArchive}>Show done items</button>
          <div className="arcbox">
            {arclist.map((todo) => {
              return (
                <div classname="taginits">
                  {todo.todo}
                  <label>
                    {" "}
                    <input type="checkbox" checked />
                    DONE
                  </label>{" "}
                  <br></br>{" "}
                  <div className="tags-input">
                    <ul>
                      <li className="tag">
                        <span>{"" + todo.tag}</span>
                      </li>
                    </ul>
                  </div>
                  <br></br> last edited: {todo.time}
                  <div className="todo-actions">
                    <button
                      onClick={() => deletearcTodo(todo.id)}
                      style={{
                        fontWeight: "bold",
                        background: "rgb(161, 15, 15)",
                      }}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default TODOAPPComponent;
