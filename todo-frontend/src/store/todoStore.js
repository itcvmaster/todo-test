import { atom, useRecoilState } from 'recoil';

export const todoState = atom({
    key: 'todoKey',
    default: [],
});

const useTodoStore = () => {
    const [todos, setTodos] = useRecoilState(todoState);

    const addTask = async (task) => {
        setTodos(_todos => ({
            ..._todos,
            task
        }));
    };

    const updateTask = (task) => {
        setTodos(_todos => (
            _todos.map(_todo => _todo.id === id ? task : _todo)
        ));
    };

    const deleteTask = (id) => {
        setTodos(_todos => (
            _todos.filter(_todo => _todo.id !== id)
        ));
    };

    return {
        todos,
        setTodos,

        addTask,
        updateTask,
        deleteTask,
    };
}

export default useTodoStore;