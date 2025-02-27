import { TimeZone, TIMEZONES } from "../GlobalView/type";
import { watchController } from "../watchController";
import { watchersSubscriber } from "./type";

export class GlobalModel {
  private watchers: Map<number, watchController>;
  private subscribers: watchersSubscriber;

  private selectedTimezone: TimeZone = TIMEZONES[0];

  constructor() {
    this.watchers = new Map();
    this.subscribers = {
      setNewClock: undefined
    }

    //add first clock
    this.addClock();
  }

  subscribe<T extends keyof watchersSubscriber>(action: T, listener: watchersSubscriber[T]): void {
    this.subscribers[action] = listener;
  }

  notify(action: keyof watchersSubscriber): void{
    switch (action) {
      case "setNewClock":
        if (this.subscribers.setNewClock) {
          this.subscribers.setNewClock(this.getClockSize());
        }
        break;
    }
  }

  getClockSize(): number {
    return this.watchers.size;
  }

  getWatchersCreated(): Map<number, watchController> {
    return this.watchers;
  }

  addClock(): void {
    const id = this.watchers.size + 1;
    const controller = new watchController(id, this.selectedTimezone);
    this.watchers.set(id, controller);
    this.notify('setNewClock');
  }

  setTimeZone(timeZone: TimeZone) {
   this.selectedTimezone = timeZone;
  }
}
