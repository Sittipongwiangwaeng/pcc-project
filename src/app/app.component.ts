import { Component } from '@angular/core';
import { TaxData } from 'src/app/models/tax-data';

declare const bootstrap: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'pcc-project';
    curentPage = 1;
    btnBackDisabled = true;
    btnNextDisabled = false;
    taxFilingData: TaxData = {
        filingType: '0',
        month: '',
        year: '',
        saleAmount: 0,
        taxAmount: 0,
        surcharge: 0,
        penalty: 200.00,
        totalAmount: 0,
    };
    taxFilingJson: string = '';
    additionalData = {
        surcharge: '',
        penalty: '',
        totalAmount: '',
    };

    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    yearList: any = [];
    monthList: any = [];
    invalidTax: boolean = false;
    invalidMonth: boolean = false;
    invalidYear: boolean = false;
    invalidSaleAmount: boolean = false;
    isConfirmBtn: boolean = false;
    submitModal: any;
    constructor() { }

    ngOnInit(): void {
        this.setYear();
        this.setMonth();
    }

    ngAfterViewInit(): void {
        this.submitModal = new bootstrap.Modal(document.getElementById('submitModal'));
    }

    setMonth() {
        let currMonth = new Date().getMonth();

        for (let i = 0; i < currMonth + 1; i++) {
            this.monthList.push(this.months[i]);
        }
    }

    setYear() {
        let curentYear = (new Date()).getFullYear();

        for (let i = 0; i <= (curentYear - 2020); i++) {
            let year = 2020 + i;

            this.yearList.push(year);
        }
    }

    saleAmountInput(event: any) {
        this.taxFilingData.saleAmount = event.target.ariaValueNow;
        this.taxFilingData.taxAmount = this.taxFilingData.saleAmount * 0.07;
        this.taxFilingData.totalAmount = this.taxFilingData.taxAmount;
        this.setAdditionalFiling();
    }

    taxAmountInput(event: any) {
        let currentTax = parseInt(event.target.ariaValueNow);

        if (currentTax > this.taxFilingData.taxAmount + 20 || currentTax < this.taxFilingData.taxAmount - 20) {
            this.invalidTax = true;
        } else {
            this.taxFilingData.taxAmount = currentTax;
            this.taxFilingData.totalAmount = this.taxFilingData.taxAmount;
            this.invalidTax = false;
        }
    }

    goToBack() {
        if (this.curentPage !== 1) this.curentPage--;

        if (this.curentPage === 1) {
            this.isConfirmBtn = false;
            this.btnNextDisabled = false;
            this.btnBackDisabled = true;
        }
    }

    goToNext() {
        if (!this.checkInvalid()) {
            if (this.curentPage !== 2) this.curentPage++;

            if (this.curentPage === 2) {
                this.isConfirmBtn = true;
                this.btnNextDisabled = true;
                this.btnBackDisabled = false;
            }
        }
    }

    submit(){
        this.taxFilingData.saleAmount = this.formatNumber(this.taxFilingData.saleAmount);
        this.taxFilingData.taxAmount = this.formatNumber(this.taxFilingData.taxAmount);
        this.taxFilingData.penalty = this.formatNumber(this.taxFilingData.penalty);
        this.taxFilingData.surcharge = this.formatNumber(this.taxFilingData.surcharge);
        this.taxFilingData.totalAmount = this.formatNumber(this.taxFilingData.totalAmount);
        this.taxFilingJson = JSON.stringify(this.taxFilingData);
        this.submitModal.show();
    }

    formatNumber(number: number){
        return Math.floor(number * 100) / 100;
    }

    changeTypeState(event: any) {
        this.taxFilingData.filingType = event.target.value;
        if (this.taxFilingData.filingType === '1') {
            this.setAdditionalFiling();
        } else {
            this.taxFilingData.surcharge = 0;
            this.taxFilingData.penalty = 0;
        }
    }

    setAdditionalFiling() {
        this.taxFilingData.surcharge = (this.taxFilingData.taxAmount * 0.1);
        this.additionalData.surcharge = this.taxFilingData.surcharge.toFixed(2);
        if (this.taxFilingData.filingType === '1') {
            this.taxFilingData.totalAmount = this.taxFilingData.taxAmount + this.taxFilingData.surcharge + this.taxFilingData.penalty;
            this.additionalData.totalAmount = this.taxFilingData.totalAmount.toFixed(2);
        }
        this.additionalData.penalty = this.taxFilingData.penalty.toFixed(2);
    }

    checkInvalid() {
        this.invalidMonth = false;
        this.invalidYear = false;
        this.invalidSaleAmount = false;
        let invalid = false;

        if (this.taxFilingData.filingType === '0') {
            this.taxFilingData.filingType = 'Ordinary Filing';
            this.taxFilingData.surcharge = 0;
            this.taxFilingData.penalty = 0;
        } else {
            this.taxFilingData.filingType = 'Additional Filing';
        }

        if (!this.taxFilingData.month) {
            invalid = true;
            this.invalidMonth = true;
        } else if (!this.taxFilingData.year) {
            invalid = true;
            this.invalidYear = true;
        } else if (!this.taxFilingData.saleAmount) {
            invalid = true;
            this.invalidSaleAmount = true;
        } else {
            invalid = false;
        }

        return invalid;
    }
}
