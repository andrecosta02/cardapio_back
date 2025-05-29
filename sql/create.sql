create database site_cardapio;

use site_cardapio;

select *
from Produtos;

select *
from Empresas;

select *
from Categorias;

CREATE TABLE Empresas (
    id_empresa INT AUTO_INCREMENT PRIMARY KEY,
    nome_fantasia VARCHAR(100) NOT NULL,
    razao_social VARCHAR(100),
    slug_subdominio VARCHAR(100) UNIQUE NOT NULL,
    email_administrador VARCHAR(100) NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    telefone_contato VARCHAR(20),
    logo_url VARCHAR(255),
    endereco TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Formas_de_Pagamento (
    id_forma_pagamento INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL
);

CREATE TABLE Empresa_Forma_Pagamento (
    id_empresa INT,
    id_forma_pagamento INT,
    PRIMARY KEY (id_empresa, id_forma_pagamento),
    FOREIGN KEY (id_empresa) REFERENCES Empresas(id_empresa) ON DELETE CASCADE,
    FOREIGN KEY (id_forma_pagamento) REFERENCES Formas_de_Pagamento(id_forma_pagamento) ON DELETE CASCADE
);

CREATE TABLE Categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    id_empresa INT,
    nome_categoria VARCHAR(100) NOT NULL,
    ordem_exibicao INT DEFAULT 0,
    FOREIGN KEY (id_empresa) REFERENCES Empresas(id_empresa) ON DELETE CASCADE
);

CREATE TABLE Produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    id_empresa INT,
    id_categoria INT,
    nome_produto VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    imagem_url VARCHAR(255),
    ativo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_empresa) REFERENCES Empresas(id_empresa) ON DELETE CASCADE,
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria) ON DELETE SET NULL
);

CREATE TABLE Pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_empresa INT,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    nome_cliente VARCHAR(100),
    forma_pagamento INT,
    valor_total DECIMAL(10,2),
    status ENUM('recebido', 'em preparo', 'finalizado', 'cancelado') DEFAULT 'recebido',
    FOREIGN KEY (id_empresa) REFERENCES Empresas(id_empresa) ON DELETE CASCADE,
    FOREIGN KEY (forma_pagamento) REFERENCES Formas_de_Pagamento(id_forma_pagamento) ON DELETE SET NULL
);

CREATE TABLE Itens_Pedido (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT,
    id_produto INT,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_produto) REFERENCES Produtos(id_produto) ON DELETE SET NULL
);

CREATE TABLE parametros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  grupo VARCHAR(50) NOT NULL,
  chave VARCHAR(100) NOT NULL,
  valor TEXT NOT NULL,
  descricao TEXT,
  atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE(grupo, chave)            -- garante que não haja duplicidade
);
