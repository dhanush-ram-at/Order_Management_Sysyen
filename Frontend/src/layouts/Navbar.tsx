import { AppBar, Toolbar, Typography, Button } from "@mui/material"

function Navbar() {

  // Get user name from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  return (
    <AppBar position="static">
      <Toolbar>

        {/* Left — app title */}
        <Typography sx={{ flexGrow: 1 }}>
          Order Management System
        </Typography>

        {/* Right — user name + logout */}
        <Typography sx={{ mr: 2 }}>
          {user.name}
        </Typography>

        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>

      </Toolbar>
    </AppBar>
  )

}

export default Navbar