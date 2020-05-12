import { TipoDespesa } from './tipodespesa';

export class Despesa {
    id: number;
    nome: string;
    data: string;
    valor: number;
    arquivo: string;
    tipoDespesa: TipoDespesa;
}
