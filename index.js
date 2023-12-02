const Inputs = document.querySelectorAll(".dateInput");
Inputs.forEach((el) => {
  el.onfocus = () => {
    removeErrorMessage(el);
  };
});
function setDate() {
  if (checkInputs(_day, _month, _year) != true) {
    Inputs.forEach((el) => removeErrorMessage(el));
    const newDate = new Date(
      `${_year.value.trim()} ${_month.value.trim()} ${_day.value.trim()}`
    );
    resultDay.textContent = newDate.getDate();
    resultMonth.textContent = newDate.getMonth() + 1;
    resultYear.textContent = newDate.getFullYear();
  }
}
function checkInputs(...inputs) {
  let checker = false;
  inputs.forEach((el) => {
    if (isEmpty(el) == true) checker = true;
    else if (isNumber(el) == true) checker = true;
    else if (isNegative(el) == true) checker = true;
    else if (checkDate(el) == true) checker = true;
  });
  return checker;
  function isNumber(element) {
    if (isNaN(element.value.trim()) == true) {
      errorMessage(element, "must be a valid date");
      return true;
    } else return false;
  }
  function isEmpty(element) {
    let ele = element.value.trim();
    if (ele == "" || ele == " " || ele == null || ele == 0) {
      errorMessage(element, "this field is required");
      return true;
    } else return false;
  }
  function isNegative(element) {
    if (parseInt(element.value.trim()) < 0) {
      errorMessage(element, "must be a valid date");
      return true;
    } else return false;
  }
  function errorMessage(element, message) {
    let messageBox = element.parentElement.querySelector(".errorMessage");
    messageBox.parentElement.classList.add("error");
    messageBox.innerHTML = message;
  }
  function checkDate(element) {
    let checkerDate = false;
    const fullDate = new Date(
      `${_year.value.trim()} ${_month.value.trim()} ${_day.value.trim()}`
    );
    const CurrentDate = new Date();

    let UTCDate = `${fullDate.getUTCFullYear()} ${fullDate.getUTCMonth() + 1} ${
      fullDate.getUTCDate() + 1
    }`;
    let normalDate = `${fullDate.getFullYear()} ${
      fullDate.getMonth() + 1
    } ${fullDate.getDate()}`;

    let ele = element.value.trim();
    switch (element.id) {
      case "_day":
        if (fullDate == "Invalid Date" && ele > 31) {
          checkerDate = true;
          errorMessage(element, "must be a valid day");
        }
        if (fullDate != "Invalid Date" && normalDate != UTCDate) {
          if (ele == 31) {
            checkerDate = true;
            errorMessage(element, "must be a valid day");
          }
        }

        break;
      case "_month":
        if (fullDate == "Invalid Date" && ele > 12) {
          checkerDate = true;
          errorMessage(element, "must be a valid month");
        }
        if (fullDate != "Invalid Date" && normalDate != UTCDate) {
          if (ele > 12) {
            checkerDate = true;
            errorMessage(element, "must be a valid month");
          }
        }
        break;
      case "_year":
        if (ele > CurrentDate.getUTCFullYear()) {
          checkerDate = true;
          errorMessage(element, "must be in the past");
        }
        if (ele.length < 4) {
          checkerDate = true;
          errorMessage(element, "must be a valid year");
        }
        break;
    }
    return checkerDate;
  }
}
function removeErrorMessage(element) {
  element.parentElement.classList.remove("error");
}
