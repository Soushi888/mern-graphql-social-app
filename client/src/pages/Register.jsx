import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    addUser().then();
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
    },
    variables: values,
  });

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email..."
          name="email"
          type="text"
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        />

        <Button type="submit" primary>
          Register
        </Button>
        {loading ?? <p>loading...</p>}
      </Form>
    </div>
  );
};

export default Register;

const REGISTER_USER = gql`
  mutation registser(
    $username: String!
    $email: String!
    $password: String!
    $confirmaPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmaPassword
      }
    ) {
      id
      username
      email
      createdAt
      token
    }
  }
`;
