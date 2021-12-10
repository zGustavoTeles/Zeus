import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'app/firebase.service';
import * as Chartist from 'chartist';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    public produtos: any = [];
    public produtosAux: any = [];
    public produto: any;
    public paginaAtual = 1;
    public quantidade: any = 0;

    public unidade: any;

    constructor(private firebaseService: FirebaseService) { }
    ngOnInit(): void {
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

    startAnimationForLineChart(chart) {
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;

        chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq = 0;
    };
    startAnimationForBarChart(chart) {
        let seq2: any, delays2: any, durations2: any;

        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function (data) {
            if (data.type === 'bar') {
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq2 = 0;
    };

    chunk(arr, chunkSize) {
        let R = [];
        for (let i = 0, len = arr.length; i < len; i += chunkSize) {
            R.push(arr.slice(i, i + chunkSize));
        }
        return R;
    }

    public async addProductCarrinho(produto: any) {

        try {

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Deseja Adicionar esse Produto no carrinho?',
                text: "Produto será inserido no Carrinho!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
                reverseButtons: true
            }).then(async (result) => {
                if (result.isConfirmed) {


                    let dados =
                        [{
                            "unidade": produto.unidade,
                            "documento": '',
                            "documentoProduto": produto.documento,
                            "codigoDeBarras": produto.codigoDeBarras,
                            "imagem": produto.imagem,
                            "categoria": produto.categoria,
                            "descricao": produto.descricao,
                            "marca": produto.marca,
                            "quantidade": produto.quantidade,
                            "comissao": produto.comissao,
                            "valorDeCusto": produto.valorCusto,
                            "valorDeVenda": produto.valorVenda

                        }];

                    this.firebaseService.registerProductCarrinhoTemp(dados[0]);

                    swalWithBootstrapButtons.fire(
                        'Parabéns!',
                        'Produto Adicionado com Sucesso! :)',
                        'success'
                    )
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Oops...',
                        'Não foi dessa vez... :(',
                        'error'
                    )
                }
            })

        } catch (error) {

        }

    }
}
