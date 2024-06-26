export class Gasto
{
    public id: number;
    public descricao: string;
    public categoria: number;
    public categoria_display: string;
    public parcela_atual?: number | null;
    public parcelas_totais?: number | null;
    public valor_parcela_atual?: number | null;
    public valor_total: number;
    public data_compra: Date;
    public tipo_pagamento: number;
    public tipo_pagamento_display: string;
    public usuario: number;
    public banco: number;
    public banco_display: string;
    public quitada?: boolean | null;
    public data_quitacao_prevista?: Date | null;

    constructor() {
        this.id = 0;
        this.descricao = '';
        this.categoria = 0;
        this.parcela_atual = 0;
        this.parcelas_totais = 0;
        this.valor_parcela_atual = 0;
        this.valor_total = 0;
        this.data_compra = new Date();
        this.tipo_pagamento = 0;
        this.usuario = 0;
        this.banco = 0;
        this.quitada = false;
        this.data_quitacao_prevista = new Date();
        this.categoria_display = '';
        this.banco_display = '';
        this.tipo_pagamento_display = '';
    }
}