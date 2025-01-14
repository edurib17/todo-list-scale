import { Button, FilterContainer } from './styles';
import { IFilterProps } from './types';

export default function Filter({
	filter,
	setFilter
}: IFilterProps) {
	return (
		<FilterContainer>
			<Button active={filter === 'all'} onClick={() => setFilter('all')}>
				Todos
			</Button>
			<Button
				active={filter === 'completed'}
				onClick={() => setFilter('completed')}>
				Completo
			</Button>
			<Button
				active={filter === 'incomplete'}
				onClick={() => setFilter('incomplete')}>
				Incompleto
			</Button>
			<Button active={filter === 'title'} onClick={() => setFilter('title')}>Ordenar por título</Button>
		</FilterContainer>
	);
}
