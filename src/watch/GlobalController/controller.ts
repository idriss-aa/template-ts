import { GlobalView } from "../GlobalView";
import { GlobalModel } from "../GlobalModel";
import { TIMEZONES } from "../GlobalView/type";

export class GlobalController {

  private globalView: GlobalView;
  private globalModel: GlobalModel;

  constructor() {
    this.globalView = new GlobalView();
    this.globalModel =  new GlobalModel();
    this.init();
  }

  init(): void {
    this.addSubscribers();
    this.addListenerToEvent();
  }

  addSubscribers(): void {
    this.globalModel.subscribe("setNewClock", this.globalView.setNewClock.bind(this.globalView));
  }

  addListenerToEvent(): void {
    this.globalView.getTimeZoneSelect().addEventListener('change', (event) => this.timeZoneSelect(event));
    this.globalView.getAddWatchButton().addEventListener('click', () => this.addWatchButton());
  }

  timeZoneSelect(event: Event): void {
      const target = event.target as HTMLSelectElement;
      const selectedId = target.value;
      this.globalView.setSelectedTimezone(TIMEZONES.find(tz => tz.id === selectedId) || TIMEZONES[0]);
      this.globalModel.setTimeZone(this.globalView.getSelectedTimezone());
  }

  addWatchButton(): void {
    this.globalModel.addClock();
  }
}
