import { BlinkableType } from "../../type";
import { TimeZone } from "../GlobalView/type";
import { Hours, MinutesAndSeconds, SubscribersAction, WatchSubscribers } from "./type";

export class watchModel {

  private time: Date;
  private timezone: TimeZone;
  private blinking: BlinkableType = null;

  private isLightMode: boolean;
  private subscribers: WatchSubscribers;
  private interval?: NodeJS.Timeout;
  private fieldToIncrease: BlinkableType = null;
  private notification: string ;

  constructor(timezone: TimeZone) {
    this.time = new Date();
    this.timezone = timezone;

    this.isLightMode = false;
    this.notification = '';
    this.subscribers = {
      setHours: undefined,
      setMinutes: undefined,
      setSeconds: undefined,
      switchLightMode: undefined,
      setEditable: undefined,
      setIncrease: undefined,
      setNotification: undefined,
    };
  }

  subscribe<T extends SubscribersAction>(action: T, listener: WatchSubscribers[T]): void {
    this.subscribers[action] = listener;
  }

  notify(action: SubscribersAction) {
    switch (action) {
      case "setHours":
        this.subscribers.setHours(this.getHours());
        break;
      case "setMinutes":
        this.subscribers.setMinutes(this.getMinutes());
        break;
      case "setSeconds":
        this.subscribers.setSeconds(this.getSeconds());
        break;
      case "setEditable":
        this.subscribers.setEditable(this.blinking);
        break;
      case "setIncrease":
        this.subscribers.setIncrease(this.fieldToIncrease, this.returnSetterFromType(this.fieldToIncrease));
        break;
      case "switchLightMode":
        this.subscribers.switchLightMode(this.isLightMode);
        break;
      case "setNotification":
        this.subscribers.setNotification(this.getNotification());
        break;  
    }
  }

  private getTimeWithOffset(): Date {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * this.timezone.offset));
  }

  startClock(): void {
    this.notify("setSeconds");
    this.notify("setMinutes");
    this.notify("setHours");

    this.interval = setInterval(() => {
      const copyDate = new Date(this.time);
      this.time = this.getTimeWithOffset();
      this.time.setSeconds(this.time.getSeconds() + 1);
      this.notify("setSeconds");
      if(copyDate.getMinutes() !== this.time.getMinutes()) {
        this.notify("setMinutes");
      }
      if(copyDate.getHours() !== this.time.getHours()) {
        this.notify("setHours");
      }
    }, 1000);
  }

  getHours(): Hours {
    return this.time.getHours().toString().padStart(2, '0') as Hours;
  }

  setHours(hour: number): void {
    this.time.setHours(hour);
  }

  getMinutes(): MinutesAndSeconds {
    return this.time.getMinutes().toString().padStart(2, '0') as MinutesAndSeconds;
  }

  setMinutes(minute: number): void {
    this.time.setMinutes(minute);
  }

  getSeconds(): MinutesAndSeconds {
    return this.time.getSeconds().toString().padStart(2, '0') as MinutesAndSeconds;
  }

  setSeconds(second: number): void {
    this.time.setSeconds(second);
  }

  getBlinkking(): BlinkableType | null {
    return this.blinking;
  }

  getNotification(): string {
    return this.notification;
  }

  setNotification(msgNotification: string): void {
    this.notification = msgNotification;
  }

  mode(clickCount: number): void {
    if (clickCount === 1) {
      this.blinking = 'hour';
    } else if (clickCount === 2) {
      this.blinking = 'minute';
    } else if (clickCount === 3) {
      this.blinking = null;
    }
    this.notify("setEditable");
  }

  increase(type: BlinkableType | null): void {
    if (!type) {
      return;
    }
    if (type == "hour") {
      this.fieldToIncrease = "hour";
      this.setHours(this.time.getHours() + 1);
      this.setNotification("Hour is updated successfully");
    } else if (type == "minute") {
      this.fieldToIncrease = "minute";
      this.setMinutes(this.time.getMinutes() + 1);
      this.setNotification("Minute is updated successfully");
    }
    this.notify("setIncrease");
    this.notify("setNotification");
  }

  returnSetterFromType(type: string): Hours | MinutesAndSeconds {
    if (type == "hour") {
      return this.getHours();
    } else if (type == "minute") {
      return this.getMinutes();
    }
  }

  light(): void {
    this.isLightMode = !this.isLightMode;
    this.notify("switchLightMode");
  }
}
