import React, { useState } from "react";
import "./App.css";

import { Navbar, Container, Row, Nav,Col, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

import {createSlice,configureStore } from '@reduxjs/toolkit';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigationBar />}>
          <Route path="HomePage" element={<HomePage />} />
          <Route path="Login" element={<LoginMenu />} />
          <Route path="Register" element={<RegisterMenu />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

class NavigationBar extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="HomePage">
              Amplifire RoadTrip
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="Login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="Register">
                Register
              </Nav.Link>
              <Link to="Register">Register</Link>
            </Nav>
          </Container>
        </Navbar>
        <Outlet />
      </>
    );
  }
}

class RegisterMenu extends React.Component {
  render() {
    return (
      <>
        <Container>
            <Row>
              <Col xs={6}>
            
              <form id="registerForm">
              <Form.Group>
                <h1>Sign up</h1>

                <Form.Label>Username:</Form.Label>
                <Form.Control placeholder="Enter Username"/>
                <br />

                <Form.Label>Password:</Form.Label>
                <Form.Control placeholder="Enter Password"/>
                <br />

              </Form.Group>
                <Button varient="info" type="submit">
                Submit
                </Button>
              </form>

              </Col>
          </Row>
        </Container>
       </>
     );
   }
  }

class HomePage extends React.Component {
  render() {
    return (<><h1>Home</h1></>);
  }
}

class LoginMenu extends React.Component {
  render() {
    return (
      <>
        <h1>Login:</h1>
        <LoginForm />
      </>
    );
  }
}

class RegisterMenu extends React.Component {
  render() {
    return (
      <>
        <h1>Register:</h1>
        <RegisterForm />
      </>
    );
  }
}


function RegisterForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => registerUser(JSON.stringify(data));
  const registerUser = (data) => {
    axios.post(`http://localhost:5000/register`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        console.log(res);
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} />
      <input {...register("password")} />
      <input type="submit" />
    </form>
  );
}

function LoginForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => loginUser(JSON.stringify(data));
  const loginUser = (data) => {
    axios.post(`http://localhost:5000/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        sessionStorage['jwt'] = res.jwt;
        console.log(res);
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} />
      <input {...register("password")} />
      <input type="submit" />
    </form>
  );
}

export default App;
