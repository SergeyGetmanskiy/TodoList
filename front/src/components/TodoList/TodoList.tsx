import { useState } from 'react';
import { Box, Grid, Paper, Typography, Stack, Button} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { initialTodos } from './Todos/Todos';
import { statusList } from '../../constants/constants';
import { TodoTypes } from '../interfaces/TodoTypes';
import Column from './Column/Column';
import EditModal from './EditModal/EditModal';


function TodoList() {

  const [todos, setTodos] = useState<TodoTypes[]>(initialTodos);
  const [selectedTodo, setSelectedTodo] = useState<TodoTypes>({id: null, name: '', description: '', status: ''});
  const [isNewTodo, setIsNewTodo] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);

  console.log(todos);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsNewTodo(true);
    setModalOpen(true);
  }

  const handleModalClose = () => {
    setModalOpen(false);
    setIsNewTodo(false);
    setSelectedTodo({id: null, name: '', description: '', status: ''});
  }

  const editTodo = (formValues: TodoTypes) => {
    const newTodo = formValues.id !== null ? formValues : {...formValues, id: todos.length + 1};
    setTodos(todos => todos.map((todo) => {
      if(todo.id === newTodo.id ) {
        return newTodo
      }
      return todo
    }));
    handleModalClose();
  }

  const addTodo = (formValues: TodoTypes) => {
    const newTodo = formValues.id !== null ? formValues : {...formValues, id: todos.length + 1}
    setTodos([...todos, newTodo]);
    handleModalClose();
  }

  return (
    <Box sx={{display: 'flex', height: '100vh', alignItems: 'flex-start', justifyContent: 'center'}}>
      <Grid container component={Paper} sx={{width: '800px'}}>
        <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px'}}>
          <Typography variant='h2' align='center'>Todos</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<AddCircleIcon />} sx={{textTransform: 'none'}} onClick={handleClick}>
              New todo
            </Button>
          </Stack>
        </Grid>
        {
          statusList.map((status) => {
            const filteredTodos = todos.filter((todo) => todo.status === status.value);
            const columnColor = status.value === 'todo' ? 'lightpink' : status.value === 'done' ? 'lightgreen' : 'lightyellow';
            return (
              <Grid key={status.value} item  xs={4} sx={{justifyContent: 'center', pb: '20px'}}>
                <Column
                  columnTitle={status.label}
                  columnColor={columnColor}
                  todos={filteredTodos}
                  setTodos={setTodos}
                  setSelectedTodo={setSelectedTodo}
                  setModalOpen={setModalOpen}/>
              </Grid>
            )
          })
        }
      </Grid>
      {
        modalOpen &&
        (<EditModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          handleClose={handleModalClose}
          initialValues={selectedTodo}
          onSubmit={isNewTodo ? addTodo : editTodo} />)
      }
    </Box>
  );
}

export default TodoList
