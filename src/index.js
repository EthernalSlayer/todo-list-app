import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            todos: [
                {id: 1, title: "menage", done: false},
                {id: 2, title: "repassage", done: false}
            ],
        };
        this.addElement = this.addElement.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeElement = this.removeElement.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.doneList = this.doneList.bind(this);
        this.todoList = this.todoList.bind(this);
        this.allList = this.allList.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    addElement(event) {
        event.preventDefault();
        let newTodo = {
            id: Date.now(),
            title: this.state.value,
            done: false,
        }
        this.setState(prevState => ({
            todos: [...prevState.todos, newTodo],
            filterTodos: [...prevState.todos, newTodo],
            value: "",
        }));
    }

    removeElement(event) {
        console.log(event.target.value)
        this.setState({
            todos: this.state.todos.filter(todo => todo.id != event.target.value ),
            filterTodos : this.state.filterTodos.filter(todo => todo.id != event.target.value )
        });
    }

    changeStatus(event) {
        console.log(event.target.value)
        const el = event.target.value;
        this.setState(prevState => {
            return {
                todos: prevState.todos.map(todo => {
                    if(el == todo.id) {
                        return {...todo, done: !todo.done};
                    } else {
                        return {...todo, done: todo.done};
                    }
                })
            };
        });
    }

    doneList(event) {
        const buttons = document.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].className = 'notActive';
        }
        event.target.className = 'isActive';
        this.setState({
            filterTodos: this.state.todos.filter(item => item.done != false)
        });
    }

    todoList(event) {
        const buttons = document.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].className = 'notActive';
        }
        event.target.className = 'isActive';
        this.setState({
            filterTodos: this.state.todos.filter(item => item.done == false)
        });
    }

    allList(event) {
        const buttons = document.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].className = 'notActive';
        }
        event.target.className = 'isActive';
        this.setState({
            filterTodos: null
        })
    }

    render() {
        //console.log(button.className);
        const test = this.state.filterTodos != null ? this.state.filterTodos : this.state.todos;
        return <div className='appContainer'>
                <div className='mainContainer'>
                <form className="taskBarContainer" onSubmit={this.addElement}>
                    <input className="taskBar" type="text" value={this.state.value} onChange={this.handleChange} />
                    <input type="submit" />
                </form>
                <ul>
                    {test.map(todo => {
                        return (
                            <li 
                                className={todo.done == true ? 'done' : 'todo'}
                                key={todo.id}>
                                <input type="checkbox"
                                value={todo.id}
                                onChange={this.changeStatus} 
                            />
                                {todo.title}
                                <button 
                                value={todo.id} 
                                onClick={this.removeElement}
                                >
                                    Remove
                                </button>
                            </li>
                        )
                    })}
                </ul>
                <div className="buttonContainer">
                    <button className="notActive" onClick={this.doneList}>Done</button>
                    <button className="notActive" onClick={this.todoList}>Todo</button>
                    <button className="notActive" onClick={this.allList}>All</button>
                </div>
            </div>
        </div>
    }
}


ReactDom.render(
    <TodoList />,
    document.getElementById('root')
);