export interface EnviaTokenRequest {
  Cgccpf: string;
  EmailContato: string;
}

export interface ConsultaDuplicatasRequest {
  Codcliente: string;
  Codempresacli: string;
}

export interface DuplicatasResponse {
  Codconta: number;
  NroDocumento: string;
  Codcliente: number;
  CNPJ: string;
  Nomcliente: string;
  Datvencto: string;
  Vlrvencto: string;
  LinhaDigitavel: string;
  Urlboleto: string;
  Razaosocial: string;
}

export interface ValidaTokenRequest{
  Cgccpf: string;
  Token: string;
  Email:string;
}


export interface ValidaTokenResponse{
  Codcliente: string;
  Codempresacli: string;
}