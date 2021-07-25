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
    this.toppingLbl = this.pizza.topping;
    this.sizeLbl = this.pizza.size;
    this.qtyNum = this.pizza.qty.toString();
  }


   clickEvent(event){
     if(event== 10){
       this.pizza.qty = 0;
       this.qtyNum = this.pizza.qty.toString();
     }
     else{
      this.pizza.qty = event;
      this.qtyNum=this.pizza.qty.toString();
     }
    
    return this.qtyNum;
  }


  clickToppingList(event){
    this.pizza.topping = event
    this.toppingLbl = this.pizza.topping;
    return this.toppingLbl;
  }

  clickSizeList(event){
    this.pizza.size = event;
    this.sizeLbl = this.pizza.size;
    return this.sizeLbl;
  }

  clickReset(){
    this.pizza.qty = 0;
    this.pizza.topping = 'None';
    this.pizza.size = 'None';
    this.qtyNum = this.pizza.qty.toString();
    this.toppingLbl = this.pizza.topping;
    this.sizeLbl = this.pizza.size;
  }

  clickManager(){

    this.homeService.clearPizzaOrder(); 
    this.qtyNum = this.pizza.qty.toString();
    this.sizeLbl = this.pizza.size;
    this.toppingLbl = this.pizza.topping;   
    this.router.navigate(['manager']);
  }

  async clickAdd(){
  if(this.pizza.qty.toString() == "None" || this.pizza.size == "None"){
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
     this.topping = this.homeService.getToppingByName(this.pizza.topping);
     this.size = this.homeService.getSizeByName(this.pizza.size);

     this.pizzaTotal = this.pizzaPrice*this.pizza.qty+this.topping.price + this.size.price;

     this.pizza.id = this.pizzaId.toString();
    //  this.pizza.qty = Number(this.qtyNum);
    //  this.pizza.size = this.sizeLbl;
    //  this.pizza.topping = this.toppingLbl;
     this.pizza.total = this.pizzaTotal;

     this.homeService.pushPizzas(Object.assign({},this.pizza));
     this.pizzas = this.homeService.getAllPizzas();
     //this.pizzas.slice();

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


    this.homeService.clearPizzaOrder(); 
    this.qtyNum = this.pizza.qty.toString();
    this.sizeLbl = this.pizza.size;
    this.toppingLbl = this.pizza.topping;   

   
  }

  }
}
