import { Component, inject, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../core/services/product-service';
import { CreateProduct } from '../../types/createProduct';
import { Product } from '../../types/product';
import { TextInput } from '../../shared/text-input/text-input';

@Component({
  selector: 'app-products',
  imports: [ReactiveFormsModule, TextInput],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private productService = inject(ProductService);
  private fb = inject(NonNullableFormBuilder);
  protected createProductForm = this.fb.group({
      displayName: ['', [Validators.required]],
      shelfCapacity: [0, [Validators.required, Validators.min(1)]],
      shelfDaysAllowed: [0, [Validators.required, Validators.min(1)]],
      unitsPerCase: [0, [Validators.required, Validators.min(1)]]
    });
  protected validationErrors = signal<string[]>([]);
  protected products = signal<Product[]>([]);

  ngOnInit(): void {
    this.loadProducts();
  }

  createProduct() {
    if (this.createProductForm.valid) {

      // This 'newProduct' is the object I'm sending TO the API.  It doesn't
      // include an id because the user doesn't give a 'newProduct' and id.

      // A user fills out the form.  The component uses the form to create a CreateProduct
      // that only contains a newProduct a displayName, a shelfCapacity,
      // and a shelfDaysAllowed like this:

      // newProduct = {
      //     displayName: "Organic Sourdough",
      //     shelfCapacity: 16,
      //     shelfDaysAllowed: 10
      // }

      // In this next line, the form becomes a domain object.
      const newProduct: CreateProduct = this.createProductForm.getRawValue();

      // This next line almost reads like English.  It basically says: "Create a product
      // using a new product."
      this.productService.createProduct(newProduct).subscribe({

        // At this point, the newProduct is effectively a DTO that is sent as the body
        // of the HTTP request.  It's given to the .NET API DTO (named CreateProductDto
        // or something similar), which is then saved to the database and given an id.

        // This 'createdProduct' is the object coming back FROM the API.  The 'next'
        // callback receives a createdProduct, which includes an id; like this:

        // createdProduct = {
        //     id: 7,
        //     displayName: "Organic Sourdough",
        //     shelfCapacity: 16,
        //     shelfDaysAllowed: 10
        // }

        // This is consistent with the fact that the service returns an Observable
        // of type Product.  Once the HTTP Request finishes, RxJS says: "I have
        // a Product for you.".
        // The callback receives the Product.  If I wanted to use the response, I'd
        // give it a descriptive name like 'createdProduct'.  The 'createdProduct' variable
        // didn't exist until the API responded.
        // 
        // I could then use the descriptive 'createdProduct' name like this:

        //   'next: createdProduct => {
        //      this.products.update(products => [...products, createdProduct]); }

        // which uses the spread operator and appends the new createdProduct to the products.

        // Appending the createdProduct avoids making another HTTP request, which can be more efficient,
        // but reloading the list keeps the client synchronized with the server and is simpler while building the app.
        
        // So, in this example, instead of creating a descriptive name, I won't give the response a variable name
        // because I'm not going to use the returned Product in this example.

        // Instead, I simply wait for the POST request to succeed, then call loadProducts().
        // The loadProducts() performs a new GET request and replaces the products signal with
        // the latest list from the database.

        next: () => {

          this.loadProducts();

          this.createProductForm.reset({
            displayName: '',
            shelfCapacity: 0,
            shelfDaysAllowed: 0,
            unitsPerCase: 0
          });
        },
        error: error => {
          console.log(error);
          this.validationErrors.set(error);
        }
      })
    }
  }

  private loadProducts() {
    this.productService.getProducts().subscribe({
      next: allProducts => {
        this.products.set(allProducts);
      }
    })
  }

}
