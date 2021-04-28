import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import ModalManager from './app/common/modals/ModalManager';
import HomeScreen from './features/home/HomeScreen';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <Container>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ModalManager />

      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Route path='/' component={HomeScreen} exact />
      </BrowserRouter>
    </Container>
  );
}

export default App;
