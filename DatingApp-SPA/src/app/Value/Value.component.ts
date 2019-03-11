import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Value',
  templateUrl: './Value.component.html',
  styleUrls: ['./Value.component.css']
})
export class ValueComponent implements OnInit {
values: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getvalue();
  }

  getvalue() {
    this.http.get('http://localhost:5000/api/Values').subscribe(res => {
      this.values = res;
    }, err => {
      console.log(err);
    });
  }
}
