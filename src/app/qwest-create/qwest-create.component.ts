import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private appService: AppService, private fb: FormBuilder, private router: Router) {}

  onSubmit() {
    // Create the qwest
    this.appService.addQwest(this.form.value);
    // Navigate to the qwest list
    this.router.navigateByUrl('/qwest-list');
  }
}
