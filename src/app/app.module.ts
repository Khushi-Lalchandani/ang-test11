import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeeService } from './exmployee.service';
import { SubordinateComponent } from './subordinate/subordinate.component';
import { OverlayComponent } from './overlay/overlay.component';
import { AddOverlayComponent } from './add-overlay/add-overlay.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SubordinateComponent,
    OverlayComponent,
    AddOverlayComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
