import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from 'app/firebase.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-table-list',
    templateUrl: './cadastro-de-produtos.component.html',
    styleUrls: ['./cadastro-de-produtos.component.css']
})
export class CadastroDeProdutosComponent implements OnInit {


    public categorias: any = [];

    public imagem: any;
    public categoria: any;
    public descricao: any;
    public marca: any;
    public quantidade: any;
    public comissao: any;
    public valorCusto: any;
    public valorVenda: any;

    constructor(private firebaseService: FirebaseService) { }

    ngOnInit() {
        this.imagem = "";
        this.carregaCategorias();
    }

    public async carregaCategorias() {
        this.firebaseService.findAllCategorias().subscribe(data => {
            console.log(data)
            this.categorias = data;
        })
    }

    // /**
    //  * Pegando imagem
    //  */
    async touchCapturandoImg(event) {
        let reader = new FileReader();
        reader.onload = (readerEvent) => {
            let imageData = (readerEvent.target as any).result;
            this.imagem = imageData;
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    async registerProduct(form: NgForm) {
        if (form.valid) {

            try {

                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: 'Deseja Cadastrar esse Produto?',
                    text: "Produto será cadastrado na sua base de dados!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Não',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {

                        if (this.categoria === 'Serviços')
                            this.quantidade = 'Serviços Disponíveis'

                        if (this.imagem.length === 0)
                            this.imagem = '';

                        let dados =
                            [{
                                "unidade": 'Comércio Zeus',
                                "codigoDeBarras": '',
                                "imagem": '',
                                "categoria": this.categoria,
                                "descricao": this.descricao,
                                "marca": this.marca,
                                "quantidade": this.quantidade,
                                "comissao": this.comissao,
                                "valorDeCusto": this.valorCusto,
                                "valorDeVenda": this.valorVenda

                            }];

                        console.log('aquii');
                        console.log(dados[0]);


                        this.firebaseService.registerProduct(dados[0]);

                        this.imagem = '';
                        this.categoria = '';
                        this.descricao = '';
                        this.quantidade = '';
                        this.comissao = '';
                        this.valorVenda = '';
                        this.valorCusto = '';

                        swalWithBootstrapButtons.fire(
                            'Parabéns!',
                            'Produto Cadastrado com Sucesso!',
                            'success'
                        )
                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            'Oops...',
                            'Não foi dessa vez)',
                            'error'
                        )
                    }
                })

            } catch (error) {

            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo deu errado! tente preencher todas as linhas...',
                footer: '<a href="">Why do I have this issue?</a>'
            })

        }
    }

}

