import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Todo({ valorTodo, index, completado, borrar }) {
	return (
		<div className="todo">
			<span
				style={{
					textDecoration: valorTodo.isDone ? "line-through" : "",
				}}>
				{valorTodo.text}
			</span>
			<div>
				<Button
					variant="outline-success"
					onClick={() => completado(index)}>
					✓
				</Button>{" "}
				<Button variant="outline-danger" onClick={() => borrar(index)}>
					✕
				</Button>
			</div>
		</div>
	);
}

function FormTodo({ addTodo }) {
	const [value, setValue] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!value) return;
		addTodo(value);
		setValue("");
	};

	return (
		<Form className="text-center" id="form" onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Label>Add something to do!</Form.Label>
				<Form.Control
					type="text"
					className="input"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder="What do you wanna do?"
				/>
			</Form.Group>
			<Button id="sendbutton" variant="primary mb-3" type="submit">
				Add to the list
			</Button>
		</Form>
	);
}

function App() {
	const [lista, setlista] = useState([]);

	const addTodo = (text) => {
		const nuevalista = [...lista, { text }];
		setlista(nuevalista);
	};

	const completado = (index) => {
		const nuevalista = [...lista];
		nuevalista[index].isDone = true;
		setlista(nuevalista);
	};

	const borrar = (index) => {
		const nuevalista = [...lista];
		nuevalista.splice(index, 1);
		setlista(nuevalista);
	};

	return (
		<div className="app">
			<div className="container">
				<h1 className="text-center mb-4">To-do List</h1>
				<FormTodo addTodo={addTodo} />
				<div>
					{lista.map((valorTodo, index) => (
						<Card className="text-center" id="card">
							<Card.Body>
								<Todo
									key={index}
									index={index}
									valorTodo={valorTodo}
									completado={completado}
									borrar={borrar}
								/>
							</Card.Body>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
