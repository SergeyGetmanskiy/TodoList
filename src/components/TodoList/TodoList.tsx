import { useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

import { initialTodos } from './Todos/Todos';
import { subtitles } from '../../constants/constants';
import { TodoTypes } from '../interfaces/TodoTypes';
import Column from './Column/Column';


function TodoList() {

  const [todos, setTodos] = useState<TodoTypes[]>(initialTodos);

  return (
    <Box sx={{display: 'flex', height: '100vh', alignItems: 'flex-start', justifyContent: 'center'}}>
      <Grid container component={Paper} sx={{width: '800px'}}>
        <Grid item xs={12} >
          <Typography variant='h2' align='center'>Todos</Typography>
        </Grid>
        {
          subtitles.map((subtitle) => {
            const cards = todos.filter((todo) => todo.status === subtitle)
            return (
              <Grid key={subtitle} item  xs={4} sx={{justifyContent: 'center', pb: '20px'}}>
                <Column columnTitle={subtitle} cards={cards} setTodos={setTodos}/>
              </Grid>
            )
          })
        }
      </Grid>
    </Box>
  );
}

export default TodoList
