import { LightningElement, track } from 'lwc';

export default class Todo_manager extends LightningElement {
    time="7pm";
    greeting="good evening"

      //reactive list property to hold todo items
  @track todos = [];

    connectedCallback() {
        //get current time
        this.getTime();
    
     
        //get time periodically after every minute
        setInterval(() => {
          this.getTime();
        }, 1000 * 60);
      }
    

    getTime() {
        const date = new Date(); /* creating object of Date class */
        const hour = date.getHours();
        const min = date.getMinutes();

        this.time = `${this.getHour(hour)}:${this.getDoubleDigit(
            min
          )} ${this.getMidDay(hour)}`;
          //get greeting (mornig/afternoon/evening/)
          this.setGreeting(hour);
      }

       //Convert 24 hours format to 12 hours format
  getHour(hour) {
    return hour == 0 ? 12 : hour > 12 ? hour - 12 : hour;
  }

  //convert single digit to double digit
  getDoubleDigit(digit) {
    return digit < 10 ? "0" + digit : digit;
  }

  //return AM or PM based on current hour
  getMidDay(hour) {
    return hour >= 12 ? "PM" : "AM";
  }

      setGreeting(hour) {
        if (hour < 12) {
          this.greeting = "Good Morning";
        } else if (hour >= 12 && hour < 17) {
          this.greeting = "Good Afternoon";
        } else {
          this.greeting = "Good Evening";
        }
      }

      addTodoHandler() {
        //get input box html element
        const inputBox = this.template.querySelector("lightning-input");

        const todo = {
          todoId: this.todos.length,
          todoName: inputBox.value,
          done: false,
          todoDate: new Date()
        }
        this.todos.push(todo);
        inputBox.value="";
      }

      // get property to return upcoming/unfinished todos
      get upcomingTasks(){
        return this.todos && this.todos.length ? this.todos.filter(todo => !todo.done) : []
      }

      // get property to return completed todos
  get completedTasks() {
    return this.todos && this.todos.length
      ? this.todos.filter(todo => todo.done)
      : [];
  }

}   