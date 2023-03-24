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
  start: number;
  timeLeft: number;
  constructor(handler: TimerHandler, time: number) {
    this.handler = handler; // Funcao de callback armazenada
    this.id = setTimeout(handler, time); // Limpa o setTimeout como propriedade
    this.start = Date.now(); // Referencia do horario atual na qual a classe foi ativada
    this.timeLeft = time;
  }
  clear() {
    // Limpa o ultimo setTimeout da callstack
    clearTimeout(this.id);
  }
  pause() {
    // Metodo para pausar a callstack de acordo com o horario atual e salvar o tempo restante
    // Limpar qualquer fila na callstack
    this.clear();
    // Faz um calculo do horario atual na qual a classe foi ativada subtraido pelo horario atual na qual o metodo pause foi ativado
    const passed = Date.now() - this.start;
    // Armazena o calculo do tempo inferido para callstack da funcao subtraido pelo tempo já passado da callstack
    this.timeLeft = this.timeLeft - passed;
  }
  continue() {
    // Metodo para continuar a callstack restante de acordo com o horario atual
    // Limpar qualquer fila na callstack
    this.clear();
    // Reprogama a funcao de hanlder na classe com o tempo restante de callback armazenado
    this.id = setTimeout(this.handler, this.timeLeft)
    // Infere o tempo atual atualizado para o recalculo das funcoes
    this.start = Date.now();
  }
}
