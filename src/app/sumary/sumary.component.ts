import { Component } from '@angular/core';
import { SharedataService } from '../sharedata.service';

@Component({
  selector: 'app-sumary',
  templateUrl: './sumary.component.html',
  styleUrls: ['./sumary.component.scss']
})
export class SumaryComponent {

    message: any;

    constructor(private sharedataSevr: SharedataService) { }

    ngOnInit(): void {
        console.log('Sumary Component')
        this.sharedataSevr.currentApprovalStageMessage.subscribe(msg => this.message = msg);
        console.log('currentApprovalStageMessage: ', this.message)
    }

}
