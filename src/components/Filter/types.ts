export interface IFilterProps {
	filter: 'all' | 'completed' | 'incomplete' | 'title';
	setFilter: (filter: 'all' | 'completed' | 'incomplete' | 'title') => void;
}

export interface IFilterStyleProps {
	active?: boolean;
}
