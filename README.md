# EstudAqui

## Licença:
-> No presente projeto, estamos utilizando a licença GPLv3(GNU General Public Licence).

```text
EstudAqui
Copyright (C) 2025  Marcello Vinhais, Lucas Gabriel, Ryan Clayton.

Este programa é software livre; você pode redistribuí-lo e/ou
modificá-lo sob os termos da Licença Pública Geral GNU, conforme
publicada pela Free Software Foundation; seja a versão 3 da Licença,
ou (a seu critério) qualquer versão posterior.

Este programa é distribuído na esperança de que seja útil,
mas SEM QUALQUER GARANTIA; sem mesmo a garantia implícita de
COMERCIABILIDADE ou ADEQUAÇÃO A UM PROPÓSITO ESPECÍFICO. Consulte a
Licença Pública Geral GNU para obter mais detalhes.

Você deve ter recebido uma cópia da Licença Pública Geral GNU
junto com este programa. Se não, veja [https://www.gnu.org/licenses/](https://www.gnu.org/licenses/).
```

## Introdução
-> Um projeto EstudAqui criado à partir da matéria "Projeto Integrador Extensionista III" que visa reunir oportunidades educacionais e profissionalizantes em um só lugar, com a contribuição da sociedade para atualizar o sistema com as mesmas. Em suma, um **projeto que visa criar um portal de vagas educacionais e profissionalizantes.**

## Documentação:

### Diagramas:

#### Diagrama de Atividade:

##### Consulta de vagas:

```mermaid
activityDiagram
    title Diagrama de atividade de Consulta de vagas/oportunidades

    start
    :Usuário entra no site;
    :Tela Inicial;

    if ( ) then (selecionar opção 'vagas'\n(no header da tela))
    else (Botão "Ver Oportunidades")
    endif
    
    %% Ambos os caminhos levam à Tela de Vagas
    TelaVagas: :Tela de vagas;
    
    :Seleciona a instituição;
    note right: uma "janela z-index" é exibida
    
    :Seleciona a vaga/oportunidade;
    :Visualiza informações\nsobre a vaga;

    if (O usuário quer\nver outras\noportunidades?) then (Sim)
        :clica 'X' no topo da\n'janela z-index' para\nfechá-la;
        --> TelaVagas; %% Loop de volta para a tela de vagas
    else (Não)
        stop
    endif
```

##### Cadastro de Vagas/Oportunidades:

```mermaid
activityDiagram
    title Diagrama de atividade de Cadastro de vagas/oportunidades

    start
    :Usuário entra no site;
    :Tela Inicial;

    if () then (selecionar opção 'Vagas'\n(no header da tela))
    else (botão 'Ver Oportunidades')
    endif
    
    TelaVagas: :Tela de vagas;
    :Seleciona botão de\n'Adicionar vaga';

    if (Usuário já fez\nlogin no site?) then (Sim)
        --> CheckColaborador
    else (Não)
        --> TelaLogin
    endif
    
    subgraph "Fluxo de Autenticação/Cadastro"
        TelaLogin: :Tela de login;
        if (Usuário já é\ncadastrado?) then (Sim)
            :Insere credenciais;
            :Clica no botão\n'Entrar';
            if (As credenciais são\nválidas?) then (Sim)
                --> CheckColaborador
            else (Não)
                --> TelaLogin
            endif
        else (Não)
            TelaCadastroUsuario: :Tela de cadastro\nde usuário;
            :Selecionar checkbox\n'Quero ser um\ncolaborador';
            :Preenchimento dos\ncampos/formulários;

            if (Todos os campos\nobrigatórios\nforam preenchidos\ncorretamente?) then (Sim)
                :Clicar no botão\n'Finalizar cadastro';
                if (Existe uma conta de usuário\ncom o mesmo email/CPF\nnesse cadastro?) then (Não)
                    :A conta de\ncolaborador é criada;
                    --> CheckColaborador
                else (Sim)
                    :A conta de usuário\né sinalizada para\nexclusão pelo sistema;
                    --> TelaCadastroUsuario
                endif
            else (Não)
                --> TelaCadastroUsuario
            endif
        endif
    end

    CheckColaborador: if (A conta\né de\ncolaborador?) then (Sim)
        :O sistema exibe uma\n'janela-modal';
        if (A instituição que está\nassociada à vaga já está\ncadastrada no sistema?) then (Sim)
            --> SelecionarInstituicao
        else (Não)
            --> TelaCadastroInstituicao
        endif
    else (Não)
        --> TelaVagas
    endif

    subgraph "Fluxo de Criação de Oportunidade"
        TelaCadastroInstituicao: :Tela de cadastro de\ninstituição;
        :Preencher\ncampos/formulários;

        if (Todos campos\nforam preenchidos\ncorretamente?) then (Sim)
            :clicar no botão\n'Finalizar cadastro';
            if (A instituição é salva\nno banco de dados e\nexibida no site?) then (Sim)
                --> SelecionarInstituicao
            else (Não)
                --> TelaCadastroInstituicao
            endif
        else (Não)
            --> TelaCadastroInstituicao
        endif

        SelecionarInstituicao: :Selecionar a\ninstituição que está\nassociada à vaga no\n'select-box';
        :Preencher os\ncampos/formulários;
        :clicar no botão\n'Finalizar cadastro';

        if (Todos campos\nforam preenchidos\ncorretamente?) then (Sim)
            :A oportunidade é\nsalva no banco de\ndados e exibida no\nsite.;
            stop
        else (Não)
            --> SelecionarInstituicao
        endif
    end
```

#### Diagrama de Classes:

#### Diagrama de Caso de Uso: