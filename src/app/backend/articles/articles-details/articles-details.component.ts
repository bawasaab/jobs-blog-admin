import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ArticleService } from "../../../services/article.service";
import Swal from 'sweetalert2';
import { ConstantService } from '../../../services/constant.service';

import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from '@angular/router';

import { Article } from "../../../interfaces/article";

@Component({
    selector: 'app-articles-details',
    templateUrl: './articles-details.component.html',
    styleUrls: ['./articles-details.component.css']
})
export class ArticlesDetailsComponent implements OnInit {

    articleId: any;
    isArticleIdProvidedFlag!: boolean;
    articleData!: Article;

    articleDetailsForm!: FormGroup;
    submitted = false;
    slug: any;
    showSubmitBtn = true;
    // isArticleIdProvidedFlag!: boolean;
    // articleData: any;

    constructor(
		private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private articleService: ArticleService,
		private constantService: ConstantService,
		private ngxSpinnerService: NgxSpinnerService
    ) { }

    ngOnInit(): void {

        this.articleDetailsForm = this.formBuilder.group({
            title: ['', [Validators.required]],
            slug: ['', [Validators.required]],
            short_description: ['', [Validators.required]],
            status: ['', [Validators.required]],
        });
        this.setArticleId();
    }

    // convenience getter for easy access to form fields
	get f() { return this.articleDetailsForm.controls; }

    setArticleId() {
		try {
			this.activatedRoute.params.subscribe((params) => {
				this.articleId = params.articleId;
				this.isArticleIdProvidedFlag = this.articleId ? true : false;

				if (this.isArticleIdProvidedFlag) {
					this.getArticleById();
				} else {}
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
						this.setFormData();
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

			this.articleDetailsForm.patchValue({
                title: this.articleData?.title,
                slug: this.articleData?.slug,
                short_description: this.articleData?.short_description,
                status: this.articleData?.status
			});
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

    generateSlug($e: any) {

        this.slug = $e.target.value.trim();
        if( this.slug != '' ) {

            this.slug = this.slug.split(" ").join("-");
            this.articleDetailsForm.patchValue({
                slug: this.slug
            });
        }
    }

    isSlugExists($e: any) {

        this.slug = $e.target.value.trim();
        this.articleService.isArticleSlugExists( this.slug, this.articleId ).subscribe(
            (result) => {
                console.log('result', result);

                this.ngxSpinnerService.hide();

                if (result.success) {
                    if( result.data.exists ) {
                        let obj = {
                            resCode: 400,
                            msg: 'Slug already exists use another',
                        };
                        this.constantService.handleResCode(obj);
                        this.showSubmitBtn = false;
                    } else {
                        this.showSubmitBtn = true;
                    }
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

    onSubmit() {
		this.submitted = true;

		let in_data = this.articleDetailsForm.value;
		console.log('in_data', in_data);
  
		// stop here if form is invalid
		if (this.articleDetailsForm.invalid) {
		  return;
		}

        if( this.articleId ) {

            this.updateArticle(in_data);
        } else {
            this.insertArticle(in_data);
        }
	}

    insertArticle(in_data: any) {

        this.ngxSpinnerService.show();
        this.articleService.insertArticle(in_data).subscribe(
            (result) => {
                console.log('result', result);

                this.ngxSpinnerService.hide();

                if (result.success) {
                    // this.toastr.success(result.message, 'Success!');
                    this.router.navigate(['/articles']);
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

    updateArticle(in_data: any) {

        this.ngxSpinnerService.show();
        this.articleService.updateArticle(in_data, this.articleId).subscribe(
            (result) => {
                console.log('result', result);

                this.ngxSpinnerService.hide();

                if (result.success) {
                    // this.toastr.success(result.message, 'Success!');
                    this.router.navigate(['/articles']);
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
