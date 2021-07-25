import { Component, OnInit } from '@angular/core';
import { Router}  from '@angular/router';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.page.html',
  styleUrls: ['./manager.page.scss'],
})
export class ManagerPage implements OnInit {

  constructor( private router: Router, private homesService: HomeService ) { }

  ngOnInit() {
    
  }

  clickCurrent(){

    this.router.navigate(['current']);
  }
  clickHistory(){

    this.router.navigate(['history']);
  }
  clickNewOrder(){
    this.homesService.clearPizzaOrderList();
    this.homesService.clearPizzaOrder();
    this.router.navigate(['home']);
  }
  clickUpdate(){
    this.router.navigate(['home']);
  }
}
