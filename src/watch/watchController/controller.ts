import { watchModel } from "../watchModel";
import { watchView } from "../watchView";

export class watchController {

  private watchView: watchView ;
  private watchModel: watchModel;
  private clickTimeout: NodeJS.Timeout | null = null;

  constructor(id: number) {
    this.watchModel = new watchModel();
    this.watchView = new watchView(id);
    this.init();
  }

  init(): void {
    // bind the model to the view
    this.addSubscribers();
    this.addListenerToEvent();
    // start the clock
    this.watchModel.startClock();
  }

  addSubscribers(): void {
    this.watchModel.subscribe("setSeconds", this.watchView.setSeconds.bind(this.watchView));
    this.watchModel.subscribe("setMinutes", this.watchView.setMinutes.bind(this.watchView));
    this.watchModel.subscribe("setHours", this.watchView.setHours.bind(this.watchView));
    this.watchModel.subscribe("switchLightMode", this.watchView.updateBackgroungColor.bind(this.watchView));
    this.watchModel.subscribe("setEditable", this.watchView.setBlinking.bind(this.watchView));
    this.watchModel.subscribe("setIncrease", this.watchView.setIncreaseData.bind(this.watchView));
    this.watchModel.subscribe("setNotification", this.watchView.setNotification.bind(this.watchView));
  }
  
  addListenerToEvent(): void {
    this.watchView.getButtonMode().addEventListener('click', (event) => this.handleClickMode(event));
    this.watchView.getButtonIncrease().addEventListener('click', () => this.handleClickIncrease());
    this.watchView.getButtonLight().addEventListener('click', () => this.handleClickLight());
  }



  handleClickMode(event: MouseEvent): void {
    clearTimeout(this.clickTimeout);
    this.clickTimeout = setTimeout(() => {
      this.watchModel.mode(event.detail);
    }, 300);
  }

  handleClickIncrease(): void {
   this.watchModel.increase(this.watchModel.getBlinkking());
  }

  handleClickLight(): void {
    this.watchModel.light();
  }
}
