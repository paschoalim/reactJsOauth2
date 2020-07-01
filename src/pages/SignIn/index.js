import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assests/Airbnb_Logo.svg";
import api from "../../services/api";
import { login } from "../../services/auth";

import { Form, Container } from "./styles";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/login", { email: email, senha: password });
        login(response.data.token);
        this.props.history.push("/listUser");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. "
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
        
          <img src={Logo} alt="Airbnb logo" />
          
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          
          <button type="submit">Entrar</button>
          {this.state.error && <p>{this.state.error}</p>}
          <hr />
          <Link to="/signup">Criar conta grátis</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);