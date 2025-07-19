# Target RN - App de Metas Financeiras

<div align="center">
  <img src="./assets/adaptive-icon.png" alt="Target RN Logo" width="120" height="120">
</div>

## 📱 Sobre o Projeto

**Target RN** é um aplicativo móvel desenvolvido em React Native que permite aos usuários gerenciar suas metas financeiras de forma simples e intuitiva. O app oferece funcionalidades para criar, acompanhar e gerenciar objetivos financeiros, além de controlar entradas e saídas de dinheiro.

## ✨ Funcionalidades

- 🎯 **Gestão de Metas**: Crie e gerencie suas metas financeiras
- 📊 **Acompanhamento de Progresso**: Visualize o progresso de cada meta em porcentagem
- 💰 **Controle Financeiro**: Registre entradas e saídas de dinheiro
- 📈 **Resumo Financeiro**: Acompanhe seu saldo total, entradas e saídas
- 🔄 **Transações**: Adicione transações relacionadas às suas metas
- 📱 **Interface Intuitiva**: Design moderno e responsivo
- 💾 **Armazenamento Local**: Dados salvos localmente usando SQLite

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma de desenvolvimento e build
- **TypeScript** - Linguagem de programação tipada
- **Expo Router** - Sistema de navegação
- **Expo SQLite** - Banco de dados local
- **React Native Currency Input** - Input para valores monetários
- **Day.js** - Manipulação de datas
- **Expo Linear Gradient** - Gradientes visuais

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI
- Android Studio (para desenvolvimento Android)
- Xcode (para desenvolvimento iOS - apenas macOS)

## 🚀 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/marlisonmourao/target-app-rn.git
   cd target-app-rn
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Inicie o projeto**
   ```bash
   npm start
   # ou
   yarn start
   ```

4. **Execute no dispositivo/emulador**
   ```bash
   # Para Android
   npm run android
   
   # Para iOS
   npm run ios
   
   # Para Web
   npm run web
   ```

## 📱 Como Usar

### Criando uma Meta
1. Na tela inicial, toque em "Nova meta"
2. Digite o nome da meta
3. Defina o valor alvo
4. Toque em "Salvar"

### Acompanhando o Progresso
- Visualize todas as suas metas na tela inicial
- Cada meta mostra o progresso atual em porcentagem
- Toque em uma meta para ver detalhes e adicionar transações

### Gerenciando Transações
1. Acesse uma meta em andamento
2. Adicione transações de entrada ou saída
3. Acompanhe como as transações afetam o progresso da meta

## 🏗️ Estrutura do Projeto

```
src/
├── app/                 # Páginas da aplicação (Expo Router)
├── components/          # Componentes reutilizáveis
├── database/           # Configuração e hooks do banco de dados
├── theme/              # Configurações de tema e cores
└── utils/              # Utilitários e helpers
```

## 📊 Banco de Dados

O aplicativo utiliza SQLite local para armazenar:
- **Metas**: Nome, valor alvo, valor atual
- **Transações**: Tipo (entrada/saída), valor, descrição, data

## 🎨 Design System

O projeto utiliza um design system consistente com:
- Cores padronizadas
- Tipografia uniforme
- Componentes reutilizáveis
- Interface responsiva

## 📦 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run android` - Executa no Android
- `npm run ios` - Executa no iOS
- `npm run web` - Executa na web

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Marlison Mourão**

- GitHub: [@marlisonmourao](https://github.com/marlisonmourao)
- Repositório: [target-app-rn](https://github.com/marlisonmourao/target-app-rn.git)

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões, por favor abra uma [issue](https://github.com/marlisonmourao/target-app-rn/issues) no repositório.

---

<div align="center">
  <p>Feito com ❤️ por Marlison Mourão</p>
</div> 