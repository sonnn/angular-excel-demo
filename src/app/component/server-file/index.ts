import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'server-file',
  templateUrl: './template.html',
  styleUrls: ['./style.scss']
})
export class ServerFile {
  files: Array<any> = [];

  @Output() onView: EventEmitter<any> = new EventEmitter();

  /**
   * load all file name in server
   * @memberof ServerFile
   */
  loadFiles() {
    fetch('/upload').then(res => {
      res.json().then(response => {
        this.files = response.map(fileName => ({
          name: fileName,
          data: null,
        }));
      })
    });
  }

  /**
   * pull file content from server
   * @param {any} name 
   * @memberof ServerFile
   */
  viewHandler(name) {
    fetch(`/upload?file=${name}`).then(res => {
      res.json().then(response => {
        if (response.data) this.onView.emit(response.data);
        else console.log(response);
      })
    });
  }

  /**
   * remove file on server
   * @param {any} name 
   * @memberof ServerFile
   */
  removeFileHandler(name) {
    fetch(`/delete?file=${name}`).then(res => {
      res.json().then(response => {
        if (!response.error) {
          this.files = this.files.filter(f => f.name !== name);
        } else {
          console.log(response);
        }
      });
    });
  }

  /**
   * load files from init of components
   * @memberof ServerFile
   */
  ngOnInit() {
    this.loadFiles();
  }
}
