import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit, OnDestroy {

  username: string = "";
  usernameSub!: Subscription;
  productList: Product[] = [
    {
      id: 1,
      name: 'Kurta',
      image: 'https://4.imimg.com/data4/PB/FH/MY-25278150/mens-fancy-kurta-500x500.jpg'
    },
    {
      id: 2,
      name: 'Lehenga',
      image: 'https://assets.ajio.com/medias/sys_master/root/20210403/0ngt/6068c875aeb269a9e338b9c7/-473Wx593H-461385092-green-MODEL.jpg'
    },
    {
      id: 3,
      name: 'Sherwani',
      image: 'https://4.imimg.com/data4/AV/SY/MY-10112154/designer-wedding-sherwani-500x500.jpg'
    },
    {
      id: 4,
      name: 'Shirt',
      image: 'https://5.imimg.com/data5/YJ/BO/MY-10973479/mens-designer-casual-shirt-500x500.jpg'
    }
  ];
  cartList: Product[] = [];
  displayProducts: Product[][] = [];
  displayCartProducts: Product[][] = [];

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.usernameSub = this.dataService.getUsername.subscribe(name => {
      this.username = name;
    });
    this.updateDisplayLists();
    if(this.username == "") {
      this.router.navigate(['/']);
    }
  }

  onAddToCart(product: Product) {
    this.cartList.push(product);
    this.productList = this.productList.filter(elem => elem.id !== product.id);
    this.updateDisplayLists();
  }

  updateDisplayLists() {
    this.displayProducts = [];
    this.displayCartProducts = [];
    for(let i = 0; i <= this.productList.length; i+=3) {
      this.displayProducts.push(this.productList.slice(i, i+3));
    }
    for(let i = 0; i <= this.cartList.length; i+=3) {
      this.displayCartProducts.push(this.cartList.slice(i, i+3));
    }
  }

  ngOnDestroy() {
    this.usernameSub.unsubscribe();
  }

}
