import { ColorWatchClassType } from "../enumColor";
import { BlinkableType, typeofBlinkable } from "./type";

export class watchView {

  private rootElement: HTMLElement;

  private hourDisplay: HTMLElement;
  private minuteDisplay: HTMLElement;
  private secondDisplay: HTMLElement;

  private buttonMode: HTMLButtonElement;
  private buttonLight: HTMLButtonElement;

  private notification: HTMLElement;

  constructor(private id: number) {
    this.renderDom();
    this.hourDisplay = document.getElementById(`hour-${id}`);
    this.minuteDisplay = document.getElementById(`min-${id}`);
    this.secondDisplay = document.getElementById(`sec-${id}`);
    this.buttonMode = document.getElementById(`mode-button-${id}`) as HTMLButtonElement;
    this.buttonLight = document.getElementById(`light-button-${id}`) as HTMLButtonElement;
    this.notification = document.getElementById(`notification-${id}`) as HTMLButtonElement;
  }

  getHourDisplay(): HTMLElement {
    return this.hourDisplay;
  }

  getMinuteDisplay(): HTMLElement {
    return this.minuteDisplay;
  }

  renderDom(): void {
    this.rootElement = document.querySelector('body') as HTMLElement;
    this.rootElement.insertAdjacentHTML('beforeend', `
      <main>
        <div class="container">
          <button id="mode-button-${this.id}" class="mode-button">Mode</button>
          <button id="light-button-${this.id}" class="light-button">Light</button>
          <div id="timer-${this.id}" class="timer-white">
            <span id="hour-${this.id}" class="hr">00</span>: 
            <span id="min-${this.id}" class="min">00</span>:
            <span id="sec-${this.id}" class="sec">00</span>
          </div>
        </div>
        <span id="notification-${this.id}" class="notification"></span>
      </main>
    `);
  }

  getButtonMode() {
    return this.buttonMode;
  }

  getButtonLight() {
    return this.buttonLight;
  }

  renderTime(date: string) {
    const [hours, minutes, seconds] = date.split(':');
    
    // Formater l'heure, minute et seconde avec un zéro devant si nécessaire
    const formattedHours = hours;
    const formattedMinutes = minutes;
    const formattedSeconds = seconds;
  
    // Afficher l'heure dans l'élément correspondant
    if (formattedHours !== this.hourDisplay.innerText && !this.hourDisplay.hasAttribute('contenteditable')) {
      this.hourDisplay.innerText = formattedHours;
    }
  
    // Afficher les minutes dans l'élément correspondant
    if (formattedMinutes !== this.minuteDisplay.innerText && !this.minuteDisplay.hasAttribute('contenteditable')) {
      this.minuteDisplay.innerText = formattedMinutes;
    }
  
    // Afficher les secondes dans l'élément correspondant
    if (formattedSeconds !== this.secondDisplay.innerText) {
      this.secondDisplay.innerText = formattedSeconds;
    }
  }
  

  updateRender(blinking: BlinkableType | null) {
    typeofBlinkable.map((type) => {
      this[`${type}Display`].classList.remove('blink');
      this[`${type}Display`].setAttribute('contenteditable', 'false');
    });
    if (blinking) {
      this[`${blinking}Display`].classList.add('blink');
      this[`${blinking}Display`].setAttribute('contenteditable', 'true');
    }
  }

  updateBackgroungColor(className: ColorWatchClassType) {
    document.getElementById(`timer-${this.id}`).className = className;
  }

  renderNotification(msg: string) {
    this.notification.innerText = msg;
  }
}
