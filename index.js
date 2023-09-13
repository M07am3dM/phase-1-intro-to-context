// Your code here
function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeesData) {
  return employeesData.map((employeeData) =>
    createEmployeeRecord(employeeData)
  );
}

function createTimeInEvent(employeeRecord, dateInStamp) {
  const [date, time] = dateInStamp.split(" ");
  const [year, month, day] = date.split("-");
  const [hour, minutes] = time.split(":");

  const timeInEvent = {
    type: "TimeIn",
    hour: parseInt(hour),
    date: `${year}-${month}-${day}`,
  };

  employeeRecord.timeInEvents.push(timeInEvent);

  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateOutStamp) {
  const dateTime = dateOutStamp.split(" ");

  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateTime[1]),
    date: dateTime[0],
  });
  return employeeRecord;
}

// function createTimeOutEvent(employeeRecord, dateOutStamp) {
//   const [date, time] = dateOutStamp.split(" ");
//   const [year, month, day] = date.split("-");
//   const [hour, minutes] = time.split(":");

//   const timeOutEvent = {
//     type: "TimeOut",
//     hour: parseInt(hour),
//     date: `${year}-${month}-${day}`,
//   };

//   employeeRecord.timeOutEvents.push(timeOutEvent);

//   return employeeRecord;
// }

function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOutEvent = employeeRecord.timeOutEvents.find(
    (event) => event.date === date
  );

  const timeInHour = timeInEvent.hour;
  const timeOutHour = timeOutEvent.hour;
  const hoursWorked = timeOutHour - timeInHour;

  return hoursWorked / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);

  const payOwed = hoursWorked * employeeRecord.payPerHour;

  return payOwed;
}

function allWagesFor(employeeRecord) {
  const datesWorked = employeeRecord.timeInEvents.map((event) => event.date);
  const payOwedForAllDates = datesWorked.reduce(
    (total, date) => total + wagesEarnedOnDate(employeeRecord, date),
    0
  );
  return payOwedForAllDates;
}

function calculatePayroll(employeeRecords) {
  const totalPayroll = employeeRecords.reduce(
    (total, employee) => total + allWagesFor(employee),
    0
  );

  return totalPayroll;
}
