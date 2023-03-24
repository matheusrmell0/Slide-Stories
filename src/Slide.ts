import TimeOut from './TimeOut';

/**
 * Classe para funcionalidades de um slide do tipo Stories
 * @param {Element} container
 * Define o container (wrapper) que sera o elemento pai dos slides
 * @param {Element} slides
 * Define o elemento do tipo Array que deverá conter uma lista dos elementos a serem utilizados como slide
 * @param {Element} controls
 * Define o elemento marcado que será utilizado como controles de usabilidade do slide
 * @param {Number} time
 * Define o tempo em milissegundos na qual o slide será apresentado na tela
 */
export default class Slide {
  container: Element;
  slides: Element[];
  controls: Element;
  time: number;
  index: number;
  slide: Element;
  timeOut: TimeOut | null;
  constructor(
    container: Element,
    slides: Element[],
    controls: Element,
    time: number = 5000,
  ) {
    this.container = container; // Container segurando os Slides
    this.slides = slides; // Array de Slides
    this.controls = controls; // Controle para usabilidade do slide
    this.time = time; // Tempo na tela que o slide é visível
    this.index = 0; // Index da array do Slide começando pelo primeiro
    this.slide = this.slides[this.index]; // Slide atual de acordo com o index
    this.timeOut = null; // Propriedade criada para armazenar o ultimo timeOut gerado
    // Iniciar metodos privados
    this.init();
  }
  hide(el: Element) {
    // Remove a visibilidade do elemento para o usúario
    el.classList.remove('active');
  }
  show(index: number) {
    // Mostra o slide para o usúario a partir do index
    // Salva o slide e seu index atual ativo no momento em uma propriedade
    this.index = index;
    this.slide = this.slides[this.index];
    // Realiza um loop que remove a visibilidade de todos os slides para o usúario
    this.slides.forEach((el) => this.hide(el));
    this.slide.classList.add('active');
    // Inicia o slide automatico logo após o slide autal ser renderizado
    this.auto(this.time);
  }
  prev() {
    // Verifica se o slide atual é maior que 0 e subtrai 1, caso não seja retorna o utlimo slide da array
    const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1;
    this.show(prev);
  }
  next() {
    // Compara o slide atual com o total de elementos que existem no slide, caso não seja retorna ao primeiro slide da array
    const next = this.index + 1 < this.slides.length ? this.index + 1 : 0;
    this.show(next);
  }
  auto(timer: number) {
    // Limpa o historico anterior de agendamento do time out se ouver e previne bugs na funcionalidade
    this.timeOut?.clear()
    // Funcao de auto play no proximo slide de acordo com o tempo deferido
    this.timeOut = new TimeOut(() => this.next(), timer);
  }
  private addControls() {
    // Adiciona os botoes de usabilidade no parametro controls
    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');
    // Eventos de pointerup para os mecanismos da classe
    prevButton.addEventListener('pointerup', () => this.prev());
    nextButton.addEventListener('pointerup', () => this.next());
    // Melhora de acessibilidade dos botoes (SEO)
    prevButton.innerText = 'Slide Anterior';
    nextButton.innerText = 'Próximo Slide';
    // Adiciona os botoes criados como filhos do elemento pai de controls instanciado via parametro
    this.controls.appendChild(prevButton);
    this.controls.appendChild(nextButton);
  }
  private init() {
    // Inicia metodos padroes obrigatorios
    this.addControls();
    this.show(this.index);
  }
}
