import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingFamilyEditComponent } from './receiving-family.edit.component';

describe('ReceivingFamilyEditComponent', () => {

    let component: ReceivingFamilyEditComponent;
    let fixture: ComponentFixture<ReceivingFamilyEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReceivingFamilyEditComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReceivingFamilyEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
