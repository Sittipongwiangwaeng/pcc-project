import { Component } from '@angular/core';
import { SharedataService } from '../sharedata.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

    inputData: any = {
        name: '',
        lastname: ''
    }
    message: string = '';

    constructor(private sharedataSevr: SharedataService) { }

    ngOnInit(): void {
        console.log('Input Component')
        this.sharedataSevr.currentApprovalStageMessage.subscribe(msg => this.message = msg);
        console.log('currentApprovalStageMessage: ', this.message)
    }

    submit() {
        console.log('submit', this.inputData.name)
        // console.log(this.approvalText)
        this.sharedataSevr.updateApprovalMessage(this.inputData)
        // window.location.href = `/sumary`;
    }

}
