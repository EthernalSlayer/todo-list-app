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

    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    addElement() {
        console.log("test");
        let newTodo = {
            id: Date.now(),
            title: this.state.value,
            done: false,
        }
        this.setState(prevState => ({
            todos: [...prevState.todos, newTodo],
        }));
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
                        <li key={todo.id}>{todo.title}</li>
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