import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from './services/calculadora.service';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  private numero1: string;
  private numero2: string;
  private resultado: number;
  private operacao: string;

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit(): void {
    this.limpar();
  }

  limpar(): void{
    this.numero1 = '0';
    this.numero2 = null;
    this.resultado = null;
    this.operacao = null;
  }

  /* Método para adicionar o número selecionado para o cálculo no  futuro */
  adicionarNumero (numero: string): void {
    if(this.operacao === null) {
      this.numero1 = this.concatenarNumero(this.numero1, numero);
    } else {
      this.numero2 = this.concatenarNumero(this.numero2, numero);
    }
  }

  /* Retorna o valor concatenado. Trata o separador decimal */
  concatenarNumero(numAtual: string, numConcat: string) {
    // caso tenha apenas '0' ou null, reinicia o valor
    if(numAtual === '0' || numAtual === null){
      numAtual = '';
    }

    // primeiro digito é '.', concatena '0' antes do '.'
    if(numConcat === '.' && numAtual === '') {
      return '0.';
    }

    // caso '.' digitado e já contenha um '.' apenas retorna
    if(numConcat === '.' && numAtual.indexOf('.')>-1){
      return numAtual;
    }
    return numAtual + numConcat;
  }

  definirOperacao(operacao: string): void {
    // apenas define a operacao caso não exista uma
    if(this.operacao === null) {
      this.operacao = operacao;
      return;
    }

    // caso a operação definida e número 2 selecionado, efetua o calculo da operação
    if(this.numero2 !== null) {
      this.resultado = this.calculadoraService.calcular(
        parseFloat(this.numero1),
        parseFloat(this.numero2),
        this.operacao);
      this.operacao =  operacao;
      this.numero1 = this.resultado.toString();
      this.numero2 = null;
      this.resultado = null;
    }
  }

  // efetua o cálculo de uma operação
  calcular(): void {
    if(this.numero2 === null) {
      return;
    }

    this.resultado = this.calculadoraService.calcular(
      parseFloat(this.numero1),
      parseFloat(this.numero2),
      this.operacao);
  }

  // retorna o valor a ser exibido na calculadora
  get display(): string {
    if(this.resultado !== null) {
      return this.resultado.toString();
    }
    if(this.numero2 !== null) {
      return this.numero2;
    }
    return this.numero1;
  }
}
