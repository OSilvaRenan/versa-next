export interface separacaoResponse {
  Codconferencia: number;
  Codempresa: number;
  Codproduto: number;
  Nomproduto: string;
  Quantidade: number;
  Qtdconferida: number;
  Localizacao: string;
  Isbn: string;
  Qtdseparada: number;
}

export interface CancelarSeparacaoRequest {
  Codconferencia: number;
}

export interface SeparacaoRequest {
  Codconferencia: number;
  Codusuario: number;
}

export interface AtualizaQtdRequest {
  Codconferencia: number;
  localizacao: string;
  Isbn: string;
  QtdSeparada: number;
}
