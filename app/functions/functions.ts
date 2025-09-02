export function apenasNumeros(str: string): boolean {
  return /^[0-9]+$/.test(str);
};

export function formatarData(dataString: string): string {
  const data = new Date(dataString); // Cria um objeto Date a partir da string
  const dia = data.getDate().toString().padStart(2, '0'); // Obtém o dia e formata com zero à esquerda se necessário
  const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Obtém o mês (lembrando que janeiro é 0) e formata
  const ano = data.getFullYear(); // Obtém o ano

  return `${dia}/${mes}/${ano}`;
};

export function ValidaDocumento(document: string): string {
  // Remove qualquer caractere não numérico
  document = document.replace(/\D/g, '');

  if (document.length === 11) { // CPF
      return document.padStart(11, '0');
  } else if (document.length === 14) { // CNPJ
      return document.padStart(14, '0');
  } else if (document.length < 11) { // CPF incompleto
      return document.padStart(11, '0');
  } else if (document.length > 11 && document.length < 14) { // CNPJ incompleto
      return document.padStart(14, '0');
  } else {
      throw new Error("O documento fornecido tem um comprimento inválido.");
  }
}

export function FormataCNPJCPF(value: string) {
  value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

  if (value.length <= 11) { // Formatação para CPF
    // value = value.padStart(11, '0'); // Inclui zeros à esquerda
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else { // Formatação para CNPJ
    // value = value.padStart(14, '0'); // Inclui zeros à esquerda
    value = value.replace(/(\d{2})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1/$2');
    value = value.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }
  return value;
};

export function MascaraCNPJCPF(value: string) {
  value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

  if (value.length <= 11) { // Formatação para CPF
     value = value.padStart(11, '0'); // Inclui zeros à esquerda
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else { // Formatação para CNPJ
     value = value.padStart(14, '0'); // Inclui zeros à esquerda
    value = value.replace(/(\d{2})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1/$2');
    value = value.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }
  return value;
};

export function truncateString(input: string, maxLength: number): string {
  if (input.length <= maxLength) {
    return input;
  }
  const truncated = input.substring(0, maxLength - 3) + "...";
  return truncated;
};

export function formatarDinheiro(valor: string | number, locale: string = 'pt-BR', currency: string = 'BRL'): string {
  if (valor != null) {
    const valorString = valor.toString();
    const valorNumerico = parseFloat(valorString.replace(/[^0-9.-]+/g, ''));
    return valorNumerico.toLocaleString(locale, {
      style: 'currency',
      currency: currency
    });
  } else {
    return ""
  }

}