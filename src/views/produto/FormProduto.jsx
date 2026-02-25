import React from "react";
import { Button, Container, Divider, Form, Icon, TextArea } from "semantic-ui-react";

export default function FormProduto() {
  return (
    <div>
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            {" "}
            <span style={{ color: "darkgray" }}>
              {" "}
              Produto &nbsp;
              <Icon name="angle double right" size="small" />{" "}
            </span>{" "}
            Cadastro{" "}
          </h2>

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              {/* Primeira Linha: Título e Código do Produto */}
              <Form.Group widths="equal">
                <Form.Input 
                  required 
                  fluid 
                  label="Título" 
                  maxLength="100" 
                  placeholder="Informe o título do produto"
                />

                <Form.Input 
                  required 
                  fluid 
                  label="Código do Produto" 
                  placeholder="Informe o código do produto"
                />
              </Form.Group>

              {/* Segunda Linha: Descrição */}
              <Form.Field>
                <label>Descrição</label>
                <TextArea placeholder='Informe a descrição do produto' />
              </Form.Field>

              {/* Terceira Linha: Valor e Tempos de Entrega */}
              <Form.Group widths="equal">
                <Form.Input 
                  required 
                  fluid 
                  label="Valor Unitário" 
                  placeholder="Ex: 29.90"
                />

                <Form.Input 
                  fluid 
                  label="Tempo de Entrega Mínimo em Minutos" 
                  placeholder="Ex: 30"
                />

                <Form.Input 
                  fluid 
                  label="Tempo de Entrega Máximo em Minutos" 
                  placeholder="Ex: 40"
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