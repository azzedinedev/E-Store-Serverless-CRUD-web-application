import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DealService } from '../service/deal.service';

@Component({
  selector: 'app-deals-add-special',
  templateUrl: './deals-add-special.component.html',
  styleUrls: ['./deals-add-special.component.css']
})
export class DealsAddSpecialComponent implements OnInit {

  getId: any;
  specialForm!: FormGroup;
  error!: string;
  isSpecial!: boolean ;



  constructor(
   
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private dealService: DealService


  ) { 

    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.dealService.getDeal(this.getId).then(res => {
      this.specialForm.setValue({
        salePrice : res['salePrice']
        
      });
    });

    this.specialForm = this.formBuilder.group({
      salePrice : ['']  
    });


  }

  ngOnInit(): void {
    this.isSpecial= false;
  }

  onSpecialDeal(): any {
    console.log(this.getId)
    this.dealService.createSpecialDeal(this.getId, this.specialForm.value)
    .then(() => {
        console.log('Data updated successfully!')
        this.isSpecial= true;
        this.ngZone.run(() => this.router.navigateByUrl('/deals-list'))
      }, (err) => {
        console.log(err);
    });
  
  }
}
