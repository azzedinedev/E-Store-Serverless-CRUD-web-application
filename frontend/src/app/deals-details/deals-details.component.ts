import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Deal } from '../model/Deal';
import { DealService } from '../service/deal.service';

@Component({
  selector: 'app-deals-details',
  templateUrl: './deals-details.component.html',
  styleUrls: ['./deals-details.component.css']
})
export class DealsDetailsComponent implements OnInit {

  deal!: Deal;

  constructor(private activatedRoute: ActivatedRoute, private dealService: DealService,
    private router: Router) { }

  ngOnInit() {
    this.deal = new Deal();
    const id:any = this.activatedRoute.snapshot.paramMap.get('id');
    this.dealService.getDeal(id).then(
      (deal: Deal) => {
        this.deal = deal;
      }
    );
  }

  
    onBack() {
      if (this.deal.dealType === 'Regular Deal') {
        this.router.navigate(['/regular-deals']);
      } else if(this.deal.dealType === 'Special Deal') {
      this.router.navigate(['/special-deals']);
    
    }
    }
}
