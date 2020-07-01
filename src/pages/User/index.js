import React, { Component } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import DeleteIcon from '@material-ui/icons/Delete';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import api from "../../services/api";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from "../../services/auth";

import { Container, Title, Logout, Head } from "./styles";

class User extends Component {
  state = {
    data: []
  }
  handleLogout = async e => {
    logout();
    this.props.history.push("/");
  };

  async componentDidMount() {
   
      try {
        const response = await api.get("/usuarios");

        this.setState({data: response.data})

      } catch (err) {
        console.log('Erro:', err);
      }
    }
  render() {
    
    return (
      <Container>
        <Head>
          <Title>Lista de Usuários</Title>
          <Logout onClick={this.handleLogout}><ExitToAppIcon/></Logout>
        </Head>
      <TableContainer component={Paper}  >
        <Table  aria-label="caption table">
          
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell >Nome</TableCell>
              <TableCell >E-mail</TableCell>
              <TableCell >Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell >{row.nome}</TableCell>
                <TableCell >{row.email}</TableCell>
                <TableCell ><Link to={`/edit/${row.id}`} ><VpnKeyIcon /></Link>
                            <Link to={`/del/${row.id}`} ><DeleteIcon /></Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>  
    );
  }
}
export default withRouter(User);