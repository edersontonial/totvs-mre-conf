import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingFamilyListComponent } from './receiving-family.list.component';

describe('ReceivingFamilyListComponent', () => {

    let component: ReceivingFamilyListComponent;
    let fixture: ComponentFixture<ReceivingFamilyListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReceivingFamilyListComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReceivingFamilyListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
