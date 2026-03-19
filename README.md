# 🚀 Data Gen Autofill - Extensão Chrome

Uma extensão poderosa e intuitiva para o Google Chrome que gera dados aleatórios (CPF, CNPJ, Nome, Telefone) de maneira rápida e prática, ideal para testes de software e preenchimento de formulários.

---

## 🚀 Como Instalar (Modo Desenvolvedor)

Como esta extensão ainda não está na Web Store, você deve instalá-la manualmente seguindo estes passos:

1.  **Prepare o Ambiente (Opcional, para testes):**
    - Se você deseja rodar os testes unitários ou contribuir, instale as dependências:
      ```bash
      npm install
      ```

2.  **Abra o Gerenciador de Extensões do Chrome:**
    - No navegador Chrome, digite `chrome://extensions/` na barra de endereços ou vá em `Menu (os três pontos) > Extensões > Gerenciar Extensões`.

3.  **Ative o "Modo do Desenvolvedor":**
    - No canto superior direito da página de extensões, ative a chave **Modo do desenvolvedor**.

4.  **Carregue a Extensão:**
    - Clique no botão **Carregar sem compactação** (Load unpacked) que aparecerá no canto superior esquerdo.
    - Selecione a pasta raiz deste projeto (a pasta que contém o arquivo `manifest.json`).

5.  **Pronto!** A extensão "Data Gen Autofill" agora aparecerá na sua lista de extensões e estará pronta para uso.

---

## 🧪 Desenvolvimento e Testes

Para garantir a qualidade do código, utilizamos o **Vitest** para testes unitários.

- **Rodar Testes:**
  ```bash
  npm test
  ```

---

## ✨ Funcionalidades

- **Geração Instantânea:** CPF, CNPJ, Nome Completo e Telefones válidos (ou inválidos para testes de erro).
- **Preenchimento Automático:** Detecta campos de entrada e permite preenchê-los com um clique.
- **Menu de Contexto:** Clique com o botão direito em qualquer campo para gerar e colar dados rapidamente.
- **Interface Moderna:** Design limpo e fácil de usar através do ícone da extensão.

---

## 🚀 Como Usar

### 1. Pelo Ícone da Extensão
Clique no ícone da peça de quebra-cabeça (Extensões) no Chrome, fixe o "Data Gen Autofill" e clique nele para abrir o popup. Lá você pode gerar dados e copiá-los para a área de transferência.

### 2. Diretamente nos Campos (Autofill)
Ao clicar em um campo de formulário compatível em qualquer site, um pequeno ícone ou menu flutuante poderá aparecer para oferecer opções de geração de dados.

### 3. Pelo Botão Direito (Menu de Contexto)
Clique com o botão direito em um campo de input e navegue até a opção **"Data Gen Autofill"** para selecionar o tipo de dado que deseja inserir.

---

## 📁 Estrutura do Projeto

- `manifest.json`: Configurações principais da extensão (Manifest V3).
- `content.js`: Script que interage com as páginas da web.
- `background.js`: Service worker para lidar com eventos de sistema e menus.
- `popup.html/js`: Interface e lógica do menu que aparece ao clicar no ícone.
- `utils/`: Funções utilitárias para geração de dados e detecção de campos.
- `styles/`: Arquivos CSS para estilização da interface.

---

## 📄 Licença

Este projeto é para fins de teste e desenvolvimento. Sinta-se à vontade para contribuir!

---
*Criado com ❤️ para facilitar a vida de testers e desenvolvedores.*
