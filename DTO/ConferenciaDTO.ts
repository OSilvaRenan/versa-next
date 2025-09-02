import { Page } from "./PageDTO";

export interface ConferenciaRequestDTO {
  Codconferencia?: number;
  Indseparacao?: number;
  PeriodoInicial?: Date;
  PeriodoFinal?: Date;
  PeriodoTipo?: number;
  Codalmoxarifado?: number;
  Codoperacao?: number;
  Codsituacao?: number;
  Codcliente?: number;
  Page?: Page;
}

export interface ConferenciaResponseDTO {
  Codconferencia: number;
  Codempresa: number;
  Datconferencia: string;
  Indentradasaida: number;
  Indavulso: number;
  Indseparacao: number;
  Situacaoconferencia: string;
  Codcliente: number;
  Codempresacli: number;
  Codoperacao: number;
  Nomoperacao: string;
  Nomusuario: string;
  Codtransportadora: number;
  Nomtransportadora: string;
  Observ: string;
  Indurgencia: number;
  Datinicio: string;
  Datconclusao: string;
  Indauditoria: number;
  Codposicaotrabalho: number;
  QtdSobra: number;
  QtdPerda: number;
  Pesobrutobalanca: number;
  Qtdvolumes: number;
  Indorigem: number;
  Codorigem: number;
  Nroorigem: number;
  Datnota: string;
  Datnotafinal: string;
  Indnota: number;
  Nomcliente: string;
  Seqconferenciacaixa: string;
}

export interface conferenciaItensResponseDTO {
  Seqconferenciaitem: number;
  Codconferencia: number;
  Codempresa: number;
  Codproduto: number;
  Nomproduto: string;
  Quantidade: number;
  Qtdconferida: number;
  Nrocaixa: string;
  Isbn: string;
  Peso: number;
  Localizacao: string;
}

export interface conferenciaProdutoResponseDTO {
  Codconferencia: number;
  Codempresa: number;
  Codproduto: number;
  Nomproduto: string;
  Quantidade: number;
  Qtdconferida: number;
  Localizacao: string;
  Isbn: string;
  Nrocaixa: string;
  Seqconferenciaitem: number;
  Peso: number;
}

export interface conferenciaCaixasResponseDTO {
  Seqconferenciacaixa: number;
  Codempresa: number;
  Codconferencia: number;
  Nrocaixa: number;
  Pesobruto: number;
  Codembalagem: number;
  Intetiqueta?: number;
  Indetiqueta?: number;
  Indetiquetaentrega?: number;
  Dscembalagem: string;
}

export interface CaixaDTO {
  Nrocaixa: number;
  Codembalagem: number;
  Dscembalagem: string;
  Seqconferenciacaixa: number;
  PesoBruto: number;
  PesoLiquido: number;
}

export interface RegistraPesoRequest {
  Pesobruto: string;
  PesoLiquido: number;
}

export interface RegistraLeituraRequest {
  Codempresa: number;
  Nrocaixa: number;
  Codembalagem: number;
  Codproduto: number;
  Quantidade: number;
}

export interface RegistraCaixaRequest {
  Codempresa: number;
  Nrocaixa: number;
  Codembalagem: number;
};



