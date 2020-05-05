import React from 'react';
import TodoListItem from '../todo-list-item';
import './todo-list.css'

const TodoList = ({todos, onDeleted, onToggleDone, onToggleImportant}) => {

    const elements = todos.map((items) => {

        const {id, showDone, showActive, ...other} = items;

        let liClassNames = 'list-group-item';

        if (showDone) {
            liClassNames += ' hide';
        }
        if (showActive) {
            liClassNames += ' hide';
        }

        return (
           <li
               key={id}
               className={liClassNames}>
                {/*взять каждое свойство из объекта item и предать его в качестве атрибута вместе со значением в TodoListItem*/}
               <TodoListItem {...other}
                onDeleted={() => onDeleted(id)}
                onToggleDone={() => onToggleDone(id)}
                onToggleImportant={()=> onToggleImportant(id)}
               />
           </li>
       )
    });

    return (
        <ul className="list-group todo-list">
            {elements}
        </ul>

    )
};

export default TodoList;