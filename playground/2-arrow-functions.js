// const square = function (x) {
//   return x * x
// }

// const square = (x) => {
//   return x * x
// }

// const square = x => x * x

// console.log(square(2))

/**
 * NOTE: Arrow functions do not bind their own "this" value, they 
 * bind the "this" value of the context in which they were created.
 * IOW: if you don't want to use something: function () {} as a property 
 * use something() {} if you need access to "this" for the current context
 * use arrow function. 
 */
const event = {
  name: 'Birthday Party',
  guestList: ['Joe', 'John', 'Frank'],
  printGuestList() {
    console.log('Guest list for ' + this.name)
    this.guestList.forEach(guest => {
      console.log(guest + ' is attending ' + this.name)
    })
  }
}

event.printGuestList()
