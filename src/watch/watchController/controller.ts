import { watchModel } from "../watchModel";
import { watchView } from "../watchView";

export class watchController {

  private watchView: watchView ;
  private watchModel: watchModel;
  private clickTimeout: NodeJS.Timeout | null = null;

  constructor(model: watchModel, view: watchView) {
    this.watchModel = model;
    this.watchView = view;
    this.startClockRunning();
    this.addListenerToEvent();
  }

  startClockRunning(): void {
    setInterval(() => {
      this.watchModel.incrementTime();
      this.watchView.renderTime(this.watchModel.getCurrentTime());
    }, 1000);
  }
  
  addListenerToEvent(): void {
    this.watchView.getButtonMode().addEventListener('click', (event) => this.handleClickMode(event));
    this.watchView.getHourDisplay().addEventListener('keyup', () => this.handleHourInput())
    this.watchView.getButtonLight().addEventListener('click', () => this.handleClickLight());
  }

  handleHourInput(): void {
    const newValue = Number(this.watchView.getHourDisplay().innerText);
    if (isNaN(newValue)){
      setTimeout(() => {
        this.watchView.renderNotification("Input must be a valid number");
      }, 1000);
      return;
    }

    if(this.validateInput('hours', newValue)) {
      const formattedHour = newValue.toString().padStart(2, '0');
      this.watchModel.setHours(Number(formattedHour));
      const currentTime = this.watchModel.getCurrentTime();
      console.log('date modifie à afficher',currentTime)
      this.watchView.renderTime(currentTime);
      setTimeout(() => {
        this.watchView.renderNotification("Time is updated successfully");
      }, 1000);
    } 
  }

  validateInput(type: string, value: number): boolean {
    if (type === 'hours') {
      if (value >= 0 && value <= 23) {
        return true;
      } else {
        setTimeout(() => {
          this.watchView.renderNotification("Entrée invalide: L\'heure doit être entre 0 et 23.");
        }, 1000);
      }
    } else {
      if (value >= 0 && value <= 59) {
        return true;
      } else {
        setTimeout(() => {
          this.watchView.renderNotification("Entrée invalide: La valeur doit être entre 0 et 59.");
        }, 1000);
      }
    }
  
    return false;
  }
  

  handleClickMode(event: MouseEvent): void {
    clearTimeout(this.clickTimeout);
    this.clickTimeout = setTimeout(() => {
      this.watchModel.mode(event.detail);
      this.watchView.updateRender(this.watchModel.getBlinkking());
    }, 300);
  }

  handleClickLight(): void {
    this.watchModel.light();
    this.watchView.updateBackgroungColor(
      this.watchModel.getColorHex()
    );
  }

}
