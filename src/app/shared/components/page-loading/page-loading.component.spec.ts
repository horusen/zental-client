import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageLoadingComponent } from './page-loading.component';

describe('PageLoadingComponent', () => {
  let component: PageLoadingComponent;
  let fixture: ComponentFixture<PageLoadingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
