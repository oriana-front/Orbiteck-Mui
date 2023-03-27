
import Header from "./Header";
import MenuLista from "./MenuLista";
import { Box, Drawer } from "@mui/material";


function Layout({ children }) {
  const { isOpen, onOpen, onClose } = usedE();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size={{ base: "full", md: "sm" }}
      >
        
          <MenuLista
            onClose={onClose}
            
          />
        
      </Drawer>
      <Header onOpen={onOpen} />
      <Box ml={{ base: 0, md: 0 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
