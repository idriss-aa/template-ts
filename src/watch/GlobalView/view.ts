import { TimeZone, TIMEZONES } from "./type";

export class GlobalView {
  private rootElement: HTMLElement;
  private addWatchButton: HTMLButtonElement;

  private selectedTimezone: TimeZone = TIMEZONES[0];
  private timezoneSelect: HTMLSelectElement;

  private notification: HTMLElement;

  constructor() {
    this.renderDom();
    this.timezoneSelect = document.getElementById('timezone-select') as HTMLSelectElement;
    this.notification = document.getElementById('notification') as HTMLButtonElement;
    this.addWatchButton = document.getElementById('add-watch-button') as HTMLButtonElement;
  }

  renderDom(): void {    
    this.rootElement = document.querySelector('body') as HTMLElement;
    this.rootElement.insertAdjacentHTML('beforeend', `
      <main>
        <div>
          <button id="add-watch-button" class="add-watch-button">Add Watch</button>
        </div>
      </main>
      <div id="timezone" class="timezone">
          <select id="timezone-select">
            ${TIMEZONES.map(tz => 
              `<option value="${tz.id}" data-offset="${tz.offset}">${tz.name}</option>`
            ).join('')}
          </select> 
          <span id="notification"></span>
      </div>
      </div>  
    `);
  }

  getAddWatchButton(): HTMLButtonElement {
    return this.addWatchButton;
  }

  getSelectedTimezone(): TimeZone {
    return this.selectedTimezone;
  }

  setSelectedTimezone(timeZone: TimeZone): void {
    this.selectedTimezone = timeZone;
  }

  getTimeZoneSelect(): HTMLSelectElement {
    return this.timezoneSelect;
  }

  setNewClock(watchesNumber: number): void {
    this.notification.innerText = `clock number ${watchesNumber} has been added successfully`;
    setTimeout(() => {
      this.notification.innerText = "";
    }, 3000);
  }
}