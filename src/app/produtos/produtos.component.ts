import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'app/firebase.service';

@Component({
    selector: 'app-table-list',
    templateUrl: './produtos.component.html',
    styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

    public produtos: any = [];
    public produtosAux: any = [];
    public formasDePagamento: any = [];
    public formasDePagamentoAux: any = [];
    public formaDePagamento: any;
    public produto: any;
    public paginaAtual = 1;
    public quantidade: any = 0;

    public unidade: any;

    constructor(private firebaseService: FirebaseService) { }

    async ngOnInit() {
        this.unidade = 'Comércio Zeus';
        await this.findAllProducts();
        await this.findAllFormasPagamento();
        console.log('aquuii');
        console.log(this.formasDePagamento);
        
        
    }

    public async findAllProducts() {
        this.produtos = [];
        this.quantidade = 0;
        this.produtosAux = [];

        this.firebaseService.findAllProducts(this.unidade).subscribe(data => {
            this.produtosAux = data;
            for (let produto of this.produtosAux) {
                this.produtos.push(produto);
                this.quantidade += 1;
            }
        });
    }

    public async findAllFormasPagamento() {
        this.formasDePagamento = [];
        this.formasDePagamentoAux = [];

        this.firebaseService.findAllFormasPagamento().subscribe(data => {
            this.formasDePagamentoAux = data;
            for (let formaDePagamento of this.formasDePagamentoAux) {
                this.formasDePagamento.push(formaDePagamento);
            }
        });
    }
}
