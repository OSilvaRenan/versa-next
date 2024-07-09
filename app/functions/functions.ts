export function apenasNumeros(str: string): boolean {
  return /^[0-9]+$/.test(str);
}

export function formatarData(dataString: string): string {
  const data = new Date(dataString); // Cria um objeto Date a partir da string
  const dia = data.getDate().toString().padStart(2, '0'); // Obtém o dia e formata com zero à esquerda se necessário
  const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Obtém o mês (lembrando que janeiro é 0) e formata
  const ano = data.getFullYear(); // Obtém o ano

  return `${dia}/${mes}/${ano}`;
}

export function truncateString(input: string, maxLength: number): string {
  if (input.length <= maxLength) {
      return input;
  }
  const truncated = input.substring(0, maxLength - 3) + "...";
  return truncated;
}