import { Component, Output, EventEmitter } from '@angular/core';
import { getAllFiles, getFile, removeFile } from '../../service';

@Component({
  selector: 'local-file',
  templateUrl: './template.html',
  styleUrls: ['./style.scss']
})
export class LocalFile {
  files: Array<Object> = [];

  @Output() onView: EventEmitter<any> = new EventEmitter();

  /**
   * load all file from local storage
   * @memberof LocalFile
   */
  loadFiles() {
    this.files = getAllFiles();
  }

  /**
   * load files from init of components
   * @memberof LocalFile
   */
  ngOnInit() {
    this.loadFiles();
  }

  /**
   * emit workbook to app and open view
   * @param {any} fileName 
   * @memberof LocalFile
   */
  viewHandler(fileName) {
    const workbook = getFile(fileName);
    this.onView.emit(workbook);
  }

  /**
   * remove file from local
   * @param {any} fileName 
   * @memberof LocalFile
   */
  removeFileHandler(fileName) {
    removeFile(fileName);
    this.loadFiles();
  }
}
