import { useState } from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';

function DropDownMenu({onEdit, onDelete}: {onEdit: () => void, onDelete: () => void}) {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e: React.MouseEvent<HTMLLIElement>) => {
    if(e.currentTarget.id === 'edit') {
      onEdit();
    } else if(e.currentTarget.id === 'delete') {
      onDelete();
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="button"
        onClick={handleClick}
        sx={{ position: 'absolute', zIndex: 2,  minWidth: '10px', top: '2px', right: '2px', color: 'black.black500' }}
      >
        <EditIcon sx={{ height: '14px',  }} />
      </Button>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem id="edit" onClick={handleClose}>Edit</MenuItem>
        <MenuItem id="delete" onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

export default DropDownMenu
