import React, { Component } from 'react';
import logo from './logo.svg';
import Clock from './Clock';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const ItemList = props => {
	return (
		<div className="col-xs-4">
			<h3>{props.title}</h3>
			<ul className="TodoList">
				{props.todos.map(item => (
					<li key={item.id} className="TodoListItem">
						<button
							className={'btn btn-' + props.status}
							onClick={event => {
								event.preventDefault();
								return props.action(
									item,
									props.fromList,
									props.toList
								);
							}}
						>
							<i className={'fa fa-lg fa-' + props.icon} />
						</button>
						&nbsp; {item.text}
					</li>
				))}
			</ul>
		</div>
	);
};

const AddItem = props => {
	return (
		<div className="row AddItem">
			<form onSubmit={props.addItem}>
				<div className="form-group col-xs-5 col-xs-offset-3">
					<input
						id="newItem"
						className="form-control"
						value={props.newItem}
						name="newItem"
						type="text"
						onChange={props.handleChange}
					/>
				</div>
				<div className="col-xs-1">
					<button className="btn btn-primary btn-md" type="submit">
						Add
					</button>
				</div>
			</form>
		</div>
	);
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newItem: '',
			itemNumber: 1,
			todoItems: [],
			inProgress: [],
			completedItems: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.addItem = this.addItem.bind(this);
		this.moveItem = this.moveItem.bind(this);
	}

	handleChange(event) {
		this.setState({ newItem: event.target.value });
	}

	addItem(event) {
		event.preventDefault();
		this.setState((prevState, props) => {
			let todoItems = prevState.todoItems.slice();
			todoItems.push({
				id: prevState.itemNumber,
				text: prevState.newItem
			});
			let nextItem = prevState.itemNumber;
			nextItem++;
			return {
				todoItems: todoItems,
				itemNumber: nextItem,
				newItem: ''
			};
		});
	}

	getItemIndex(item) {
		return item.id === this.id;
	}

	moveItem(item, fromList, toList) {
		this.setState((prevState, props) => {
			let fL = prevState[fromList].slice();
			let index = fL.findIndex(this.getItemIndex, item);
			fL.splice(index, 1);
			let tL = prevState[toList].slice();
			tL.push(item);
			let res = {};
			res[fromList] = fL;
			res[toList] = tL;
			return res;
		});
	}

	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="react logo" />
					<Clock />
				</div>
				<div className="container">
					<AddItem
						addItem={this.addItem}
						newItem={this.state.newItem}
						handleChange={this.handleChange}
					/>
					<div className="row">
						<ItemList
							todos={this.state.todoItems}
							title="To Do:"
							action={this.moveItem}
							fromList="todoItems"
							toList="inProgress"
							icon="long-arrow-right"
							status="success"
						/>
						<ItemList
							todos={this.state.inProgress}
							title="In Progress:"
							action={this.moveItem}
							fromList="inProgress"
							toList="completedItems"
							icon="check"
							status="success"
						/>
						<ItemList
							todos={this.state.completedItems}
							title="Completed:"
							action={this.moveItem}
							fromList="completedItems"
							toList="inProgress"
							icon="undo"
							status="danger"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
