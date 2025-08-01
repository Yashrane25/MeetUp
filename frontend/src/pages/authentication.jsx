import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";
import Snackbar from "@mui/material/Snackbar";

const theme = createTheme();
 
export default function Authentication() {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [name, setName] = React.useState();
  const [error, setError] = React.useState();
  const [message, setMessage] = React.useState();
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let handleAuth = async () => {
    try {
      if (formState === 0) {
        let result = await handleLogin(username, password);
      }
      if (formState === 1) {
        let result = await handleRegister(name, username, password);
        console.log(result);
        setUsername("");
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
        setPassword("");
      }
    } catch (err) {
      let message = err.response?.data?.message || "Something went wrong";
      setError(message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* ✅ Removed item/xs/sm/md, replaced with Grid v2 API */}
      <Grid
        container
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url(/authPageBgImage.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(8px)",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            zIndex: 1,
          },
        }}
      >
        <CssBaseline />

        {/* ✅ MUI Grid v2 update */}
        <Grid
          sx={{
            gridColumn: {
              xs: "span 10",
              sm: "span 8",
              md: "span 4",
            },
            position: "relative",
            zIndex: 2,
            backgroundColor: "rgba(255,255,255,0.85)",
            borderRadius: 3,
            p: 4,
            backdropFilter: "blur(2px)",
          }}
          component={Paper}
          elevation={6}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#FF9839" }}>
              <LockOutlinedIcon />
            </Avatar>

            <div>
              <Button
                variant={formState === 0 ? "contained" : ""}
                onClick={() => {
                  setFormState(0);
                }}
              >
                Sign In
              </Button>
              <Button
                variant={formState === 1 ? "contained" : ""}
                onClick={() => {
                  setFormState(1);
                }}
              >
                Sign Up
              </Button>
            </div>

            <Box component="form" noValidate sx={{ mt: 2, width: "100%" }}>
              {formState === 1 ? (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  value={name}
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                />
              ) : null}

              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
              />

              <p style={{ color: "red" }}>{error}</p>

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#115293",
                  },
                }}
                onClick={handleAuth}
              >
                {formState === 0 ? "Login" : "Register"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar open={open} autoHideDuration={4000} message={message} />
    </ThemeProvider>
  );
}