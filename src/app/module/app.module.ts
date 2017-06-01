import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HotTableModule } from 'ng2-handsontable';

import { AppComponent }  from '../component/app-component';
import { UploadControl }  from '../component/upload-control';
import { ViewWorkbook }  from '../component/view-workbook';
import { LocalFile }  from '../component/local-file';
import { ServerFile }  from '../component/server-file';

@NgModule({
  imports:      [ BrowserModule, HotTableModule ],
  declarations: [ AppComponent, UploadControl, ViewWorkbook, LocalFile, ServerFile ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }