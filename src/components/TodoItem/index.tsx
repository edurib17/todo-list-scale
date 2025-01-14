import { useState } from 'react';
import {
	Button,
	Buttons,
	EditFormContainer,
	Input,
	Item,
	Title,
} from './styles';
import { ITodoItemProps } from './types';

export default function TodoItem({
	todo,
	toggleComplete,
	removeTodo,
	editTodo,
}: ITodoItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(todo.title);
	const [newDescription, setNewDescription] = useState(todo.description);

	function handleEdit() {
		setIsEditing(true);
	}

	function handleSave() {
		if (newTitle.trim()) {
			editTodo(todo.id, newTitle, newDescription);
			setIsEditing(false);
		} else {
			alert('Title cannot be empty');
		}
	}

	return (
		<Item>
			{isEditing ? (
				<EditFormContainer>
					<Input
						type="text"
						value={newTitle}
						onChange={e => setNewTitle(e.target.value)}
					/>
					<Input
						type="text"
						value={newDescription}
						onChange={e => setNewDescription(e.target.value)}
					/>
					<Button onClick={handleSave}>Salvar</Button>
				</EditFormContainer>
			) : (
				<>
					<Title completed={todo.completed}>{todo.title}</Title>
					<Buttons>
						<Button onClick={handleEdit}>Editar</Button>
						<Button edit onClick={() => toggleComplete(todo.id)}>
							{todo.completed ? 'Desfazer' : 'Completar'}
						</Button>
						<Button delete onClick={() => removeTodo(todo.id)}>
							Deletar
						</Button>
					</Buttons>
				</>
			)}
		</Item>
	);
}