import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

  public features: Array<string> = [
    'modern',
    'free',
    'friendly'
  ]

  constructor() { }

  ngOnInit() {
  }

  public featureTitle(feature: string): string {
    return `features.${feature}.title`
  }

  public featureDescription(feature: string): string {
    return `features.${feature}.description`
  }

}
