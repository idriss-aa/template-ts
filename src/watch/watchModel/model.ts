import { BlinkableType } from "../../type";
import { ColorWatchClassType, ColorWatchType, EnumColorWatch } from "../enumColor";

export class watchModel {

  private time: Date;
  private hours: number;
  private minutes: number;
  private seconds: number;
  private blinking: BlinkableType = null;
  private colorBackground: ColorWatchType;


  constructor() {
    this.time = new Date();
    this.hours = this.time.getHours();
    this.minutes = this.time.getMinutes();
    this.seconds = this.time.getSeconds();
    this.colorBackground = 'WHITE';
  }

  getHours(): number {
    return this.hours;
  }

  setHours(hour: number): void {
    this.hours = hour;
    this.time.setHours(hour);
  }

  incrementTime(): void {
    this.time.setSeconds(this.time.getSeconds() + 1);
  }

  getMinutes(): number {
    return this.minutes;
  }

  setMinutes(minute: number): void {
    this.minutes = minute;
    this.time.setMinutes(minute);
  }

  getSeconds(): number {
    return this.seconds;
  }

  setSeconds(second: number): void {
    this.seconds = second;
    this.time.setSeconds(second);
  }
  
  getColorHex(): ColorWatchClassType {
    return EnumColorWatch[this.colorBackground].class;
  }

  getCurrentTime(): string {
    const hours = this.time.getHours().toString().padStart(2, '0');
    const minutes = this.time.getMinutes().toString().padStart(2, '0');
    const seconds = this.time.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
  

  setTime(date: Date) {
    this.time = date;
  }

  getBlinkking(): BlinkableType | null{
    return this.blinking;
  }
  
  mode(clickCount: number): void{
    if (clickCount === 1) {
      this.blinking = 'hour';
    } else if (clickCount === 2) {
      this.blinking = 'minute';
    } else if (clickCount === 3) {
      this.blinking = null;
    }
  }

  light(): void {
    this.colorBackground = this.colorBackground === 'WHITE' ? 'YELLOW' : 'WHITE';
  }
}
