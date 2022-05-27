import { LightningElement, api } from 'lwc';

export default class Todo_item extends LightningElement {
     //public properties
  @api todoName;
  @api todoId;
  @api done = false;

  
}