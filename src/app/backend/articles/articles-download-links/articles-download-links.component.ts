import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';
import { ConstantService } from 'src/app/services/constant.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-articles-download-links',
    templateUrl: './articles-download-links.component.html',
    styleUrls: ['./articles-download-links.component.css']
})
export class ArticlesDownloadLinksComponent implements OnInit {

    articleId: any;
    isArticleIdProvidedFlag!: boolean;
    articleData!: Article;

    articleExernalDownloadLinksForm!: FormGroup;
    submitted = false;
    showSubmitBtn = true;
    originalTags = [];

    externalLinks: any;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private articleService: ArticleService,
        private constantService: ConstantService,
        private ngxSpinnerService: NgxSpinnerService
    ) { }

    ngOnInit(): void {

        this.articleExernalDownloadLinksForm = this.formBuilder.group({
            externalLinks: new FormArray([
                new FormGroup({
                    link: new FormControl(''),
                    text: new FormControl('')
                })
            ])
        });

        this.externalLinks = this.articleExernalDownloadLinksForm.get('externalLinks') as FormArray;
        this.setArticleId();
    }

    // convenience getter for easy access to form fields
    get f() { return this.articleExernalDownloadLinksForm.controls; }

    addNewLink() {
        const group = new FormGroup({
            link: new FormControl('', Validators.required),
            text: new FormControl('', Validators.required),
        });
        this.externalLinks.push(group);
    }

    deleteLink(i: number) {
        this.externalLinks.removeAt(i);
    }

    setArticleId() {
        try {
            this.activatedRoute.params.subscribe((params) => {
                this.articleId = params.articleId;
                this.isArticleIdProvidedFlag = this.articleId ? true : false;

                if (this.isArticleIdProvidedFlag) {
                    this.getArticleById();
                } else { }
                // this.setFormData();
            });
        } catch (ex) {
            console.log('ex', ex);
            let obj = {
                resCode: 400,
                msg: ex.toString(),
            };
            this.constantService.handleResCode(obj);
        }
    }

    getArticleById() {

        try {

            this.ngxSpinnerService.show();
            this.articleService.getArticleById(this.articleId).subscribe(
                (result) => {
                    if (result.success) {
                        this.articleData = result.data.article;
                        // this.setFormData();
                    } else {
                        Swal.fire('User not found!', 'Status 404.', 'success');
                        this.constantService.handleResCode(result);
                    }
                },
                (error) => {

                    this.ngxSpinnerService.hide();
                    console.log('error');
                    console.log(error);

                    let obj = {
                        resCode: 400,
                        msg: error.toString(),
                    };
                    this.constantService.handleResCode(obj);
                },
                () => {
                    // inside complete
                    this.ngxSpinnerService.hide();
                }
            );
        } catch (ex) {

            this.ngxSpinnerService.hide();
            console.log('ex', ex);
            let obj = {
                resCode: 400,
                msg: ex.toString(),
            };
            this.constantService.handleResCode(obj);
        }
    }

    setFormData() {

        try {

            // this.externalLinks.patchValue({
            //     tags: tagsObj
            // });
            // this.spinner.hide();
        } catch (ex) {
            console.log('ex', ex);
            let obj = {
                resCode: 400,
                msg: ex.toString(),
            };
            this.constantService.handleResCode(obj);
        }
    }

    onSubmit() {
        this.submitted = true;
        let tagsArr = [];

        let in_data = this.articleExernalDownloadLinksForm.value;
        // stop here if form is invalid
        if (this.articleExernalDownloadLinksForm.invalid) {
            return;
        }

        this.updateArticle(in_data);
    }

    updateArticle(in_data: any) {

        this.ngxSpinnerService.show();
        this.articleService.updateArticle(in_data, this.articleId).subscribe(
            (result) => {
                console.log('result', result);

                this.ngxSpinnerService.hide();

                if (result.success) {
                    // this.toastr.success(result.message, 'Success!');
                    // this.router.navigate(['/articles']);
                } else {
                    // this.toastr.error(result.errorArr[0], 'Request Error!');
                    this.constantService.handleResCode(result);
                }
            },
            (error) => {
                
                this.ngxSpinnerService.hide();
                let obj = {
                    resCode: 400,
                    msg: error.message.toString(),
                };
                this.constantService.handleResCode(obj);
                // this.toastr.error(error.msg, 'Request Error!');
            },
            () => {
                // inside complete
                this.ngxSpinnerService.hide();
            }
        );
    }
}
