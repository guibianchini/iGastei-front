import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import {
  IonicModule,
  LoadingController,
  AlertController,
  MenuController,
  NavController,
  ToastController,
} from '@ionic/angular';

import { Usuario } from '../nucleo/models/usuario.model';
import { StorageService } from '../nucleo/services/storage-service';

@Component({
  selector: 'app-por-banco',
  templateUrl: './por-banco.page.html',
  styleUrls: ['./por-banco.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule],
  providers: [HttpClient, Storage, StorageService],
})
export class PorBancoPage implements OnInit {
  public usuario: Usuario = new Usuario();
  public lista_gastos: {
    banco: number;
    banco_nome: string;
    total_valor: number;
  }[] = [];
  public valor_total: number | null = null;

  constructor(
    public http: HttpClient,
    public controle_menu: MenuController,
    public controle_toast: ToastController,
    public controle_navegacao: NavController,
    public controle_armazenamento: StorageService,
    public controle_carregamento: LoadingController,
    public controle_alerta: AlertController
  ) {
    this.controle_menu.enable(true);
  }

  async ngOnInit() {
    // Verifica se existe registro de configuração para o último usuário autenticado
    const registro = await this.controle_armazenamento.get('usuario');
    if (registro) {
      this.usuario = Object.assign(new Usuario(), registro);
      this.consultarGastos();
    } else {
      this.controle_navegacao.navigateRoot('/login');
    }
  }

  ionViewWillEnter() {
    this.consultarGastos();
  }

  async consultarGastos() {
    // Inicializa interface com efeito de carregamento
    const loading = await this.controle_carregamento.create({
      message: 'Autenticando...',
      duration: 15000,
    });
    await loading.present();

    let http_headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.usuario.token}`,
    });

    // Requisita lista de gastos para a API do sistema web
    this.http
      .get('http://127.0.0.1:8000/gastos/api/por-bancos', {
        headers: http_headers,
        params: {
          quitada: true,
        },
      })
      .subscribe({
        next: async (resposta: any) => {
          this.lista_gastos = resposta;
          this.valor_total = this.lista_gastos.reduce((total) => {
            return total;
          }, 0);
          // Finaliza interface com efeito de carregamento
          loading.dismiss();
        },
        error: async (erro: any) => {
          loading.dismiss();
          const mensagem = await this.controle_toast.create({
            message: `Falha ao consultar gastos: ${erro.message}`,
            cssClass: 'ion-text-center',
            duration: 2000,
          });
          mensagem.present();
        },
      });
  }
}
