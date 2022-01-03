import { Component, OnInit } from '@angular/core';
import { DealService } from '../service/deal.service';

@Component({
  selector: 'app-regular-deals',
  templateUrl: './regular-deals.component.html',
  styleUrls: ['./regular-deals.component.css']
})
export class RegularDealsComponent implements OnInit {

  Deals:any = [];


  constructor(private dealService:DealService) { }

  ngOnInit(): void {
  
    this.dealService.getRegularDeals().then(res => {
      console.log(res)
      this.Deals =res;
    }); 
  
  }

}
