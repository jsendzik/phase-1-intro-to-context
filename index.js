// Your code here
let timeInEvents = []
let timeOutEvents = []



function createEmployeeRecord(employeeArray) {
    let firstName = employeeArray[0];
    let familyName = employeeArray[1];
    let title = employeeArray[2];
    let payPerHour = employeeArray[3];
  
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
}

function createEmployeeRecords(employeeArrays) {
    let employees = []
    employeeArrays.forEach((employeeArray) => {
        employees.push(createEmployeeRecord(employeeArray))
    });
    return employees
}

function createTimeInEvent (employeeRecord, dateTime) {
    const timeInEvent = {
        type: "TimeIn",
        date: dateTime.slice(0,10),
        hour: parseInt(dateTime.slice(11,15))
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord
}

function createTimeOutEvent (employeeRecord, dateTime) {
    const timeOutEvent = {
        type: "TimeOut",
        date: dateTime.slice(0,10),
        hour: parseInt(dateTime.slice(11,15))
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord
}

function hoursWorkedOnDate(record, dateTimeString) {
    const dateIn = record.timeInEvents.find((event) => event.date === dateTimeString);
    const dateOut = record.timeOutEvents.find((event) => event.date === dateTimeString);
  
    if (dateIn && dateOut) {
      const hoursWorked = (dateOut.hour - dateIn.hour) / 100;
      return hoursWorked;
    } else {
      // Handle case when dateIn or dateOut is not found
      return 0;
    }
}

function wagesEarnedOnDate (record, dateTimeString) {
    return hoursWorkedOnDate(record, dateTimeString) * record.payPerHour
}



function allWagesFor(record) {
    const totalWages = record.timeInEvents.reduce((total, event) => {
      if (event.type === "TimeIn") {
        return total + wagesEarnedOnDate(record, event.date);
      } else {
        return total;
      }
    }, 0);
  
    return totalWages;
}

function calculatePayroll (employeeRecords) {
    return employeeRecords.reduce((total, employee) => total += allWagesFor(employee), 0)
}