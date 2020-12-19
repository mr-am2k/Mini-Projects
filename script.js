
var numberButtons = document.querySelectorAll('.number')
var operationButtons = document.querySelectorAll('.operator')
var equalsButton = document.querySelector('.equals')
var deleteButton = document.querySelector('.delete')
var allClearButton = document.querySelector('.clear')
var previousOperand = document.querySelector('.previous-operand')
var currentOperand = document.querySelector('.current-operand')

class Calculator{
    constructor(currentOperand, previousOperand){
    this.previousOperand=previousOperand        
    this.currentOperand=currentOperand
    this.clear()
    }
    clear(){  // set output to empty screen
        this.prevOperand=""               
        this.currOperand=""                
        this.operation=undefined            
    }
    deleteButton(){ //use it to delete last digit
        this.currOperand=this.currOperand.toString().slice(0,-1)  //takes current operand that we are working with and removes last digit, also we use strings because 5+5 as numbers is 10 and 5+5 as string is 55
    }
    addNumber(number){
        if(number==="." && this.currOperand.includes(".")) return      // checks if there is dot, and if there is a dot returns nothing, so we can continue adding numbers after decimal point. Without first condition, we can't eneter numbers after dot and without second we can't enter dot
        this.currOperand=this.currOperand.toString()+number.toString()
    }
   
    execution(){ // actually doing calculations
        var calculation
        const firstNumber=parseFloat(this.prevOperand) // convert operand over which we want to perform operations from string to a decimal number
        const secondNumber=parseFloat(this.currOperand)// doing same with second operand
        if(isNaN(firstNumber) || isNaN(secondNumber)) return// in case we don't enter one of the operands, does nothing until we enter it
        switch(this.operation){
            case "+":
                calculation=firstNumber+secondNumber
                break
            case "-":
                calculation=firstNumber-secondNumber
                break
            case "*":
                calculation=firstNumber*secondNumber
                break
            case "/":
                calculation=firstNumber/secondNumber
                break   
            default:
                return     
            }
        this.currOperand=calculation // assign result to a  current operand which is displayd as a result 
        this.operation=undefined // resets the operation
        this.prevOperand=""  // removes second operand
    }

    addingOperation(operator) { // function that is used to use operator 
        if (this.currOperand === '') return  // in case we didn't input operand, doesn't execute anthing
        if (this.prevOperand !== '') { // in case we have both operands, then completes calculation
          this.execution()
        }
        this.operation = operator 
        this.prevOperand = this.currOperand
        this.currOperand = ''
      }
      fixDot(number){ // function that is made to edit output; will add comma(to show decimal part of the number) and dots(to separate every three digits in whole part of the number)
        const num=number.toString() //conert entered number that we use for calculation to a string
        const leftPart=parseFloat(num.split(".")[0]) // splits number at decimal point and takes left part of it, which is a number without decimal part
        const rightPart=num.split(".")[1] // splits number at decimal point and takes decimal part
        var outputNum
        if(isNaN(leftPart)){  // checks is the whole parte of the number actually a number, if is not, it will not output anything
            outputNum=""
        }else{
            outputNum=leftPart.toLocaleString("en") // if it is a number, output that part, but convert it to strin in a cretain languange (I used croatian, so output will be for example 444.444 not 444444)
        }
        if(rightPart==null){ // now check right part,and if the decimal part doesn't exist, just output outputNum variable, which we assigned value in previous if-else condition
            return outputNum
        }else{
            return `${outputNum}.${rightPart}` // if ther is decimal part, to outputNum adds first comma then decimal part
        }
      }
      output(){
          this.currentOperand.innerText=this.fixDot(this.currOperand) // on output to currentOperand, which is actually div that displays result, assign value of currOperand
          if(this.operation!=null){ // if we don't have any operation, we don't have anything in upper div, that is used for previous operand output
            this.previousOperand.innerText=`${this.fixDot(this.prevOperand)} ${this.operation}`
          }
          else{ // if there is an operation will display previous operand and operation
            this.previousOperand.innerText=" "
          }
          
      }
}
const calculator= new Calculator(currentOperand, previousOperand)

numberButtons.forEach(function(button){ //forEach loop, loops through every elemnt that is selected with querySlectrorAll from class number and add event listen that will on click add number to currOperand that we display in output function
    button.addEventListener("click", function(event){
        calculator.addNumber(button.innerText)
        calculator.output()
    })
})
operationButtons.forEach(button => { // same as previous, but for operation buttons
    button.addEventListener('click', () => {
      calculator.addingOperation(button.innerText)
      calculator.output()
    })
  })
// next three event listners are for single buttons (equals, delete and clear)
equalsButton.addEventListener("click", function(event){  
    calculator.execution()
    calculator.output()
  })

deleteButton.addEventListener("click", function(event){
    calculator.deleteButton()
    calculator.output()
  })

allClearButton.addEventListener("click", function(event){
    calculator.clear()
    calculator.output()
  })
