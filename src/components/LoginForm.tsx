import { Form, Button, Container } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import LoginService from "../service/LoginService";
import ValidateUserResponse from "../model/LoginResponse";
import { useState } from "react";

type LoginValues = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginValues>();
  const [userValidation, setUserValidation] = useState<ValidateUserResponse>();
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginValues> = (data) => {
    console.log(data);

    LoginService.validateUser(data.username, data.password)
      .then((response) => {
        console.log("response", response);
        setUserValidation(response);
        setError(false);
      })
      .catch((reason) => {
        console.log("error reason", reason);
        setError(true);
        setErrorMessage(reason);
      });

    console.log("userValidation", userValidation);
    console.log("valid", userValidation?.valid);
  };

  return (
    <Container className="mt-3">
      <h1 className="display-4 pb-4">Login</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control {...register("username")} placeholder="Username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control {...register("password")} placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="validUser">
          {!error && (
            <Form.Label className="mt-3 display-6">
              Is User Valid:
              <Form.Label className="ms-2 display-5 text-danger">
                {userValidation?.valid + ""}
              </Form.Label>
            </Form.Label>
          )}
          {error && (
            <Form.Label className="mt-3 display-6">
              Error:
              <Form.Label className="ms-2 display-5 text-danger">
                {errorMessage + ""}
              </Form.Label>
            </Form.Label>
          )}
        </Form.Group>
        <Button type="submit">Validate User</Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
