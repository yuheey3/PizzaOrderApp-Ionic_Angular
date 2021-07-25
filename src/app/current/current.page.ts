import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home/home.service';
import { CurrentService } from './current.service';
import { Pizza } from '../home/home.model';
import { AlertController } from '@ionic/angular';
import { Router}  from '@angular/router';
//import { DatePipe } from '@angular/common';
import { History } from './current.model';

@Component({
  selector: 'app-current',
  templateUrl: './current.page.html',
  styleUrls: ['./current.page.scss'],
})
export class CurrentPage implements OnInit {
  allPizzalist: Pizza[];
  totalQty: number;
  totalPrice: number;
  date: Date;
  historyId: number;
  histories : History[];
  history : History;
  


  constructor(private activatedRoute: ActivatedRoute, private router: Router,private homesService: HomeService, public alertController: AlertController, private currentService: CurrentService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
  
      this.allPizzalist = this.homesService.getAllPizzas();
      this.allPizzalist.shift();

      this.histories = this.currentService.getAllHistory();
      this.history = this.currentService.getHistory();

      this.totalQty = 0;
      this.totalPrice = 0;
      this.historyId = 0;

      for (let x = 0; x < this.allPizzalist.length; x++) {
        this.totalQty += this.allPizzalist[x].qty;
        this.totalPrice += this.allPizzalist[x].total;
      }
    })
  }

  async placeOrder() {

    //this.date=new Date();
    //let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
   let latest_date = 'ddddddd'
    this.historyId++;
    this.history.id = this.historyId.toString();
    this.history.qty = this.totalQty;
    this.history.total = this.totalPrice;
    this.history.date = latest_date;

    this.currentService.pushHistory(Object.assign({},this.history));
    this.histories = this.currentService.getAllHistory();
    this.homesService.clearPizzaOrderList();
    
    const alert = await this.alertController.create({
      header: 'Success!!',
      message: 'Thank you for your ordering!',
      buttons: ['OK']
    });
    await alert.present();
    

 

    this.router.navigate(['manager']);
  }

}

