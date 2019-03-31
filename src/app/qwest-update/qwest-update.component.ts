import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { Qwest } from '../app.model';

@Component({
  selector: 'app-qwest-update',
  templateUrl: './qwest-update.component.html',
  styleUrls: ['./qwest-update.component.css'],
})
export class QwestUpdateComponent implements OnInit {
  id: string;
  qwest: Qwest;
  form = this.fb.group({
    name: [null, Validators.required]
  });

  constructor(
    private appService: AppService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to route parameters
    this.route.params.subscribe(params => {
      // Get id parameter
      this.id = params['id'];
      // Get qwest
      this.appService.getQwest(this.id).subscribe(
        (qwest: Qwest) => {
          // Set qwest
          this.qwest = qwest;
          // Set form data
          this.form.patchValue(this.qwest);
        }
      );
    });
  }

  onSubmit() {
    // Update qwest
    this.appService.updateQwest(this.id, this.form.value);
    // Navigate to the qwest list
    this.router.navigateByUrl('/qwest-list');
  }

  onCancel() {
    // Navigate to the qwest list
    this.router.navigateByUrl('/qwest-list');
  }
}
