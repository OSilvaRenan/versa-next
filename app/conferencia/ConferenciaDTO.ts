
export interface Page {
  RecordsCount?: number;
  PageIndex: number;
  PageSize: number;
}

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
}

export interface conferenciaResponse {
  Codconferencia: number;
  Codempresa: number;
  Codproduto: number;
  Nomproduto: string;
  Quantidade: number;
  Qtdconferida: number;
  Localizacao: string;
  Isbn: string;
}