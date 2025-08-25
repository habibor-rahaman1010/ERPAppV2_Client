import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReactiveFrom } from './user-reactive-from';

describe('UserReactiveFrom', () => {
  let component: UserReactiveFrom;
  let fixture: ComponentFixture<UserReactiveFrom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserReactiveFrom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReactiveFrom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
