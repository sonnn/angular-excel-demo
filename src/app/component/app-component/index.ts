import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './template.html',
})
export class AppComponent {
  workbook: Object = {};
  
  /**
   * open view workbook
   * @param {any} workbook 
   * @memberof AppComponent
   */
  viewHandler(workbook) {
    this.workbook = null;
    // small work around to avoid update Handsontable to fast
    // can do other way safer by close the workbook before view it
    setTimeout(() => this.workbook = workbook, 100);
  }
}
