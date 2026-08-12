# Quitutes Reborn

Quero migrar integralmente o site atual deste repositório GitHub para a Lovable.
Repositório: https://github.com/Bernawsky/quitutes.git

A Lovable deve analisar todo o repositório e reproduzir o sistema completo dentro deste projeto. Não quero apenas uma cópia visual ou uma landing page semelhante. Quero que todas as funcionalidades, páginas, componentes, fluxos, regras de negócio e comportamentos existentes sejam implementados e funcionem na nova aplicação.

1. Migração integral do site

Analise todo o código existente no repositório e implemente na Lovable:

Todas as páginas e rotas.

Todos os componentes.

Todo o layout e identidade visual.

Responsividade para celular, tablet e desktop.

Formulários.

Botões e interações.

Validações.

Estados e feedbacks visuais.

Fluxos de navegação.

Regras de negócio.

Autenticação, caso existente.

Área administrativa, caso existente.

Integrações existentes.

Todas as funcionalidades que já existem no projeto.

O resultado deve ser funcionalmente equivalente ao site atual.

Não quero que você recrie o projeto do zero com um design genérico. Utilize o código, estrutura, lógica e referências existentes no repositório como fonte principal.

Preserve também o padrão visual já existente no projeto, incluindo tipografia, espaçamentos, componentes, cores, animações e comportamento responsivo.

2. Banco de dados

O projeto atualmente utiliza Neon/Vercel para banco de dados.

Quero substituir essa implementação completamente por Supabase.

Faça a migração da camada de banco de dados para Supabase, mantendo o mesmo funcionamento do sistema.

Analise o código atual para identificar:

Tabelas.

Relacionamentos.

Campos.

Tipos de dados.

Queries.

Inserts.

Updates.

Deletes.

Autenticação.

Regras de acesso.

Dados utilizados pelo frontend.

Qualquer outra dependência do banco atual.

Crie no Supabase a estrutura equivalente necessária e adapte o código da aplicação para utilizar exclusivamente o Supabase.

Não deixe dependências desnecessárias do Neon/Vercel no projeto.

Utilize boas práticas de segurança, incluindo RLS quando necessário, sem quebrar as funcionalidades existentes.

3. Sistema de redirecionamento para WhatsApp

Implemente o seguinte fluxo no sistema:

Grupo do WhatsApp:

https://chat.whatsapp.com/JBiJEQHZATBBhfA3e9ji3p

Quando o usuário clicar no botão correspondente para entrar no grupo:

Copie automaticamente uma mensagem definida pelo sistema para a área de transferência.

Mostre uma confirmação visual utilizando o sistema de UI já existente no projeto.

A confirmação deve informar claramente algo como:
"Copiado para a área de transferência"

Depois de uma pequena pausa, redirecione o usuário para o grupo do WhatsApp.

O usuário poderá então colar a mensagem no grupo.

A cópia deve acontecer diretamente dentro da interação do usuário para evitar bloqueios dos navegadores relacionados à Clipboard API.

O sistema deve funcionar em celular e notebook/desktop.

Caso a Clipboard API não esteja disponível ou seja bloqueada, implemente um fallback apropriado e informe o usuário caso a cópia não possa ser realizada.

Não tente alterar ou controlar a caixa de mensagem do WhatsApp. A função é somente copiar a mensagem para a área de transferência e depois abrir o grupo.

4. Validação obrigatória na seleção de chalés

Existe um fluxo de seleção/reserva de chalés.

Sempre que um chalé for selecionado, os campos de horário e quantidade de pessoas devem ser obrigatórios.

Ou seja:

O usuário não pode prosseguir sem informar o horário.

O usuário não pode prosseguir sem informar a quantidade de pessoas.

Ambos os campos devem possuir validação required.

A interface deve informar claramente quando algum dos campos estiver vazio.

A validação deve ocorrer tanto visualmente no frontend quanto na lógica responsável pelo envio/processamento dos dados.

Não permita que uma reserva/seleção seja enviada com horário ou quantidade de pessoas ausentes.

Essa regra deve ser aplicada a todos os chalés e em todos os fluxos em que um chalé possa ser selecionado.

5. Regra importante de implementação

Antes de modificar o projeto, analise o repositório inteiro para entender como o sistema atual funciona.

Não substitua funcionalidades existentes por versões simplificadas.

Não remova recursos existentes.

Não altere o design atual sem necessidade.

A prioridade é:

reproduzir integralmente o sistema atual + migrar Neon para Supabase + implementar o fluxo do WhatsApp + tornar horário e quantidade de pessoas obrigatórios na seleção dos chalés.

Ao finalizar, verifique o projeto inteiro para garantir que não existem:

Erros de build.

Rotas quebradas.

Componentes sem funcionamento.

Queries apontando para o banco antigo.

Dependências desnecessárias do Neon.

Formulários permitindo envio sem os campos obrigatórios.

Links ou botões quebrados.

Problemas de responsividade.

O projeto final deve funcionar como uma versão completa do site original, porém executando na infraestrutura da Lovable e utilizando Supabase como banco de dados.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://chalets-and-chat.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6bd9e8f6-7292-46d8-9b03-9e780e8075f8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
