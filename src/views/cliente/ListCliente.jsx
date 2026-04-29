import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header, Form } from 'semantic-ui-react';
import { notifyError, notifySuccess } from '../../views/util/Util';

export default function ListCliente() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();

    const [openModalEndereco, setOpenModalEndereco] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState();
    const [enderecos, setEnderecos] = useState([]);
    
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [complemento, setComplemento] = useState('');

    useEffect(() => {
        carregarLista();
    }, []);

    function carregarLista() {
        axios.get("http://localhost:8080/api/cliente")
            .then((response) => {
                setLista(response.data);
            })
    }

    function confirmaRemover(id) {
        setOpenModal(true);
        setIdRemover(id);
    }

    async function remover() {
        await axios.delete('http://localhost:8080/api/cliente/' + idRemover)
            .then((response) => {
                notifySuccess('Cliente removido com sucesso.');
                carregarLista();
            })
            .catch((error) => {
                notifyError('Erro ao remover um cliente.');
            })
        setOpenModal(false);
    }

    // --- FUNÇÕES DO DESAFIO DE ENDEREÇOS ---
    function abrirModalEndereco(cliente) {
        setClienteSelecionado(cliente);
        setEnderecos(cliente.enderecos || []); 
        setOpenModalEndereco(true);
    }

    function adicionarEndereco() {
        const enderecoRequest = { rua, numero, bairro, cep, cidade, estado, complemento };

        axios.post(`http://localhost:8080/api/cliente/endereco/${clienteSelecionado.id}`, enderecoRequest)
            .then((response) => {
                notifySuccess('Endereço adicionado com sucesso.');
                
                axios.get(`http://localhost:8080/api/cliente/${clienteSelecionado.id}`)
                    .then((res) => {
                        setEnderecos(res.data.enderecos || []);
                        carregarLista(); 
                    });

                setRua(''); setNumero(''); setBairro(''); setCep(''); setCidade(''); setEstado(''); setComplemento('');
            })
            .catch((error) => notifyError('Erro ao adicionar endereço.'));
    }

    function removerEndereco(idEndereco) {
        axios.delete(`http://localhost:8080/api/cliente/endereco/${idEndereco}`)
            .then((response) => {
                notifySuccess('Endereço removido com sucesso.');
                axios.get(`http://localhost:8080/api/cliente/${clienteSelecionado.id}`)
                    .then((res) => setEnderecos(res.data.enderecos || []));
            })
            .catch((error) => notifyError('Erro ao remover endereço.'));
    }

    return (
        <div>
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    <h2> Cliente </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-cliente'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>CPF</Table.HeaderCell>
                                    <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {lista.map(cliente => (
                                    <Table.Row key={cliente.id}>
                                        <Table.Cell>{cliente.nome}</Table.Cell>
                                        <Table.Cell>{cliente.cpf}</Table.Cell>
                                        <Table.Cell>{cliente.dataNascimento}</Table.Cell>
                                        <Table.Cell>{cliente.foneCelular}</Table.Cell>
                                        <Table.Cell>{cliente.foneFixo}</Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            
                                            {/* BOTÃO DO DESAFIO: Gerir Endereços */}
                                            <Button
                                                inverted
                                                circular
                                                color='blue'
                                                title='Gerenciar Endereços'
                                                icon
                                                onClick={() => abrirModalEndereco(cliente)}>
                                                <Icon name='map marker alternate' />
                                            </Button>
                                            &nbsp;

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste cliente'
                                                icon>
                                                <Link to="/form-cliente" state={{ id: cliente.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button>
                                            &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este cliente'
                                                icon
                                                onClick={e => confirmaRemover(cliente.id)}>
                                                <Icon name='trash' />
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>

            {/* MODAL DE REMOÇÃO DE CLIENTE */}
            <Modal basic onClose={() => setOpenModal(false)} onOpen={() => setOpenModal(true)} open={openModal}>
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>

            {/* MODAL DO DESAFIO: GESTÃO DE ENDEREÇOS */}
            <Modal size='large' open={openModalEndereco} onClose={() => setOpenModalEndereco(false)}>
                <Modal.Header>Endereços de {clienteSelecionado?.nome}</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input label='Rua' value={rua} onChange={e => setRua(e.target.value)} />
                            <Form.Input label='Número' value={numero} onChange={e => setNumero(e.target.value)} width={4} />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input label='Bairro' value={bairro} onChange={e => setBairro(e.target.value)} />
                            <Form.Input label='CEP' value={cep} onChange={e => setCep(e.target.value)} />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input label='Cidade' value={cidade} onChange={e => setCidade(e.target.value)} />
                            <Form.Input label='Estado' value={estado} onChange={e => setEstado(e.target.value)} />
                            <Form.Input label='Complemento' value={complemento} onChange={e => setComplemento(e.target.value)} />
                        </Form.Group>
                        <Button color='blue' onClick={adicionarEndereco}>Adicionar Endereço</Button>
                    </Form>

                    <Divider />

                    <Table celled striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Rua</Table.HeaderCell>
                                <Table.HeaderCell>Número</Table.HeaderCell>
                                <Table.HeaderCell>Bairro</Table.HeaderCell>
                                <Table.HeaderCell>CEP</Table.HeaderCell>
                                <Table.HeaderCell>Cidade / UF</Table.HeaderCell>
                                <Table.HeaderCell>Complemento</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {enderecos.map(end => (
                                <Table.Row key={end.id}>
                                    <Table.Cell>{end.rua}</Table.Cell>
                                    <Table.Cell>{end.numero}</Table.Cell>
                                    <Table.Cell>{end.bairro}</Table.Cell>
                                    <Table.Cell>{end.cep}</Table.Cell>
                                    <Table.Cell>{end.cidade} / {end.estado}</Table.Cell>
                                    <Table.Cell>{end.complemento}</Table.Cell>
                                    <Table.Cell textAlign='center'>
                                        <Button icon color='red' size='small' onClick={() => removerEndereco(end.id)}>
                                            <Icon name='trash' />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                            {enderecos.length === 0 && (
                                <Table.Row>
                                    <Table.Cell colSpan='7' textAlign='center'>Nenhum endereço cadastrado.</Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpenModalEndereco(false)}>Fechar</Button>
                </Modal.Actions>
            </Modal>

        </div>
    );
}