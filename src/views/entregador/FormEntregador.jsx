import axios from "axios";
import React, { useState } from "react";
import InputMask from "comigo-tech-react-input-mask";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";

const ufOptions = [
  { key: 'ac', value: 'AC', text: 'Acre' },
  { key: 'al', value: 'AL', text: 'Alagoas' },
  { key: 'ap', value: 'AP', text: 'Amapá' },
  { key: 'am', value: 'AM', text: 'Amazonas' },
  { key: 'ba', value: 'BA', text: 'Bahia' },
  { key: 'ce', value: 'CE', text: 'Ceará' },
  { key: 'df', value: 'DF', text: 'Distrito Federal' },
  { key: 'es', value: 'ES', text: 'Espírito Santo' },
  { key: 'go', value: 'GO', text: 'Goiás' },
  { key: 'ma', value: 'MA', text: 'Maranhão' },
  { key: 'mt', value: 'MT', text: 'Mato Grosso' },
  { key: 'ms', value: 'MS', text: 'Mato Grosso do Sul' },
  { key: 'mg', value: 'MG', text: 'Minas Gerais' },
  { key: 'pa', value: 'PA', text: 'Pará' },
  { key: 'pb', value: 'PB', text: 'Paraíba' },
  { key: 'pr', value: 'PR', text: 'Paraná' },
  { key: 'pe', value: 'PE', text: 'Pernambuco' },
  { key: 'pi', value: 'PI', text: 'Piauí' },
  { key: 'rj', value: 'RJ', text: 'Rio de Janeiro' },
  { key: 'rn', value: 'RN', text: 'Rio Grande do Norte' },
  { key: 'rs', value: 'RS', text: 'Rio Grande do Sul' },
  { key: 'ro', value: 'RO', text: 'Rondônia' },
  { key: 'rr', value: 'RR', text: 'Roraima' },
  { key: 'sc', value: 'SC', text: 'Santa Catarina' },
  { key: 'sp', value: 'SP', text: 'São Paulo' },
  { key: 'se', value: 'SE', text: 'Sergipe' },
  { key: 'to', value: 'TO', text: 'Tocantins' },
];

export default function FormEntregador() {
  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [rg, setRg] = useState();
  const [dataNascimento, setDataNascimento] = useState();
  const [foneCelular, setFoneCelular] = useState();
  const [foneFixo, setFoneFixo] = useState();
  const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState();
  const [valorFrete, setValorFrete] = useState();
  const [enderecoRua, setEnderecoRua] = useState();
  const [enderecoNumero, setEnderecoNumero] = useState();
  const [enderecoBairro, setEnderecoBairro] = useState();
  const [enderecoCidade, setEnderecoCidade] = useState();
  const [enderecoCep, setEnderecoCep] = useState();
  const [enderecoUf, setEnderecoUf] = useState();
  const [enderecoComplemento, setEnderecoComplemento] = useState();
  const [ativo, setAtivo] = useState(true);

  function salvar() {
    let entregadorRequest = {
      nome: nome,
      cpf: cpf,
      rg: rg,
      dataNascimento: dataNascimento,
      foneCelular: foneCelular,
      foneFixo: foneFixo,
      qtdEntregasRealizadas: qtdEntregasRealizadas,
      valorFrete: valorFrete,
      enderecoRua: enderecoRua,
      enderecoNumero: enderecoNumero,
      enderecoBairro: enderecoBairro,
      enderecoCidade: enderecoCidade,
      enderecoCep: enderecoCep,
      enderecoUf: enderecoUf,
      enderecoComplemento: enderecoComplemento,
      ativo: ativo
    };

    axios.post("http://localhost:8080/api/entregador", entregadorRequest)
      .then((response) => {
        console.log('Entregador cadastrado com sucesso.');
      })
      .catch((error) => {
        console.log('Erro ao incluir o entregador.');
      });
  }

  return (
    <div>
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            <span style={{ color: "darkgray" }}>
              Entregador &nbsp;
              <Icon name="angle double right" size="small" />{" "}
            </span>{" "}
            Cadastro{" "}
          </h2>

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group>
                <Form.Input required fluid label="Nome" width={8} value={nome} onChange={(e) => setNome(e.target.value)} />
                <Form.Input required fluid label="CPF" width={4}>
                  <InputMask required mask="999.999.999-99" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                </Form.Input>
                <Form.Input fluid label="RG" width={4} value={rg} onChange={(e) => setRg(e.target.value)} />
              </Form.Group>

              <Form.Group>
                <Form.Input fluid label="DT Nascimento" width={3}>
                  <InputMask mask="99/99/9999" maskChar={null} placeholder="Ex: 20/03/1985" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                </Form.Input>
                <Form.Input required fluid label="Fone Celular" width={4}>
                  <InputMask mask="(99) 99999-9999" value={foneCelular} onChange={(e) => setFoneCelular(e.target.value)} />
                </Form.Input>
                <Form.Input fluid label="Fone Fixo" width={3}>
                  <InputMask mask="(99) 9999-9999" value={foneFixo} onChange={(e) => setFoneFixo(e.target.value)} />
                </Form.Input>
                <Form.Input fluid label="QTD Entregas Realizadas" width={3} value={qtdEntregasRealizadas} onChange={(e) => setQtdEntregasRealizadas(e.target.value)} />
                <Form.Input fluid label="Valor Por Frete" width={3} value={valorFrete} onChange={(e) => setValorFrete(e.target.value)} />
              </Form.Group>

              <Form.Group>
                <Form.Input fluid label="Rua" width={12} value={enderecoRua} onChange={(e) => setEnderecoRua(e.target.value)} />
                <Form.Input fluid label="Número" width={4} value={enderecoNumero} onChange={(e) => setEnderecoNumero(e.target.value)} />
              </Form.Group>

              <Form.Group>
                <Form.Input fluid label="Bairro" width={6} value={enderecoBairro} onChange={(e) => setEnderecoBairro(e.target.value)} />
                <Form.Input fluid label="Cidade" width={6} value={enderecoCidade} onChange={(e) => setEnderecoCidade(e.target.value)} />
                <Form.Input fluid label="CEP" width={4}>
                   <InputMask mask="99999-999" value={enderecoCep} onChange={(e) => setEnderecoCep(e.target.value)} />
                </Form.Input>
              </Form.Group>

              <Form.Select 
                fluid 
                label="UF" 
                options={ufOptions} 
                placeholder="Selecione" 
                value={enderecoUf}
                onChange={(e, { value }) => setEnderecoUf(value)}
              />

              <Form.Input fluid label="Complemento" value={enderecoComplemento} onChange={(e) => setEnderecoComplemento(e.target.value)} />

              <Form.Group inline>
                <label>Ativo: </label>
                <Form.Radio label='Sim' checked={ativo === true} onChange={() => setAtivo(true)} />
                <Form.Radio label='Não' checked={ativo === false} onChange={() => setAtivo(false)} />
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Button type="button" inverted circular icon labelPosition="left" color="orange">
                <Icon name="reply" />
                Voltar
              </Button>

              <Button 
                inverted 
                circular 
                icon 
                labelPosition="left" 
                color="blue" 
                floated="right"
                onClick={() => salvar()}
              >
                <Icon name="save" />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}