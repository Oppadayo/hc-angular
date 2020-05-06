export class Usuario {
  id: number;
  email: string;
  senha: string;
  ativo: number;
  codigoVerificador: string;
  perfis: string[] = [];
}
