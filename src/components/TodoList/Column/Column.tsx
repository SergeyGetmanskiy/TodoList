import { Box, List, Card, Typography, Container, CardContent } from "@mui/material"

import { TodoTypes } from "../../interfaces/TodoTypes";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import EditModal from "../EditModal/EditModal";
import { useState } from "react";

export default function Column({ columnTitle, cards, setTodos }: { columnTitle: string, cards: TodoTypes[], setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>> }) {

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState<TodoTypes>(Object);

  const columnColor = columnTitle === 'Todo' ? 'lightpink' : columnTitle === 'Done' ? 'lightgreen' : 'lightyellow';

  const onEdit = (card: TodoTypes) => {
    setSelectedCard(card);
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
        {cards.map((card, index) => (
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
      <EditModal modalOpen={modalOpen} setModalOpen={setModalOpen} content={selectedCard} />
    </Container>
  )
}
