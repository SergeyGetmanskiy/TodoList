import { Box, List, Card, Typography, Container, CardContent } from "@mui/material"

import { TodoTypes } from "../../interfaces/TodoTypes";
import DropDownMenu from "../DropDownMenu/DropDownMenu";

export default function Column({ columnTitle, columnColor, todos, setTodos, setSelectedTodo, setModalOpen, onDelete }: {
  columnTitle: string,
  columnColor: string,
  todos: TodoTypes[],
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>,
  setSelectedTodo: React.Dispatch<React.SetStateAction<TodoTypes>>,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  onDelete: (arg1: number) => void
}) {

  const onEdit = (card: TodoTypes) => {
    setSelectedTodo(card);
    setModalOpen(true);
  }

  const handleDelete = (todoId: number | undefined) => {
    if(typeof todoId !== "undefined") {
      onDelete(todoId);
    }
  }

  return (
    <Container>
      <Box sx={{ mb: '20px', bgcolor: `${columnColor}` }} >
        <Typography variant='subtitle1' align='center'>{columnTitle}</Typography>
      </Box>
      <List sx={{ display: 'flex', flexDirection: 'column', gap: '20px', p: 0 }}>
        {todos.map((card, index) => (
          <Card key={card._id} elevation={4}>
            <Box sx={{position: 'relative' }}>
              <DropDownMenu onEdit={() => onEdit(card)} onDelete={() => handleDelete(card._id)}/>
            </Box>
            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '10px', p: '20px' }}>
              <Typography variant='subtitle2' sx={{width: '100%', wordWrap: 'break-word'}}>{card.name}</Typography>
              <Typography variant='body1' sx={{width: '100%', wordWrap: 'break-word'}}>{card.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </List>
    </Container>
  )
}
