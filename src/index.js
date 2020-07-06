import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

class Counter extends React.Component {
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
        }));
    }

    removeElement(event) {
        console.log(event.target.value)
        this.setState({
            todos: this.state.todos.filter(todo => todo.id != event.target.value )
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

    render() {
        return <div>
            <form onSubmit={this.addElement}>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                <input type="submit" />
            </form>
            <ul>
                {this.state.todos.map(todo => {
                    return (
                        <li 
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
        </div>
    }
}


ReactDom.render(
    <Counter />,
    document.getElementById('root')
);