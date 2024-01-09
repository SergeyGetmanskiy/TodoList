import { useState } from 'react';
import Box from '@mui/material/Box';
import { TextField, Stack, Button, MenuItem } from '@mui/material';
import Modal from '@mui/material/Modal';

import { statusList } from '../../../constants/constants';
import { TodoTypes } from '../../interfaces/TodoTypes';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  '& > :not(style)': { m: 1, width: '100%' }
};

function EditModal({modalOpen, setModalOpen, handleClose, initialValues, onSubmit}: {
  modalOpen: boolean,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  handleClose: () => void,
  initialValues: TodoTypes,
  onSubmit: (arg0: TodoTypes) => void
}) {

  const [formValues, setFormValues] = useState(initialValues);

  const isSubmitbuttonActive = (formValues.name !== '' && formValues.status !== '') ? false : true;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const element = e.currentTarget.id;
    const value = e.currentTarget.value;
    setFormValues({...formValues, [element]: value})
  }

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setFormValues({...formValues, status: e.target.value})
  }

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
  }

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
    >
      <Box
      component="form"
      sx={style}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        value={formValues.name}
        onChange={handleChange}
        required
      />
      <TextField
        id="description"
        label="Description"
        variant="outlined"
        value={formValues.description}
        multiline
        onChange={handleChange}
      />
      <TextField
        id="status"
        label="Status"
        variant="outlined"
        select
        value={formValues.status}
        onChange={handleSelect}
        required>
          {statusList.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              {status.label}
            </MenuItem>
          ))}
      </TextField>
      <Stack spacing={2} direction="row">
        <Button variant="contained" type='submit' disabled={isSubmitbuttonActive}>Save</Button>
        <Button variant="contained" onClick={handleClose}>Cancel</Button>
      </Stack>
    </Box>
    </Modal>
  );
}

export default EditModal
