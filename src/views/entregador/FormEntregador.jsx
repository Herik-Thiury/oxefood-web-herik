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
  // Estado para controlar os botões de rádio (Sim/Não)
  const [ativo, setAtivo] = useState(true);

  return (
    <div>
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            {" "}
            <span style={{ color: "darkgray" }}>
              {" "}
              Entregador &nbsp;
              <Icon name="angle double right" size="small" />{" "}
            </span>{" "}
            Cadastro{" "}
          </h2>

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              {/* Primeira Linha */}
              <Form.Group>
                <Form.Input required fluid label="Nome" width={8} />
                
                <Form.Input required fluid label="CPF" width={4}>
                  <InputMask required mask="999.999.999-99" />
                </Form.Input>
                
                <Form.Input fluid label="RG" width={4} />
              </Form.Group>

              {/* Segunda Linha */}
              <Form.Group>
                <Form.Input fluid label="DT Nascimento" width={3}>
                  <InputMask mask="99/99/9999" maskChar={null} placeholder="Ex: 20/03/1985" />
                </Form.Input>
                
                <Form.Input required fluid label="Fone Celular" width={4}>
                  <InputMask mask="(99) 99999-9999" />
                </Form.Input>
                
                <Form.Input fluid label="Fone Fixo" width={3}>
                  <InputMask mask="(99) 9999-9999" />
                </Form.Input>
                
                <Form.Input fluid label="QTD Entregas Realizadas" width={3} />
                
                <Form.Input fluid label="Valor Por Frete" width={3} />
              </Form.Group>

              {/* Terceira Linha */}
              <Form.Group>
                <Form.Input fluid label="Rua" width={12} />
                <Form.Input fluid label="Número" width={4} />
              </Form.Group>

              {/* Quarta Linha */}
              <Form.Group>
                <Form.Input fluid label="Bairro" width={6} />
                <Form.Input fluid label="Cidade" width={6} />
                <Form.Input fluid label="CEP" width={4}>
                   <InputMask mask="99999-999" />
                </Form.Input>
              </Form.Group>

              {/* Quinta Linha (Select) */}
              <Form.Select 
                fluid 
                label="UF" 
                options={ufOptions} 
                placeholder="Selecione" 
              />

              {/* Sexta Linha */}
              <Form.Input fluid label="Complemento" />

              {/* Sétima Linha: Radio Buttons corrigidos com estado */}
              <Form.Group inline>
                <label>Ativo: </label>
                <Form.Radio
                  label='Sim'
                  checked={ativo === true}
                  onChange={() => setAtivo(true)}
                />
                <Form.Radio
                  label='Não'
                  checked={ativo === false}
                  onChange={() => setAtivo(false)}
                />
              </Form.Group>
            </Form>

            {/* Botões de Ação */}
            <div style={{ marginTop: "4%" }}>
              <Button
                type="button"
                inverted
                circular
                icon
                labelPosition="left"
                color="orange"
              >
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