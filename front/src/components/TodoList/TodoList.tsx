import { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Stack, Button} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { api } from '../../utils/Api';
import { statusList } from '../../constants/constants';
import { TodoTypes } from '../interfaces/TodoTypes';
import Column from './Column/Column';
import TodoModal from './Modal/Modal';


function TodoList() {

  const [todos, setTodos] = useState<TodoTypes[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<TodoTypes>({name: '', description: '', status: ''});
  const [isNewTodo, setIsNewTodo] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsNewTodo(true);
    setModalOpen(true);
  }

  const handleModalClose = () => {
    setModalOpen(false);
    setIsNewTodo(false);
    setSelectedTodo({name: '', description: '', status: ''});
  }

  const editTodo = (updatedTodo: TodoTypes) => {
    api.updateTodo(updatedTodo)
    .then((todo) => {
      setTodos(todos => todos.map((item) => {
        if(item._id === todo._id ) {
          return todo
        }
        return item
      }));
      handleModalClose();
      }
    )
    .catch((err) => {
      console.log(err);
    })
  }

  const addTodo = (newTodo: TodoTypes) => {
    api.postTodo(newTodo)
    .then((todo) => {
      setTodos([...todos, todo]);
      handleModalClose();
      }
    )
    .catch((err) => {
      console.log(err);
    })
  }

  const deleteTodo = (todoId: number) => {
    api.deleteTodo(todoId)
    .then(() => {
      setTodos(todos => todos.filter((todo) => todo._id !== todoId));
      }
    )
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    api.getTodos()
    .then((todos) => {
      setTodos(todos);
      }
    )
    .catch((err) => {
      console.log(err);
    })
  }, [])

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
                  setModalOpen={setModalOpen}
                  onDelete={deleteTodo}/>
              </Grid>
            )
          })
        }
      </Grid>
      {
        modalOpen &&
        (<TodoModal
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
