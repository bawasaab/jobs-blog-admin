import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ConstantService } from './constant.service';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    public apiEndPoint: string;
    public data: any;
    public userImageLink;

    constructor(
        private httpClient: HttpClient,
        private constantService: ConstantService
    ) {
        this.apiEndPoint = this.constantService.apiBaseUrl + '/articles';
        this.userImageLink = this.constantService.userImageLink;
    }

    insertArticle(in_data: any): Observable<any> {

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

    updateArticle(in_data: any): Observable<any> {

        return this.httpClient
            .patch(
                `${this.apiEndPoint}`,
                in_data,
                this.constantService.getHttpJsonOptions()
            )
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
    }

    getAllArticles(search: any) {

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

    deleteArticleByArticleId(articleId: any): Observable<any> {

        let url = `${this.apiEndPoint}/${articleId}`;
        return this.httpClient
            .delete(url, this.constantService.getHttpJsonOptions())
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
    }

    blockUnblockArticle(articleId: any, in_data: any): Observable<any> {

        let url = `${this.apiEndPoint}/setStatus/${articleId}`;
        return this.httpClient
            .patch(url, in_data, this.constantService.getHttpJsonOptions())
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
    }

    isArticleSlugExists(slug: any, articleId: any) {

        let url;
        if( articleId ) {
            url = `${this.apiEndPoint}/slug/${slug}/exists/${articleId}`;
        } else {
            url = `${this.apiEndPoint}/slug/${slug}/exists`;
        }
        return this.httpClient
            .get(url, this.constantService.getHttpJsonOptions())
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
    }

    getArticleById(articleId: any): Observable<any> {

        let url = `${this.apiEndPoint}/${articleId}`;
        return this.httpClient
            .get(url, this.constantService.getHttpJsonOptions())
            .pipe(
                map((e: any) => e),
                catchError((e: Response) => throwError(e))
            );
    }
}
