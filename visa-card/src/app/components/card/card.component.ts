import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  cardForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.cardForm =  new FormGroup({
      'cardNumber': new FormControl('', [Validators.required]),
      'month': new FormControl('', [Validators.required]),
      'year': new FormControl('', [Validators.required]),
      'cvv': new FormControl('', [Validators.required]),
    })
  }

}
