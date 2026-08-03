import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Product } from "../../types/product";
import { Observable } from "rxjs";
import { CreateProduct } from "../../types/createProduct";

@Injectable({
  providedIn: 'root',
})

export class ProductService {
    private http = inject(HttpClient);
    private baseUrl = environment.apiUrl;
    private productsUrl = this.baseUrl + 'products';

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productsUrl);
    }

    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.productsUrl}/${id}`);
    }

    createProduct(product: CreateProduct): Observable<Product> {
        return this.http.post<Product>(this.productsUrl, product);
    }

    // The service doesn't update the UI.  Its only job is to communicate with the API
    receiveCase(id: number): Observable<Product> {
        return this.http.post<Product>(
            `${this.productsUrl}/${id}/receive-case`,
            {}
        );
    }

    // The service doesn't update the UI.  Its only job is to communicate with the API
    subtractCase(id: number): Observable<Product> {
        return this.http.post<Product>(
            `${this.productsUrl}/${id}/subtract-case`,
            {}
        );
    }

    updateProduct(product: Product): Observable<Product> {
        return this.http.put<Product>(
            `${this.productsUrl}/${product.id}`,
            product
        );
    }
}
