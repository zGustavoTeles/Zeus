import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    collectionName = 'Zeus'
    constructor(
        private firestore: AngularFirestore,
        private angularFire: AngularFireAuth,
    ) { }


    /**
     * *---------------> FIREBASE PRODUTOS <---------------------
     */
    findAllCategorias() {
        return this.firestore
            .collection("Zeus " + "_Categorias", (ref) => ref.orderBy("descricao"))
            .valueChanges();
    }

    findAllProducts(unidade: any) {
        return this.firestore
            .collection("Zeus " + "_Produtos", (ref) => ref.where("unidade", "==", unidade))
            .valueChanges();
    }

    findAllFormasPagamento() {
        return this.firestore
            .collection("Zeus " + "_Formas_De_Pagamento", (ref) => ref.orderBy("descricao"))
            .valueChanges();
    }

    async registerProduct(dados: any): Promise<any> {
        const promise = new Promise(async (resolve, reject) => {
            try {
                this.firestore.collection("Zeus " + "_Produtos").add(dados).then(async data => {
                    let dadosProdutos =
                        [{
                            "documento": data.id
                        }];
                    this.updateProducts(data.id, dadosProdutos[0]);
                    resolve(data.id);
                }, err => {
                    reject(err);
                    console.log('Erro', err);
                });
            } catch (err) {

            }
        });
        return promise.then(res => {
            console.log('Retorno ', res);
        });
    }

    async registerProductCarrinhoTemp(dados: any): Promise<any> {
        const promise = new Promise(async (resolve, reject) => {
            try {
                this.firestore.collection("Zeus " + "_Carrinho_Temp").add(dados).then(async data => {
                    let dadosProdutos =
                        [{
                            "documento": data.id
                        }];
                    this.updateProductCarrinhoTemp(data.id, dadosProdutos[0]);
                    resolve(data.id);
                }, err => {
                    reject(err);
                    console.log('Erro', err);
                });
            } catch (err) {

            }
        });
        return promise.then(res => {
            console.log('Retorno ', res);
        });
    }

    async updateProducts(documento: any, dados: any) {
        this.firestore.doc('Zeus ' + '_Produtos' + '/' + documento).update(dados);
    }

    async updateProductCarrinhoTemp(documento: any, dados: any) {
        this.firestore.doc('Zeus ' + '' + '/' + documento).update(dados);
    }


    /**
     * *---------------> FIREBASE USUÁRIOS <---------------------
     */

    updateEmail(youEmail: any, password: any, newEmail: any) {
        this.angularFire.signInWithEmailAndPassword(youEmail, password)
            .then(function (userCredential) {
                userCredential.user.updateEmail(newEmail)
            })
    }

    updateSenha(youEmail: any, password: any, newPassword: any) {
        this.angularFire.signInWithEmailAndPassword(youEmail, password)
            .then(function (userCredential) {
                userCredential.user.updatePassword(newPassword)
            })
    }

}

