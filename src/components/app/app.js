import React, { Component } from 'react';
import TodoList from '../todo-list';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form'

import './app.css';


export default class App extends Component {

    maxId = 100;
    state = {
        todoData: [
            this.createElement('Разобраться с событиями JS'),
            this.createElement('Drink Coffee'),
            this.createElement('Make Awesome App'),
            this.createElement('Разобраться с событиями JS2'),
            this.createElement('Have a Lunch'),
            this.createElement('Drink Coffee2'),
            this.createElement('Разобраться с событиями JS3'),
            this.createElement('Drink Coffee4')
        ],
        term: '',
        filter: 'all' // active, all, done
    };
    findIndex = (arr, id) => {
        return  arr.findIndex((el) => el.id === id);
    };
    createElement (label) {
        return  {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    };
    onDeleted = (id) => {

        this.setState(({todoData}) => {

            const shallowState = [...todoData];

            const newArr = shallowState.filter((elem) => {
                return elem.id !== id
            });

            return {
                todoData: newArr
            }
        });
    };
    addItem = (label) => {

        this.setState(({todoData}) => {

            const shallowState = [...todoData];

            let newObj = this.createElement(label);
            shallowState.push(newObj);
            return {
                todoData: shallowState
            }
        })
    };
    onToggleImportant = (id) => {

        this.setState(({todoData}) => {

            const shallowCopy = [...todoData];

            const idx = this.findIndex(shallowCopy, id);
            const oldItem = shallowCopy[idx];
            const newItem = { ...oldItem, important: !oldItem.important};

            shallowCopy.splice(idx, 1, newItem);

            return {
                todoData: shallowCopy
            }
        })
    };
    onToggleDone = (id) => {

        this.setState(({ todoData }) => {

            const shallowCopy = [...todoData];
            // const idx = shallowCopy.findIndex((el) => el.id === id); // ищем индекс массива объектов
            const idx = this.findIndex(shallowCopy, id); // тоже самое но через фун-цию
            const oldItem = shallowCopy[idx];  // находим объект по найденому индексу
            const newItem = {...oldItem, done: !oldItem.done }; // копируем старый объект, деструктурируем ключ done и тут же изменяем его

            shallowCopy.splice(idx, 1, newItem);

            return {
                todoData: shallowCopy
            }
        })
    };
    search = (item, term) => {

        if (term.length === 0) {
            return item
        }
        return item.filter((items) => {
            return items.label.toLowerCase()
                    .indexOf(term.toLowerCase()) > -1
        })
    };
    onSearch = (e) => {
        this.setState({
            term: e.target.value
        })
    };
    onFilterChange = (filter) => {
      this.setState({filter})
    };

    filter = (items, filter) => {
        switch (filter){
            case 'all':
                return items;
                break;
            case 'active':
                return items.filter((el) => !el.done );
                break;
            case 'done':
                return items.filter((el) => el.done);
                break;
            default: return items;
        }
    };

    render() {
        const {todoData, term, filter } = this.state;
        const doneCunt = todoData.filter((el) => el.done).length;
        const todoCount = todoData.filter((el) => !el.done).length;

        const visibleItems = this.filter(
            this.search(todoData, term), filter);

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCunt}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearch={this.onSearch}/>
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}
                    />
                </div>
                <TodoList
                    todos={visibleItems}
                    onDeleted={this.onDeleted}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}/>
                <ItemAddForm
                    addItem={this.addItem}
                    />
            </div>
        )
    }
}