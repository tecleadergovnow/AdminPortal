import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-column-tags',
  templateUrl: './column-tags.component.html',
  styleUrls: ['./column-tags.component.scss']
})
export class ColumnTagsComponent implements OnInit, OnChanges {

  @Input() tag!: string;
  label!: string;
  showLoading: boolean = false;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.build();
  }

  ngOnInit(): void {
    this.build();
  }

  build() {
    if (this.tag) {
      switch (this.tag) {
        case "FORM_GENERATED":
          this.label = "Form Generated"
          this.showLoading = false;
          break;
        case"FORM_GENERATING_FAILED":
          this.label = "Package Failed"
          this.showLoading = false;
          break;
        case "PACKAGE_GENERATING_FAILED":
          this.label = "Form Failed"
          this.showLoading = false;
          break;
        case"PACKAGE_GENERATED":
          this.label = "Package Generated"
          this.showLoading = false;
          break;
        case"GENERATING_FORM":
          this.label = "Generating Form"
          this.showLoading = true;
          break;
        case"GENERATING_PACKAGE":
          this.label = "Generating Package"
          this.showLoading = true;
          break;
      }
    }
  }
}
