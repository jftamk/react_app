import React from "react";
import "./App.css";
function INFOComponent() {
  return (
    <div className="infopage">
      <h1>INFO</h1>
      <h2>Made by: Joni Forss</h2>
      <h3>About app</h3>
      <p>
        This application is made for adding and controlling To do items.{" "}
        <br></br>
        In the To Do App-page, you can add new items to your to do list.
      </p>
      <h3>How To Use</h3>
      <h4>Adding new items</h4>
      <p>
        Steps: <br></br> 1. For to do item - just write the to do element you
        want to add. <br></br> 2. For tags - type in tag you want to add and
        press enter. You can add as many tags as you want. <br></br> 3. Click
        (Add to the list) button and you will add the item to the list.
      </p>
      <h4>Search</h4>
      <p>
        In the search box, You can search items by typing and you see results of
        to do element that matches with the input.
      </p>
      <h4>Filtering by tags</h4>
      <p>
        Steps:
        <br></br>
        1. In the filter by tag(s) box, type in the tag you want to search and
        press enter. <br></br>2. You can add as many tags as you want, and then
        click the button (Filter).<br></br> 3. You can reset tags by clicking
        the button (Reset tags).
      </p>
      <h4>Ordering the items by time</h4>
      <p>
        You can also order the items in the list by the time they were last
        edited.
        <br></br>
        You have two options.
      </p>
      <h4>Show all items</h4>
      <p>
        After filtering or searching, you can get the original list back by
        clicking the button (Show all items).
      </p>
      <h4>To Do List</h4>
      <p>
        You can rename or delete by clicking the buttons on the items. If you
        wish to reorder the list, it is possible to drag and drop them.{" "}
        <br></br>
        You can mark the To do item as done by clicking the box next to "DONE".
        This action will move the item to the "DONE" list.
      </p>
      <h4>Done List</h4>
      <p>
        Here you will see all the items you have marked as done. If you wish to
        permanently delete them, click the (Delete) button. <br></br> After
        items are moved to the Done list, you can not edit or move them back to
        the mainlist anymore.<br></br>
        If you change page from the To Do App, Done list will get hidden. You
        can display it again by pressing Show Done Ites button. You will also
        see it displayed after marking another To Do item as done.
      </p>
    </div>
  );
}

export default INFOComponent;
/*
return (
    <div id="todo-list">
      <h1>Todo List</h1>
      {isEditing ? (
        <div>
          <form>
            <input
              name="editTodo"
              type="text"
              placeholder="edit"
              value={currentTodo.todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button onClick={handleEditFormSubmit}>Update</button>{" "}
          </form>
        </div>
      ) : (
        <div>
          <form>
            <h2>Uusi tehtävä</h2>
            <p>Tehtävä: </p>
            <input
              placeholder="Tehtävä"
              type="text"
              name="todo"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <p>Tag: </p>
            <input
              placeholder="tag"
              tag="textarea"
              type="text"
              name="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </form>

          <button onClick={handleSubmit}>Lisää tehtävä</button>
        </div>
        // if we are not editing - display the add todo input
        // make sure to add the handleFormSubmit function in the "onSubmit" prop
      )}
      {todos.map((todo) => (
        <div className="dragelement">
          <div key={todo.id} className="todo">
            <div className="todo-text">
              <p>
                {todo.todo} <br></br> tags {"#" + todo.tag} <br></br> muokattu:{" "}
                {todo.aika}
              </p>
            </div>
            <button onClick={() => handleEditClick(todo)}>Muokkaa</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}{" "}
    </div>
  );
};*/
