import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ConstantService } from './constant.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    public apiEndPoint!: string;
	public data!: any;
	public categoryImageLink;

	constructor(
		private httpClient: HttpClient,
		private constantService: ConstantService
	) {
		// this.apiEndPoint = this.constantService.apiBaseUrl;
		this.categoryImageLink = this.constantService.categoryImageLink;
	}

    async setCatgApiEndPoint( deptId: any ) {
        
		console.log('inside setCatgApiEndPoint');
        this.apiEndPoint = this.constantService.apiBaseUrl;
        this.apiEndPoint +=  `/departments/${deptId}/categories`;
		console.log('this.apiEndPoint', this.apiEndPoint);
        return true;
    }

	getCategoryById(catgId: any): Observable<any> {
		let url = `${this.apiEndPoint}/${catgId}`;
		return this.httpClient
			.get(url, this.constantService.getHttpJsonOptions())
			.pipe(
				map((e: any) => e),
				catchError((e: Response) => throwError(e))
			);
	}

	getAllCategories(search: undefined): Observable<any> {
        console.log('inside categories');
        let url = `${this.apiEndPoint}`;
        search != undefined ? (url = `${url}?searchTxt=${search}`) : '';
        console.log('url', url);
        return this.httpClient
            .get(url, this.constantService.getHttpJsonOptions())
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
	}

	insertCategory(in_data: any): Observable<any> {
        return this.httpClient
            .post(
                `${this.apiEndPoint}`,
                in_data,
                this.constantService.getHttpJsonOptions()
            )
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
	}

	updateCategory(in_data: any, deptId: any): Observable<any> {
        return this.httpClient
            .patch(
                `${this.apiEndPoint}/${deptId}`,
                in_data,
                this.constantService.getHttpJsonOptions()
            )
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
	}

	modifyCategoryProfilePic(deptId: any, imageLink: string | Blob): Observable<any> {
        let formData: FormData = new FormData();
        formData.append('image', imageLink);

        return this.httpClient
            .post(
                `${this.apiEndPoint}/${deptId}/image`,
                formData,
                this.constantService.getHttpFormDataOptions()
            )
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
	}

	deleteCategoryByCategoryId(deptId: any): Observable<any> {
        let url = `${this.apiEndPoint}/${deptId}`;
        return this.httpClient
            .delete(url, this.constantService.getHttpJsonOptions())
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
	}

	blockUnblockCategory(deptId: any, in_data: any): Observable<any> {
        return this.httpClient
            .patch(
                `${this.apiEndPoint}/${deptId}`,
                in_data,
                this.constantService.getHttpJsonOptions()
            )
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
	}

	deleteImageByCategoryId( in_imageUrl: any, deptId: any ): Observable<any> {
        let url = `${this.apiEndPoint}/${deptId}/delete-image/${in_imageUrl}`;
        return this.httpClient
            .delete(url)
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
	}

	isCategorySlugExists( in_slug: any ) {
        let url = `${this.apiEndPoint}/slugExists?category_slug=${in_slug}`;
        return this.httpClient
            .get(url)
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
	}
}
