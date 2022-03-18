import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export default function Topbar() {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar alt="Aymen" src="img.jpg" />

            <Button key="Aymen" sx={{ color: "white" }}>
              Aymen Ouerghui
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
