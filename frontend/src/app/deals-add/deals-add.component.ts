import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DealService } from '../service/deal.service';

@Component({
  selector: 'app-deals-add',
  templateUrl: './deals-add.component.html',
  styleUrls: ['./deals-add.component.css']
})
export class DealsAddComponent implements OnInit {

  dealForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private dealService: DealService
  ) { 
    this.dealForm = this.formBuilder.group({
      name: [''],
      description: [''],
      originalPrice: ['']
    })

  }

  ngOnInit(): void {
  }

  onSubmit(): any {
    this.dealService.createDeal(this.dealForm.value)
    .then(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/deals-list'))
      }, (err) => {
        console.log(err);
    });
  }

}
