import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ArticleService } from "../../../services/article.service";
import Swal from 'sweetalert2';
import { ConstantService } from '../../../services/constant.service';

import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from '@angular/router';

import { Article } from "../../../interfaces/article";

@Component({
    selector: 'app-articles-content',
    templateUrl: './articles-content.component.html',
    styleUrls: ['./articles-content.component.css']
})
export class ArticlesContentComponent implements OnInit {

    config!: object;
    articleId: any;
    isArticleIdProvidedFlag!: boolean;
    articleData!: Article;

    articleContentForm!: FormGroup;
    submitted = false;
    showSubmitBtn = true;

    constructor(
		private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private articleService: ArticleService,
		private constantService: ConstantService,
		private ngxSpinnerService: NgxSpinnerService
    ) { }

    ngOnInit(): void {

        this.articleContentForm = this.formBuilder.group({
            description: ['', [Validators.required]]
        });
        this.setArticleId();

        this.config = {
            height: 500,
            // toolbar: true,
            // toolbar: 'undo redo | alignleft aligncenter alignright alignjustify | formatselect fontselect fontsizeselect | bullist numlist | outdent indent',
            toolbar: [
                'code | undo redo | alignleft aligncenter alignright alignjustify | formatselect fontselect fontsizeselect | bullist numlist | outdent indent | bold italic underline strikethrough | forecolor backcolor | superscript subscript | removeformat | h1 h2 h3 | indent outdent | link image emoticons charmap hr | print preview media fullpage | fullscreen',
            ],

            // menubar: true,
            // menubar: [
            // 	'favs file edit view insert format tools table help'
            // ],

            quickbars_insert_toolbar: true,
            // image_advtab: true,
            // paste_data_images: true,
            // automatic_uploads: false,
            // quickbars_image_toolbar: 'alignleft aligncenter alignright | rotateleft rotateright | imageoptions',
            // block_formats: 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;Preformatted=pre',
            // contextmenu: 'link image table',

            // plugins: `print preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons`,
            plugins: [
                'code',
                'print',
                'preview',
                'importcss',
                'searchreplace',
                'autolink',
                'autosave',
                'save',
                'directionality',
                'visualblocks',
                'visualchars',
                'fullscreen',
                'image',
                'link',
                'media',
                'template',
                'codesample',
                'table',
                'charmap',
                'hr',
                'pagebreak',
                'nonbreaking',
                'anchor',
                'toc',
                'insertdatetime',
                'advlist',
                'lists',
                'wordcount',
                'imagetools',
                'textpattern',
                'noneditable',
                'help',
                'charmap',
                'quickbars',
                'emoticons',
                'fullscreen'
            ],

            mobile: {
                // plugins: `print preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media  template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons`
                plugins: [
                    'print',
                    'preview',
                    'importcss',
                    'searchreplace',
                    'autolink',
                    'autosave',
                    'save',
                    'directionality',
                    'visualblocks',
                    'visualchars',
                    'fullscreen',
                    'image',
                    'link',
                    'media',
                    'template',
                    'codesample',
                    'table',
                    'charmap',
                    'hr',
                    'pagebreak',
                    'nonbreaking',
                    'anchor',
                    'toc',
                    'insertdatetime',
                    'advlist',
                    'lists',
                    'wordcount',
                    'textpattern',
                    'noneditable',
                    'help',
                    'charmap',
                    'quickbars',
                    'emoticons',
                    'imagetools',
                    'fullscreen'
                ]
            },
        };
    }

    // convenience getter for easy access to form fields
	get f() { return this.articleContentForm.controls; }

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

			this.articleContentForm.patchValue({
                description: this.articleData?.description
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

    onSubmit() {
		this.submitted = true;

		let in_data = this.articleContentForm.value;
		console.log('in_data', in_data);
  
		// stop here if form is invalid
		if (this.articleContentForm.invalid) {
		  return;
		}

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
