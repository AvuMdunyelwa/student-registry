// dom elements
const nameInput = document.querySelector('#name-input');
const surnameInput = document.querySelector('#surname-input');
let courseInput = document.querySelector('#course');
const stuNumber = document.querySelector('#studNumber');
const stuEmail = document.querySelector('#email');
const modal = document.querySelector('#modal');
const form = document.querySelector('form');
const editIconColumn = document.querySelector('#edit-column');
const infoTable = document.querySelector('table');
const callToAction = document.querySelector('#edit-all-information');
const editStudentInfo = document.querySelector('#edit-student-info');
const editingForm = document.querySelector('.edit-form');
const rowWrapper = document.querySelector('.row-wrapper');

//flag
let isCourseMenuOpen = false;
let isEdited = false;

// variables
let index = 0;
const studentInfo = [];
let currentRow;
let deleteInfo;
let currentIndex;


// event listeners
document.addEventListener('click', (e) => {
    //edit all information
    if (e.target.classList == "edit-menu") {
        if (studentInfo.length <= 0) {
            e.preventDefault();
            return;
        }  
    
        if (!isEdited) {
            editAllInfo.innerHTML = "Close";
            infoTable.classList.add("editing");
            editIconColumn.style.display = "block";
            isEdited = true;
        }else {
            editAllInfo.innerHTML = "Edit";
            infoTable.classList.remove("editing");
            editIconColumn.style.display = "none";
            isEdited = false;
        }
    }

    //add student
    ;
    if (e.target.classList == "add-student") {
        modal.show();
    }

    //close add form
    if (e.target.classList == "cancel-adding") {
        modal.close();
        editingForm.close()

    }

    //cancel editing student info
    if (e.target.classList == "cancel-editing") {
        const closeRow = document.querySelector('.edt');
        if(closeRow) {
            closeRow.classList.remove('edt');
        };
        callToAction.close();
    }

    //view course list
    const courseBtn = e.target.closest('.view-courses');
    if (courseBtn) {

        const parent = courseBtn.closest('form');
        const courseList = parent.querySelector('#courses-list');
    
        if(!isCourseMenuOpen) {
            const course = courseList.querySelectorAll('li');
            courseList.style.visibility = 'visible';
            displayCourse(course,parent);
            isCourseMenuOpen = true;
        }else {
            courseList.style.visibility = 'hidden';
            isCourseMenuOpen = false;

        }
    }

})


function displayCourse(element, input) {
    element.forEach(course => {
        course.addEventListener('click', () => {
            const courseInput = input.querySelector('input[name="course"]');
            courseInput.value = course.innerHTML; 
            
            //closing the list menu after selecting course
            const courseList = input.querySelector('#courses-list');
            courseList.style.visibility = 'hidden';
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
    for(let i = 0; i < studentInfo.length; i++) {
        element.dataset.index = i;
    }
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
   
    //assigning attendance
   if(checkStatus) {
    studentFile.attendance = checkStatus.value;
    }else {
       alert('Please select the attendance of student');
       return;
    }
    
    // storing the object to array
    studentInfo.push(studentFile);
   
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
    }else {
        noDataRecordText.style.display = 'block';
    }
}

//editing student info
//creating edit & delete button
function editStudentIcon() {
    let td = document.createElement('td');
    let edit = document.createElement('img');
    edit.src = './images/minus-circle-solid.svg';
    td.classList.add('edit-student');
    td.appendChild(edit);
    
    edit.addEventListener('click', (e) => {
        callToAction.show();
       const currentRow = e.target.closest('tr');
       currentRow.classList.add('edt');
       console.log('edit',currentRow);
    });
    return td;
}

// edit student info through form

//show editing form
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
        editingForm.close();
        updateRowOrder();
    })
}

//updating row order
function updateRowOrder() {
    rowWrapper.innerHTML = '';
    let editIcon = editStudentIcon();
    studentInfo.forEach((trow, i) => {
        const row = document.createElement('tr');
        row.dataset.index = i;

        row.innerHTML = `
        <td>${trow.studentNumber}</td>
        <td>${trow.name} ${trow.surname}</td>
        <td>${trow.email}</td>
        <td>${trow.course}</td>
        <td>${trow.attendance}</td>
        `;
        
        row.prepend(editStudentIcon());
        rowWrapper.append(row);
    });

}

// edit or deleting infomation

const editDelWrap = document.querySelector('#edit-wrapper')
editDelWrap.addEventListener('click', (e) => {

    const closeRow = document.querySelector('.edt');
    const dataSet = closeRow.dataset.index;
    
    if(e.target.classList == 'edit-student-info') {
            
        currentRow = closeRow;
        currentIndex = dataSet;

        editInfoOnForm(dataSet);
        callToAction.close();
        currentRow.classList.remove('edt');
            
    }else if(e.target.classList == 'delete-btn') {
        alert('You are about to delete information that cannot be retrieved');
        studentInfo.splice(dataSet, 1);
        updateRowOrder();
        callToAction.close();
            
    }
})




