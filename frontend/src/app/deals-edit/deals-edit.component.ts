import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DealService } from '../service/deal.service';
import { Binary } from '@angular/compiler';

@Component({
  selector: 'app-deals-edit',
  templateUrl: './deals-edit.component.html',
  styleUrls: ['./deals-edit.component.css']
})
export class DealsEditComponent implements OnInit {
  getId: any;
  updateForm!: FormGroup;
  error!: string;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private dealService: DealService
  ) {
    
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.dealService.getDeal(this.getId).then(res => {
      this.updateForm.setValue({
        name: res['name'],
        description: res['description'],
        dealType : res['dealType'],
        originalPrice: res['originalPrice'],
        salePrice : res['salePrice'],
        
        
      });
    });

    this.updateForm = this.formBuilder.group({
      name: [''],
      description: [''],
      dealType : [''],
      originalPrice: [''],
      salePrice : ['']
      
    });


   }

  ngOnInit() { }

  onUpdate(): any {
    console.log(this.getId)
    this.dealService.updateDeal(this.getId, this.updateForm.value)
    .then(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/deals-list'))
      }, (err) => {
        console.log(err);
    });
  
  }


}
