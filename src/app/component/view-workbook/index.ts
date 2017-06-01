import { Component, Input, SimpleChange } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'view-workbook',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
})
export class ViewWorkbook {
  currentSheet: Object = null;
  currentSheetName: String = '';
  sheetNames: Array<String> = [];

  options: Object = {
    height: 400,
    columnSorting: true,
    contextMenu: true,
    readOnly: true
  };

  @Input() data = {};

  /**
   * change sheet on view
   * @param {any} sheetName 
   * @memberof ViewWorkbook
   */
  changeSheetHandler(sheetName) {
    this.currentSheetName = sheetName;
    this.currentSheet = this.data[sheetName];
  }

  /**
   * close view workbook
   * @memberof ViewWorkbook
   */
  closeHandler() {
    this.currentSheet = null;
    this.currentSheetName = '';
  }

  /**
   * tracking change from input and massage data
   * @param {SimpleChange} changes 
   * @memberof ViewWorkbook
   */
  ngOnChanges(changes: any) {
    const { currentValue, previousValue } = changes.data;

    if (currentValue && !_.isEmpty(currentValue)) {
      this.sheetNames = Object.keys(currentValue);
      this.changeSheetHandler(this.sheetNames[0]);
    } else {
      this.currentSheet = null;
      this.currentSheetName = '';
    }
  }
}
