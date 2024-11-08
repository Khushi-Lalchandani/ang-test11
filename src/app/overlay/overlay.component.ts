import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../exmployee.model';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {
  @Input() data!: Employee;
  @Output() show = new EventEmitter<boolean>();
  ngOnInit(): void {
    if (this.data) console.log(this.data);
  }
  onEmit() {
    this.show.emit(false);
  }
}
