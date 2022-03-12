function createEmployeeRecord(arr) {
    const newEmployee = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return newEmployee
}

function createEmployeeRecords (arr) {
    const arrOfEmpRecords = []
    arr.forEach(employeeObj => arrOfEmpRecords.push(createEmployeeRecord(employeeObj)))
    return arrOfEmpRecords
}

function createTimeInEvent (empObj, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    empObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return empObj
}

function createTimeOutEvent (empObj, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    empObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return empObj
}

function hoursWorkedOnDate (empObj, tarDate) {
    const inDate = empObj.timeInEvents.find(d => d.date === tarDate);
    const outDate = empObj.timeOutEvents.find(d => d.date === tarDate);
    return (outDate.hour - inDate.hour) / 100
}

function wagesEarnedOnDate (empObj, tarDate) {
    return hoursWorkedOnDate(empObj, tarDate) * empObj.payPerHour
}

function allWagesFor(empObj) {
    let allDates = empObj.timeInEvents.map(d => d.date)
    let empWages = allDates.reduce((memo, d) => {
        return memo + wagesEarnedOnDate(empObj, d)
    }, 0)
    return empWages
}

function calculatePayroll (arr) {
    let payroll = arr.reduce((memo, emp) => {
        return memo + allWagesFor(emp)
    }, 0);
    return payroll
}