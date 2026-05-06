import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import { notifyError } from '../../views/util/Util';
import { registerSuccessfulLoginForJwt } from '../util/AuthenticationService';

export default function FormLogin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function efetuarLogin() {
        axios.post("http://localhost:8080/api/login", {
            username: username,
            password: password
        })
        .then((response) => {
            registerSuccessfulLoginForJwt(response.data);
            navigate('/home');
        })
        .catch((error) => {
            notifyError("Usuário ou senha inválidos.");
        });
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxSize: 450 }}>
                <Header as='h2' color='blue' textAlign='center'>
                    Informe suas credenciais de acesso
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input 
                            fluid icon='user' 
                            iconPosition='left' 
                            placeholder='Usuário (E-mail)' 
                            value={username} 
                            onChange={e => setUsername(e.target.value)}
                        />
                        <Form.Input
                            fluid icon='lock'
                            iconPosition='left'
                            placeholder='Senha'
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button color='blue' fluid size='large' onClick={efetuarLogin}>
                            Entrar
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
}