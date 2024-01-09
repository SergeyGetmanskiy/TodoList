import { Box, List, Card, Typography, Container, CardContent } from "@mui/material"

import { TodoTypes } from "../../interfaces/TodoTypes";
import DropDownMenu from "../DropDownMenu/DropDownMenu";

export default function Column({ columnTitle, columnColor, todos, setTodos, setSelectedTodo, setModalOpen }: {
  columnTitle: string,
  columnColor: string,
  todos: TodoTypes[],
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>,
  setSelectedTodo: React.Dispatch<React.SetStateAction<TodoTypes>>,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {

  const onEdit = (card: TodoTypes) => {
    setSelectedTodo(card);
    setModalOpen(true);
  }

  const onDelete = (card: TodoTypes) => {
    setTodos(todos => todos.filter((todo) => todo.id !== card.id));
  }

  return (
    <Container>
      <Box sx={{ mb: '20px', bgcolor: `${columnColor}` }} >
        <Typography variant='subtitle1' align='center'>{columnTitle}</Typography>
      </Box>
      <List sx={{ display: 'flex', flexDirection: 'column', gap: '20px', p: 0 }}>
        {todos.map((card, index) => (
          <Card key={card.name} elevation={4}>
            <Box sx={{position: 'relative' }}>
              <DropDownMenu onEdit={() => onEdit(card)} onDelete={() => onDelete(card)}/>
            </Box>
            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '10px', p: '20px' }}>
              <Typography variant='subtitle2'>{card.name}</Typography>
              <Typography variant='body1'>{card.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </List>
    </Container>
  )
}
