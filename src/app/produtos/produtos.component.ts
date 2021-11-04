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
    public produto: any;

    public quantidade: any = 0;

    public unidade: any;

    constructor(private firebaseService: FirebaseService) { }

    async ngOnInit() {
        this.unidade = 'Comércio Zeus';
        this.findAllProducts();
        console.log('aqwuuiii');
        console.log(this.produtos);
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
}
