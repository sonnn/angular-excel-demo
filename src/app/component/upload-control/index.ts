import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import XLSX from 'xlsx';
import _ from 'lodash';
import { saveFile, toJSON } from '../../service';

@Component({
  selector: 'upload-control',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
})
export class UploadControl {
  id: String = 'sampleFile';
  label: String = 'Choose a file';
  rABS: Boolean = true; // depend on what file input type
  workbook: Object = {};

  @Input() isViewOnFly: Boolean = true;
  @Output() onView: EventEmitter<any> = new EventEmitter();
  @Output() onSaveLocal: EventEmitter<any> = new EventEmitter();
  @Output() onUpload: EventEmitter<any> = new EventEmitter();

  constructor(private element: ElementRef){
    this.element = element;
  }

  /**
   * setter label
   * @param {string} [newLabel='Choose a file'] 
   * @memberof UploadControl
   */
  updateLabel(newLabel = 'Choose a file') {
    this.label = newLabel;
  }
  
  /**
   * Utils func from lib xlsx
   * @param {any} data 
   * @returns String
   * @memberof UploadControl
   */
  fixdata(data) {
    let o = '', l = 0, w = 10240;
    for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
    o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
    return o;
  }

  /**
   * callback when change event are make on input[file]
   * @param {Event} event 
   * @memberof UploadControl
   */
  onChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (evt:any) => {
      const data = evt.target.result;

      if (this.rABS) {
        this.workbook = XLSX.read(data, { type: 'binary' });
      } else {
        const arr = this.fixdata(data);
        this.workbook = XLSX.read(btoa(arr), { type: 'base64' });
      }

      this.updateLabel(file.name);
    };
    // read file
    reader.readAsBinaryString(file);
  }

  /**
   * open view workbook on fly
   * @memberof UploadControl
   */
  viewHandler() {
    if (this.isViewOnFly) this.onView.emit(toJSON(this.workbook));
  }

  /**
   * save file to local
   * @memberof UploadControl
   */
  saveLocalHandler() {
    if (this.workbook && !_.isEmpty(this.workbook)) {
      const workbookJSON = toJSON(this.workbook);
      saveFile(this.label, workbookJSON);
      this.onSaveLocal.emit(this.label);
    }
  }

  /**
   * upload file by fetch
   * @memberof UploadControl
   */
  uploadHandler() {
    const fileInput = this.element.nativeElement.querySelector('input[type="file"]');
    
    if (fileInput.files.length > 0) {
      const data = new FormData()
      data.append('sampleFile', fileInput.files[0])
      fetch('/upload', { method: 'POST', body: data }).then(response => {
        response.json().then(res => {
          if (res.error) console.log(res);
          else this.onUpload.emit();
        })
      });
    }
  }
}
