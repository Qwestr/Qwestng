import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-qwest-create',
  templateUrl: './qwest-create.component.html',
  styleUrls: ['./qwest-create.component.css'],
})
export class QwestCreateComponent {
  form = this.fb.group({
    name: [null, Validators.required]
  });

  constructor(private appService: AppService, private fb: FormBuilder) {}

  onSubmit() {
    // Create the Qwest
    this.appService.addQwest(this.form.value);
  }
}
