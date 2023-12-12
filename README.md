# DEV-TO-DEV
Sistema de simulação de rede social voltado para desenvolvedores de jogos.

Sistema permite:
<li>Cadastrar usuário</li>
<li>Logar usuário</li>
<li>Postar textos</li>
<li>Postar imagens/gifs</li>
<li>Curtir posts</li>
<li>Comentar em posts</li>
<li>Customizar perfil</li>
<li>Criar um perfil para seu jogo</li>
<li>Visualizar perfis de outros usuários</li>
<li>Visualizar perfis de jogos de outros usuários</li>
<br>
(OBS: Para testar a postagem de imagens requer uma conta no cloudinary!)

<hr>

# BANCO DE DADOS
*XAMPP é necessário*
<li>Inicie o módulo Apache e MySQL no XAMPP</li>
<li>Crie o banco de dados de acordo com o script 'database' na pasta 'database'</li>
<li>Popule o banco de dados de acordo com o script 'data' na pasta 'database'</li>

# CLOUDINARY
*Este projeto utiliza o cloudinary para armazenar imagens*
<li>Crie um arquivo .env na pasta API e adicione os itens de seu banco de dados do cloudinary</li>
<li>CLOUD_NAME=dneit0fsb</li>
<li>API_KEY=611117938683436</li>
<li>API_SECRET=kUiQ-6v8PkTC1iIIT_3BEwYYqfA</li>

# BACKEND
*Instale o nodemon e yarn globalmente*
<li>npm i -g nodemon</li>
<li>npm i -g yarn</li>
<br>


*Adicione as dependências para a api funcionar*

<li>cd api</li>
<li>yarn add express cors mysql multer fs cloudinary dotenv</li>
<li>nodemon</li>

# FRONTEND
*Instale as dependências*
<li>cd frontend</li>
<li>yarn add electron tailwindcss axios</li>

# Execute o script Electron JS
<li>yarn run dev</li>
