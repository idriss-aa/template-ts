import { TimeZone } from "../GlobalView/type";
import { BlinkableType, typeofBlinkable } from "./type";

export class watchView {
  
  private rootElement: HTMLElement;

  private hourDisplay: HTMLElement;
  private minuteDisplay: HTMLElement;
  private secondDisplay: HTMLElement;
  private timezoneDisplay: HTMLElement

  private buttonMode: HTMLButtonElement;
  private buttonLight: HTMLButtonElement;
  private buttonIncrease: HTMLButtonElement;

  private notification: HTMLElement;

  constructor(private id: number) {
    this.renderDom();
    this.hourDisplay = document.getElementById(`hour-${id}`);
    this.minuteDisplay = document.getElementById(`min-${id}`);
    this.secondDisplay = document.getElementById(`sec-${id}`);
    this.buttonMode = document.getElementById(`mode-button-${id}`) as HTMLButtonElement;
    this.buttonIncrease = document.getElementById(`increase-button-${id}`)  as HTMLButtonElement;
    this.buttonLight = document.getElementById(`light-button-${id}`) as HTMLButtonElement;
    this.notification = document.getElementById(`notification-${id}`) as HTMLButtonElement;
    this.timezoneDisplay = document.getElementById(`timezone-${id}`) as HTMLButtonElement;
  }

  renderDom(): void {
    this.rootElement = document.querySelector('main') as HTMLElement;
    this.rootElement.insertAdjacentHTML('beforeend', `
        <div class="container">
          <button id="mode-button-${this.id}" class="mode-button">Mode</button>
          <button id="increase-button-${this.id}" class="increase-button">Increase</button>
          <button id="light-button-${this.id}" class="light-button">Light</button>
          <div id="timer-${this.id}" class="timer-white">
            <span id="hour-${this.id}" class="hr">00</span>: 
            <span id="min-${this.id}" class="min">00</span>:
            <span id="sec-${this.id}" class="sec">00</span>
          </div>
          <span id="timezone-${this.id}" class="timezone">${this.timezoneDisplay}<span/>
          <span id="notification-${this.id}" class="notification"></span>
        </div>
    `);
  }

  getButtonMode():HTMLButtonElement  {
    return this.buttonMode;
  }

  getButtonIncrease(): HTMLButtonElement {
    return this.buttonIncrease;
  }

  getButtonLight(): HTMLButtonElement {
    return this.buttonLight;
  }

  setHours(hours: string): void {
    this.hourDisplay.innerText = hours;
  }

  setMinutes(minutes: string): void {
    this.minuteDisplay.innerText = minutes;
  }

  setSeconds(seconds: string): void {
    this.secondDisplay.innerText = seconds;
  }

  setTimeZone(timeZone: TimeZone): void {
    this.timezoneDisplay.innerText =  timeZone.name;
  }

  setBlinking(blinking: BlinkableType | null): void {
    typeofBlinkable.map((type) => {
      this[`${type}Display`].classList.remove('blink');
    });
    if (blinking) {
      this[`${blinking}Display`].classList.add('blink');
    }
  }

  setIncreaseData(updatedField: BlinkableType, newValue: string): void {
    if (updatedField == "hour") {
      this.setHours(newValue);
    } else if (updatedField == "minute") {
      this.setMinutes(newValue);
    }
  }

  updateBackgroungColor(isLight: boolean): void {
    if(isLight) {
      document.getElementById(`timer-${this.id}`).className = 'timer-yellow';  
    } else {
      document.getElementById(`timer-${this.id}`).className = 'timer-white';
    }
  }


  setNotification(msg: string): void {
    this.notification.innerText = msg;
    setTimeout(() => {
      this.notification.innerText = "";
    }, 3000);
  }
}
