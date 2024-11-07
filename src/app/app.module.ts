import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeeService } from './exmployee.service';
import { SubordinateComponent } from './subordinate/subordinate.component';

@NgModule({
  declarations: [AppComponent, SubordinateComponent],
  imports: [BrowserModule],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
