# Implementation Plan: Data Gen Autofill Extension

Este plano detalha as etapas para implementar as novas funcionalidades da extensão "Data Gen Autofill", focada em auxiliar desenvolvedores a testarem formulários de forma rápida e eficiente.

## 🎯 Objetivos Centrais
- Automação de preenchimento de inputs com dados randômicos (válidos e inválidos).
- Interface de usuário fluida e contextual (popup no input).
- Acesso rápido via menu de ícone e menu de contexto.

---

## 🏗️ Fases da Implementação

### 1. Motor de Geração de Dados (`utils/generators.js`)
Criar uma biblioteca robusta para geração de dados com suporte a variações:
- **CPF/CNPJ**: Gerar válidos (algoritmo real) e inválidos (mesmo tamanho mas checksum errado).
- **Nome**: Nomes completos, parciais (ex: sem sobrenome), com caracteres especiais ou números.
- **Telefone**: Formatos válidos, curtos demais, longos demais, todos zeros.
- **Opções de Geração**: Permitir passar flags (ex: `{ type: 'cpf', valid: false }`).

### 2. UI Contextual no Input ([content.js](content.js) + `styles/content.css`)
Implementar o popup que aparece quando um input dá "match" com o tipo:
- **Detecção**: Ao focar (focus) em um `<input>`, verificar `name`, `id`, `placeholder` ou `label` associado para inferir o tipo (ex: "cpf", "name", "tel").
- **Bubble UI**: Mostrar um pequeno ícone ou botão flutuante perto do input.
- **Ação**: Ao clicar, abrir menu rápido para gerar e preencher o valor escolhido.

### 3. Melhoria no Popup Principal ([popup.html](popup.html) + [popup.js](popup.js))
Refinar o menu acessível pelo ícone no topo direito:
- **Menu Centralizado**: Seção "Generate Data" com dropdown ou cards para escolha.
- **Gerar/Copiar**: Botão para gerar sem preencher (apenas copiar para clipboard).
- **Fluxo Amigável**: Design premium com animações sutis e feedback visual de "Copiado!".

### 4. Menu de Contexto (`background.js`)
Configurar o menu de clique direito:
- **API `chrome.contextMenus`**: Registrar o menu geral "Generate Data" que aparece no body/background da página.
- **Submenus**: Organizar por tipo (Nome, CPF, CNPJ, Tel).
- **Comunicação**: O background script gera o dado e envia uma mensagem para o [content.js](content.js) preencher o elemento clicado (ou focado).

### 5. Configuração e Permissões ([manifest.json](manifest.json))
- Adicionar permissão `"contextMenus"`.
- Adicionar script de background (service worker).
- Adicionar estilos e scripts injetados.

---

## ✅ Critérios de Aceite (UAT)

| Funcionalidade | Descrição do Teste |
| :--- | :--- |
| **Geração de CPF** | Deve gerar CPFs válidos e inválidos sob demanda. |
| **Geração de Nomes** | Deve incluir opções com caracteres especiais para teste de sanitização. |
| **Popup Contextual** | Deve aparecer ao focar em um campo marcado como `id="cpf"`. |
| **Menu de Contexto** | Ao clicar com botão direito -> Generate -> CPF, o campo selecionado deve ser preenchido. |
| **Popup do Ícone** | Deve permitir selecionar o tipo, visualizar o valor e copiar com um clique. |

---

## 🛠️ Tecnologias
- **Manifest V3**
- **Vanilla JS & CSS**
- **Chrome Extension APIs**: `chrome.runtime`, `chrome.tabs`, `chrome.contextMenus`, `chrome.storage`.

---

> [!TIP]
> Podemos usar a biblioteca `faker` (lite version) para nomes e endereços, ou manter implementações puras para controle total sobre "dados inválidos".

> [!IMPORTANT]
> A detecção de tipos de input deve ser robusta para não ser intrusiva em campos irrelevantes.
