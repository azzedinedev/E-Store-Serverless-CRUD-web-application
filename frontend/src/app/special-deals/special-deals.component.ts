import { Component, OnInit } from '@angular/core';
import { DealService } from '../service/deal.service';

@Component({
  selector: 'app-special-deals',
  templateUrl: './special-deals.component.html',
  styleUrls: ['./special-deals.component.css']
})
export class SpecialDealsComponent implements OnInit {

  Deals:any = [];

  constructor(private dealService:DealService) { }

  ngOnInit(): void {
    this.dealService.getSpecialDeals().then(res => {
      console.log(res)
      this.Deals =res;
    }); 
  }
  
}
