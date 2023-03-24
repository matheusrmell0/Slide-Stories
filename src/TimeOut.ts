/**
 * Classe para timeout para slides do tipo Stories com mais controle do tempo e intervalo
 * @param {TimerHandler} handler
 * Funcao de callback para ser ativada durante o tempo
 * @param {Number} id
 * Tempo na qual a funcao irá permanecer ativada
 */
export default class TimeOut {
  id: number;
  handler: TimerHandler;
  constructor(handler: TimerHandler, time: number) {
    // Funcao de callback armazenada
    this.handler = handler;
    // Limpa o setTimeout como propriedade
    this.id = setTimeout(handler, time);
  }
  clear(){
    // Limpa o ultimo setTimeout da callstack
    clearTimeout(this.id)
  }
}
