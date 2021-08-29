import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ConstantService } from './constant.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

    public apiEndPoint: string;
	public data: any;
	public departmentImageLink;

	constructor(
		private httpClient: HttpClient,
		private constantService: ConstantService
	) {
		this.apiEndPoint = this.constantService.apiBaseUrl + '/departments';
		this.departmentImageLink = this.constantService.departmentImageLink;
	}

	getDepartmentById(deptId: any): Observable<any> {
		let url = `${this.apiEndPoint}/${deptId}`;
		return this.httpClient
			.get(url, this.constantService.getHttpJsonOptions())
			.pipe(
				map((e: any) => e),
				catchError((e: Response) => throwError(e))
			);
	}

	getAllDepartments(search: undefined): Observable<any> {
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

	insertDepartment(in_data: any): Observable<any> {
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

	updateDepartment(in_data: any, deptId: any): Observable<any> {
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

	modifyDepartmentProfilePic(deptId: any, imageLink: string | Blob): Observable<any> {
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

	deleteDepartmentByDepartmentId(deptId: any): Observable<any> {
        let url = `${this.apiEndPoint}/${deptId}`;
        return this.httpClient
            .delete(url, this.constantService.getHttpJsonOptions())
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
	}

	blockUnblockDepartment(deptId: any, in_data: any): Observable<any> {
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

	deleteImageByDepartmentId( in_imageUrl: any, deptId: any ): Observable<any> {
        let url = `${this.apiEndPoint}/${deptId}/delete-image/${in_imageUrl}`;
        return this.httpClient
            .delete(url)
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
	}

	isDepartmentSlugExists( in_slug: any ) {
        let url = `${this.apiEndPoint}/slug-exists/${in_slug}`;
        return this.httpClient
            .get(url)
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
	}
}
