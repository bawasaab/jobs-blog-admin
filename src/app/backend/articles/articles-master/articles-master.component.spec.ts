import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesMasterComponent } from './articles-master.component';

describe('ArticlesMasterComponent', () => {
  let component: ArticlesMasterComponent;
  let fixture: ComponentFixture<ArticlesMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
