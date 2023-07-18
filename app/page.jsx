"use client";
import { TextField, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function Home() {

  const [input, setInput] = useState({
    email: '',
  });
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const router = useRouter();

  const handleChange = ({ target }) => {
    setInput((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
    isEmailValid(target.value);
  };

  const isEmailValid = ((email) => {
    const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    setDisabled(!regex.test(email));
  })

  const handleSubmit = event => {
    event.preventDefault();
    if (!input.email.endsWith('kpis.tech')) {
      setError(true);
      return false;
    } else {
      setError(false);
      return router.push(`/employeeDashboard?email=${input.email}`);
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto'
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ backgroundColor: 'rgb(248,248,248)', maxWidth: '50vh' }}
        padding={2}
        boxShadow={4}
        borderRadius='1em'
      >
        <Typography
          variant="h5"
          color="#3F72AF"
          align="center"
          padding={2}
        >
          Key People Insights
        </Typography>
        <Grid
          item
          alignItems="center"
          justifyContent="center"
          padding={2}
        >
          <Grid
            container
            padding={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <form onSubmit={(e) => handleSubmit(e)}>
              <TextField
                error={error}
                name="email"
                value={input.email}
                onChange={handleChange}
                label="Email"
                fullWidth
                style={{ marginBottom: '2em' }}
                variant="outlined"
                helperText={error ? 'Email inválido' : 'Digite seu email'}
              />
              <Button
                onClick={(e) => handleSubmit(e)}
                size="large"
                color="primary"
                variant="contained"
                disabled={disabled}
                type='submit'
              >
                Login
              </Button>
            </form>
          </Grid>
        </Grid>
      </Grid >
    </div>
  )
};

export default Home;
