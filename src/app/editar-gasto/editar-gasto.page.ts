import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { Gasto } from '../home/gasto.model';

@Component({
  selector: 'app-editar-gasto',
  templateUrl: './editar-gasto.page.html',
  styleUrls: ['./editar-gasto.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HttpClient, Storage, StorageService],
})
export class EditarGastoPage implements OnInit {
  public usuario: Usuario = new Usuario();
  public gasto: FormGroup = this.fb.group({
    descricao: new FormControl<string | undefined>(undefined, [
      Validators.required,
      Validators.maxLength(100),
    ]),
    categoria: new FormControl<number>(1, Validators.required),
    valor_total: new FormControl<number | undefined>(undefined, [
      Validators.required,
      Validators.min(0.01),
    ]),
    data_compra: new FormControl<string>(
      this.formatarData(new Date()),
      Validators.required
    ),
    tipo_pagamento: new FormControl<number>(1, Validators.required),
    banco: new FormControl<number>(1, Validators.required),
    parcelas_totais: new FormControl<number | null>(null),
  });

  formatarData(data: Date): string {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${ano}-${mes}-${dia}`; // Formato YYYY-MM-DD
  }

  constructor(
    public http: HttpClient,
    public controle_menu: MenuController,
    public controle_toast: ToastController,
    public controle_navegacao: NavController,
    public controle_armazenamento: StorageService,
    public controle_carregamento: LoadingController,
    public controle_alerta: AlertController,
    public fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.controle_menu.enable(true);
  }

  async ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const gastoPassado = params['gasto'] as Gasto;
      this.gasto = this.fb.group({
        id: new FormControl<number | string>(gastoPassado.id, Validators.required),
        descricao: new FormControl<string | undefined>(gastoPassado.descricao, [
          Validators.required,
          Validators.maxLength(100),
        ]),
        categoria: new FormControl<number | string>(
          gastoPassado.categoria.toString(),
          Validators.required
        ),
        valor_total: new FormControl<number | undefined>(
          gastoPassado.valor_total,
          [Validators.required, Validators.min(0.01)]
        ),
        data_compra: new FormControl<string>(
          this.formatarData(new Date(gastoPassado.data_compra)),
          Validators.required
        ),
        tipo_pagamento: new FormControl<number | string>(
          gastoPassado.tipo_pagamento.toString(),
          Validators.required
        ),
        banco: new FormControl<number | string>(
          gastoPassado.banco.toString(),
          Validators.required
        ),
        parcelas_totais: new FormControl<number | null>(
          gastoPassado?.parcelas_totais || null
        ),
      });
    });
    // Verifica se existe registro de configuração para o último usuário autenticado
    const registro = await this.controle_armazenamento.get('usuario');
    if (registro) {
      this.usuario = Object.assign(new Usuario(), registro);
      // this.consultarGastos();
    } else {
      this.controle_navegacao.navigateRoot('/login');
    }
  }

  async editarGasto() {
    // Inicializa interface com efeito de carregamento
    // const loading = await this.controle_carregamento.create({});
    // loading.present();
    if (this.gasto.invalid) {
      const toast = await this.controle_toast.create({
        message: 'Por favor, preencha todos os campos obrigatórios.',
        duration: 2000,
        position: 'top',
        color: 'danger',
      });
      toast.present();
      return;
    }

    const gasto = this.gasto.value;
    let http_headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.usuario.token}`,
    });

    // Deleta instância de gasto via API do sistema web
    this.http
      .put(`http://127.0.0.1:8000/gastos/api/editar/${gasto.id}/`, gasto, {
        headers: http_headers,
      })
      .subscribe({
        next: async (resposta: any) => {
          this.controle_navegacao.navigateRoot('/home', {
            state: { recarregar: true },
          });
        },
        error: async (erro: any) => {
          const mensagem = await this.controle_toast.create({
            message: `Falha ao editar o gasto: ${erro.message}`,
            cssClass: 'ion-text-center',
            duration: 2000,
          });
          mensagem.present();
        },
      });
  }
}
