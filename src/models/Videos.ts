export class Videos {
    constructor(
        private id: string,
        private titulo: string,
        private duracao: number,
        private dataUpdate: string
    ){}

    public getId():string {
        return this.id
    }

    public setId(newId: string): void {
        this.id = newId
    }

    public getTitulo():string {
        return this.titulo
    }

    public setTitulo(newTitulo: string): void {
        this.titulo = newTitulo
    }

    public getDuracao():number {
        return this.duracao
    }

    public setDuracao(newDuracao: number): void {
        this.duracao = newDuracao
    }

    public getDataUpdate():string {
        return this.dataUpdate
    }

    public setDataUpdate(newDataUpdate: string): void {
        this.dataUpdate = newDataUpdate
    }
}