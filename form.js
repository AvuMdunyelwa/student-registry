// dom elements
const nameInput = document.querySelector('#name-input');
const surnameInput = document.querySelector('#surname-input');
let courseInput = document.querySelector('#course');
const stuNumber = document.querySelector('#studNumber');
const stuEmail = document.querySelector('#email');
const resetBtn = document.querySelector('#resButton');
const addStudentBtn = document.querySelector('#open-form');
const closeForm = document.querySelector('#close-form');
const closeEditStudent = document.querySelector('#close-edit-student');
const modal = document.querySelector('#modal');
const form = document.querySelector('form');
const dropDownBtn = document.querySelector('#courses-menu-btn');
const dropDownMenu = document.querySelector('#courses-list');
const allCourses = document.querySelectorAll('li');
const editIconColumn = document.querySelector('#edit-column');
const infoTable = document.querySelector('table');
const callToAction = document.querySelector('#edit-all-information');
const editStudentInfo = document.querySelector('#edit-student-info');
const editingForm = document.querySelector('.edit-form');
let editInfo;
let studentNumDelete;
let index = 0;

//flag
let isCourseMenuOpen = false;
let isEdited = false;
let isAddingInfo = true;


// variables

const studentInfo = [];


// event listeners
addStudentBtn.addEventListener('click', () => {
    modal.show();
});

closeForm.addEventListener('click', () => {
    modal.close();
    editingForm.close()
});

closeEditStudent.addEventListener('click', () => {
    callToAction.close();
});

dropDownBtn.addEventListener('click', () => {

    if(!isCourseMenuOpen) {
        isCourseMenuOpen = true;
        dropDownMenu.style.visibility = 'visible';
        dropDownMenu.style.opacity = '1';
        displayCourse();
        
    }else {
        dropDownMenu.style.visibility = 'hidden';
        isCourseMenuOpen = false;
    }
})

//displaying the course selected to the input
function displayCourse() {
    allCourses.forEach(course => {
        course.addEventListener('click', () => {
            courseInput.value = course.innerHTML;
            dropDownMenu.style.visibility = 'hidden';
            isCourseMenuOpen = false;
        })
    });
}

// displaying the students' infomation in a table
function tableDisplay(obj) {

    let tr = document.createElement('tr');
    tr.classList.add('rowInfo');
    let td1 = document.createElement('td');
    td1.classList.add('stuNumber');
    let td2 = document.createElement('td');
    td2.classList.add('stuName');
    let td5 = document.createElement('td');
    td5.classList.add('email');
    let td3 = document.createElement('td');
    td3.classList.add('course');
    let td4 = document.createElement('td');
    td4.classList.add('status');
    
    dataSet(tr);
    //assign values to children element
    td1.innerHTML = obj.studentNumber;
    td2.innerHTML = obj.name + ' ' + obj.surname;
    td3.innerHTML = obj.course;
    td4.innerHTML = obj.attendance;
    td5.innerHTML = obj.email;
    
    //grouping children element inside parent element
    tr.append(editStudentIcon(),td1,td2,td5,td3,td4);
    infoTable.appendChild(tr);
    
}

function dataSet(element) {
    element.dataset.index = index;
    index++;
}

// storing info
form.addEventListener('submit', (e) => {
    e.preventDefault();

    addStudentInfo();
    modal.close();
}); 

function addStudentInfo() {
    const checkStatus = form.querySelector("input[name='Attendance']:checked");
    const studentFile = new Object();
    
    // assigning input values to object keys
    studentFile.name = nameInput.value;
    studentFile.surname = surnameInput.value;
    studentFile.studentNumber = parseInt(stuNumber.value);
    studentFile.course = courseInput.value;
    studentFile.email = stuEmail.value;
    console.log(checkStatus);
    //assigning attendance
   if(checkStatus) {
    studentFile.attendance = checkStatus.value;
    }else {
       alert('Please select the attendance of student');
       return;
    }
    
    // storing the object to array
    studentInfo.push(studentFile);
    console.log(studentInfo);
   
    tableDisplay(studentFile);
    clearAfterSbmt();
    noDataRecord();
    return {...studentFile};
}



function clearAfterSbmt() {
    const formInputs = document.querySelectorAll("input[type='text']");
    const attendanceRadios = document.querySelectorAll("input[name='Attendance']");
    const stuEmail = document.querySelector('#email');

    formInputs.forEach((input) => {
        input.value = '';
    });

    attendanceRadios.forEach((radio) => {
        radio.checked = radio.unchecked;
    })

    stuEmail.value = '';

}

function noDataRecord() {
    const noDataRecordText = document.querySelector('h3');
    if(studentInfo.length > 0) {
        noDataRecordText.style.display = 'none';
    }
}
//editing student info

function editStudentIcon() {
    let td = document.createElement('td');
    let edit = document.createElement('img');
    edit.src = './images/minus-circle-solid.svg';
    td.classList.add('edit-student');

    edit.addEventListener('click', (e) => {
        callToAction.show();
        editInfo = e.target.closest('.rowInfo');
    });
    
    td.appendChild(edit);
    return td;
}

const editAllInfo = document.querySelector('#edit-btn');

editAllInfo.addEventListener("click", (e) => { 
    
    if(studentInfo.length <= 0) {
        e.preventDefault();
        return;
    }
    
    
    if(!isEdited) {
        editAllInfo.innerHTML = 'Close';
        infoTable.classList.add('editing');
        editIconColumn.style.display = 'block';
        isEdited = true;
    }else {
        editAllInfo.innerHTML = 'Edit';
        infoTable.classList.remove('editing');
        editIconColumn.style.display = 'none';
        isEdited = false;
        
    }
}) 

// edit student info through form

editStudentInfo.addEventListener('click', () => {
    callToAction.close();
    const index = Number(editInfo.dataset.index);
    editInfoOnForm(index);
});

function editInfoOnForm(index) {
    const editFormInfo = document.querySelector('.edit-form');
    editFormInfo.show();
    editForm(index);
}

function editForm(index) {

    const nameInput = editingForm.querySelector('#name-input');
    const surnameInput = editingForm.querySelector('#surname-input');
    let courseInput = editingForm.querySelector('#course');
    const stuNumber = editingForm.querySelector('#studNumber');
    const stuEmail = editingForm.querySelector('#email');
    
    nameInput.value = studentInfo[index].name;
    surnameInput.value = studentInfo[index].surname;
    courseInput.value = studentInfo[index].course;
    stuNumber.value = studentInfo[index].studentNumber;
    stuEmail.value = studentInfo[index].email;
    
    // Attendance radio buttons
    const attendanceRadios = document.querySelectorAll("input[name='Attendance']");
    attendanceRadios.forEach(radio => {
    radio.checked = (radio.value === studentInfo[index].attendance);
    });

    const formSubmit = document.querySelector('.edit-form');
    formSubmit.addEventListener('submit', (e) => {
        e.preventDefault();

        studentInfo[index] = {
            name: nameInput.value,
            surname: surnameInput.value,
            course: courseInput.value,
            studentNumber: stuNumber.value,
            email: stuEmail.value,
            attendance: editingForm.querySelector("input[name='Attendance']:checked").value,
        }

        studentInfo[index].attendance;
        tableDisplay(studentInfo[index]);
        editInfo.remove();
        editingForm.close();
        console.log(studentInfo);
    })
}

// deleting infomation
const deleteTr = document.querySelector('#delete-btn');

deleteTr.addEventListener('click', () => {
    //deleting DOM elements
    if(true) {
        const objIndex = parseInt(deleteInfo.dataset.index);
        alert('You are about to delete information that cannot be retrieved')
        editInfo.remove();
        studentInfo.splice(objIndex, 1);
        callToAction.close();
    }
})



