import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';
import { Product } from '../../../types/product';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-item-creation',
  imports: [JsonPipe],
  templateUrl: './item-creation.html',
  styleUrl: './item-creation.css',
})
export class ItemCreation implements OnInit {
  private productService = inject(ProductService);
  protected products: Product[] = [];
  protected product: Product | null = null;

  ngOnInit(): void {
    console.log('INIT ItemCreation');
    this.getProducts();
  }

  getProducts() {
    console.log('CALLING API');

    this.productService.getProducts().subscribe({
      next: (result) => {
        console.log('SETTING PRODUCTS', result);
        this.products = result;

        setTimeout(() => {
          console.log('AFTER SETTIMEOUT', this.products);
        })
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: (result) => {
        this.product = result;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

}
