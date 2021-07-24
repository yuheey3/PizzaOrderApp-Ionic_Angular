import { Component, OnInit } from '@angular/core';
import { Topping,Size,Pizza } from './home.model';
import { HomeService } from './home.service';
import { AlertController } from '@ionic/angular';
import { Router}  from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


export class HomePage implements OnInit {
  pizzaId: number;
  pizzaPrice: number;
  pizzaTotal: number;
  qtyNum:string;
  totalQty: number;
  totalPrice: number;
  pizzas : Pizza[];
  pizza : Pizza;
  topping: Topping;
  toppings : Topping[];
  sizes: Size[];
  size: Size;
  toppingLbl:string;
  sizeLbl:string;

  constructor(private homeService: HomeService, public alertController: AlertController, private router: Router ) { }

  ngOnInit() {
    this.pizzaPrice = 3.5;
    this.pizzaId = 0;
    this.totalQty = 0;
    this.totalPrice = 0;
    this.toppings = this.homeService.getAllToppings();
    this.sizes = this.homeService.getAllSizes();
    this.pizzas = this.homeService.getAllPizzas();
    this.pizza = this.homeService.getPizza();
  }


   clickEvent(event){
     if(event== 10){
       this.qtyNum = "None";
     }
     else{
      this.qtyNum=event;
     }
    
    return this.qtyNum;
  }

  clickToppingList(event){
    this.toppingLbl = event;
    return this.toppingLbl;
  }

  clickSizeList(event){
    this.sizeLbl = event;
    return this.sizeLbl;
  }

  clickReset(){
    this.qtyNum = "None"
    this.toppingLbl = "None"
    this.sizeLbl = "None"
  }

  clickManager(){

    this.router.navigate(['manager']);
  }

  async clickAdd(){
  if(this.qtyNum == "None" || this.sizeLbl == "None"){
      const alert = await this.alertController.create({
        header: 'Missing Info',
        message: 'You have to add all information!',
        buttons:['OK',{
          text: 'Back',
          handler: ()=>{

          }
        }]
      });
      await alert.present();
  }
  else{
   

     this.totalPrice = 0;
     this.totalQty = 0;
     this.pizzaId++;
     this.topping = this.homeService.getToppingByName(this.toppingLbl);
     this.size = this.homeService.getSizeByName(this.sizeLbl);

     this.pizzaTotal = this.pizzaPrice*Number(this.qtyNum)+this.topping.price + this.size.price;

     this.pizza.id = this.pizzaId.toString();
     this.pizza.qty = Number(this.qtyNum);
     this.pizza.size = this.sizeLbl;
     this.pizza.topping = this.toppingLbl;
     this.pizza.total = this.pizzaTotal;

     this.pizzas.push(Object.assign({},this.pizza));


    for (let x = 1; x < this.pizzas.length; x++) {
      this.totalQty += this.pizzas[x].qty; 
      this.totalPrice += this.pizzas[x].total;
  }

     const alert2 = await this.alertController.create({
      header: 'Success!!',
     message: 'Your order has now ' +  this.totalQty + ' pizzas ,and the total is $ '+ this.totalPrice,
     buttons:['OK',{
        text: 'Back',
        handler: ()=>{

        }
      }]
    });
    await alert2.present()
     
  }

  }
}
