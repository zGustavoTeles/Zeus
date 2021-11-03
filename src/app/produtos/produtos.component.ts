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
    }

    async ionViewDidEnter() {
        this.findAllProducts();
        console.log('aqwuuiii');
        console.log(this.produtos);
    }

    public async findAllProducts() {
        this.firebaseService.findAllProducts(this.unidade).subscribe(data => {
            this.produtos = [];
            this.quantidade = 0;
            data.forEach(row => {
                this.produtosAux = [];
                let line = Object(row.payload.doc.data());
                line.doc = String(row.payload.doc.id);
                this.produtosAux.push(line);
                for (let produto of this.produtosAux) {
                    this.produtos.push(produto);
                    this.quantidade += 1;
                }
            });
        });
    }

}
