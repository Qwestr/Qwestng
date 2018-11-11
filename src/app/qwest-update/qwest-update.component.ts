import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-qwest-update',
  templateUrl: './qwest-update.component.html',
  styleUrls: ['./qwest-update.component.css'],
})
export class QwestUpdateComponent {
  form = this.fb.group({
    name: [null, Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    alert('Thanks!');
  }
}
