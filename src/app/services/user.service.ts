import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ConstantService } from './constant.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public apiEndPoint: string;
    public apiEndPointAuth: string;
    public data: any;
    public userImageLink;

    constructor(
        private httpClient: HttpClient,
        private constantService: ConstantService
    ) {
        this.apiEndPoint = this.constantService.apiBaseUrl + '/users';
        this.apiEndPointAuth = this.constantService.apiBaseUrl + '/auth';
        this.userImageLink = this.constantService.userImageLink;
    }

    getUserById(userId: any): Observable<any> {

        let url = `${this.apiEndPoint}/${userId}`;
        return this.httpClient
            .get(url, this.constantService.getHttpJsonOptions())
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
    }

    getAllUsers(search: undefined): Observable<any> {

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

    insertUser(in_data: any): Observable<any> {

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

    updateUser(in_data: any, userId: any): Observable<any> {

        return this.httpClient
            .patch(
                `${this.apiEndPoint}/${userId}`,
                in_data,
                this.constantService.getHttpJsonOptions()
            )
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
    }

    modifyUserProfilePic(userId: any, imageLink: string | Blob): Observable<any> {

        let formData: FormData = new FormData();
        formData.append('profile_pic', imageLink);

        return this.httpClient
            .post(
                `${this.apiEndPoint}/changePic/${userId}`,
                formData,
                this.constantService.getHttpFormDataOptions()
            )
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
    }

    deleteUserByUserId(userId: any): Observable<any> {

        let url = `${this.apiEndPoint}/${userId}`;
        return this.httpClient
            .delete(url, this.constantService.getHttpJsonOptions())
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
    }

    blockUnblockUser(userId: any, in_data: any): Observable<any> {

        let url = `${this.apiEndPoint}/setStatus/${userId}`;
        return this.httpClient
            .patch(url, in_data, this.constantService.getHttpJsonOptions())
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
    }

    deleteImageByUserId(in_imageUrl: any, userId: any): Observable<any> {

        let url = `${this.apiEndPoint}/${userId}/deletePic/${in_imageUrl}`;
        return this.httpClient
            .delete(url)
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
    }

    login(in_data: any): Observable<any> {

        return this.httpClient.post(
            `${this.apiEndPointAuth}/signIn`,
            in_data
        )
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
    }

    forgotPassword(in_data: any): Observable<any> {

        let formData: FormData = new FormData();
        formData.append('universityEmail', in_data.universityEmail);

        return this.httpClient.post(
            `${this.apiEndPointAuth}/forgot/password`,
            formData
        )
        .pipe(
            map((e: any) => e),
            catchError((e: Response) => throwError(e))
        );
    }

    signup(in_data: any): Observable<any> {

        let formData: FormData = new FormData();
        formData.append('email', in_data.email);
        formData.append('password', in_data.password);
        // formData.append('contact', in_data.contact);
        formData.append('first_name', in_data.first_name);
        formData.append('last_name', in_data.last_name);

        return this.httpClient.post(
            `${this.apiEndPointAuth}/signup`,
            formData
        )
        .pipe(
            map((e: any) => e),
            catchError((e: Response) => throwError(e))
        );
    }
}