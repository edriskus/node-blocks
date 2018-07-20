import { Component, OnInit } from '@angular/core';

export class Plan {
  id: number;
  fa: string;
  disabled?: boolean;
  key: string;
}

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  public plans: Array<Plan> = [
    { id: 1, fa: 'fas fa-cog', key: 'basic' },
    { id: 2, fa: 'fas fa-users-cog', key: 'premium', disabled: true }
  ]

  constructor() { }

  ngOnInit() {
  }

  public planTitle(plan: Plan): string {
    return `pricing.${plan.key}.title`
  }

  public planDescription(plan: Plan): string {
    return `pricing.${plan.key}.description`
  }

}
