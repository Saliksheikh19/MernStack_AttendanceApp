import styled from "styled-components";
import {mobile} from "../responsive";
import { useDispatch, useSelector } from "react-redux";
// import { login } from "../redux/apiCall";
import { login } from "../redux/apicalls";
import { useState } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("data:image/jpeg;base64,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")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="username" onChange={(e) => setEmail(e.target.value)}/>
          <Input placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;