import React,{useRef} from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import { getLoginData, getUserData } from '../../helpers/localStorage';
import { Avatar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from '@mui/material';


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Header({ onOpen, ...rest }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const[opens,setOpen]=React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

 const user_data = getUserData();
 

  const handleLogout = () => {
    removeLogin();
    navigate("/new-reports");
    onCloseAlert();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloses = () => {
    setOpen(false);
  };

 //  
  return (
    <div >
      <Button 
        color='inherit'
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        size="medium"
        endIcon={<KeyboardArrowDownIcon />}
      >  
        <Avatar sx={{ width: 30, height: 30,marginRight:1 }} src={"https://app.orbitec.pe/img/logo.99c902d5.svg"}  />
        <Typography variant="body2"  >
        {`${user_data.first_name} ${user_data.last_name}`.trim()}
           <Typography variant="caption" display="block">
           {`${user_data.first_name} ${user_data.last_name}`.trim()}
            <Typography variant="caption" display="block"> 
            {user_data.username}
            </Typography>
            </Typography>
           
      </Typography>
          
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >

        <MenuItem  onClick={handleClickOpen} disableRipple>
          <EditIcon />
          Desconectar
        </MenuItem>
      </StyledMenu>

      <Dialog
        open={opens}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloses}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Cerrar sesión"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Al cerrar sesion no podras utilizar el sistema hasta volver a ingresar.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='success' variant="contained" onClick={handleCloses}>Cerrar</Button>
          <Button color='error' variant="contained" onClick={handleLogout}>Salir del sistema</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}