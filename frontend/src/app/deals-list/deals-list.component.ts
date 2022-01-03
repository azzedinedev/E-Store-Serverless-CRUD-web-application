import { Component, OnInit } from '@angular/core';
import { DealsAddSpecialComponent } from '../deals-add-special/deals-add-special.component';
import { DealService } from '../service/deal.service';

@Component({
  selector: 'app-deals-list',
  templateUrl: './deals-list.component.html',
  styleUrls: ['./deals-list.component.css']
})
export class DealsListComponent implements OnInit {

  Deals:any = [];
  constructor(private dealService:DealService ) { }

  ngOnInit(): void {
    this.dealService.getUserDeals().then(res => {
      console.log(res)
      this.Deals =res;
      
    }); 
  
  }

  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.dealService.deleteDeal(id).then((res) => {
        this.Deals.splice(i, 1);
      })
    }
  }

 
  




}
