let coursesApi = 'http://localhost:3000/courses'

function start() {
    getCourses(renderCourses)
    handleCreateForm()
    handleEditForm()
}

start()

//functions
function getCourses(callback) {
    fetch(coursesApi)
        .then((res) => res.json())
        .then(callback)
}
function renderCourses(courses) {
    let listCoursesBlock = document.querySelector('#list-courses')
    let htmls = courses.map(function(course,index) {
        return `
            <li class="course-item-${course.id}">
                <h4>${course.name}</h4>
                <p>${course.content}</p>
                <button onclick="handleDeleteCourse(${course.id})">Xoa</button>
                <button onclick="handleEditCourse(${course.id})">Sua</button>     
            </li>
        `
    })
    listCoursesBlock.innerHTML = htmls
}

function createCourses(data, callback) {
    let options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data)
    }
    fetch(coursesApi,options) 
        .then((res) => res.json())
        .then(callback)
}

function handleDeleteCourse(id) {
    let options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
    }
    fetch(coursesApi + "/" + id, options) 
        .then((res) => res.json())
        .then(() => {
            let courseItem = document.querySelector('.course-item-' + id)
            if(courseItem) {
                courseItem.remove()
            }
        })
}

function handleEditCourse(id) {
    let options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
    }
    fetch(coursesApi + "/" + id, options) 
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            document.querySelector('input[name="name"]').value = data.name
            document.querySelector('input[name="content"]').value = data.content
            document.querySelector('#edit').name = data.id          
        })
}

function editCourses(data) {
    let options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data)
    }
    fetch(coursesApi + "/" + data.id, options) 
        .then((res) => res.json())
}


function handleCreateForm() {
    let createBtn = document.querySelector('#create')
    createBtn.onclick = function() {
        let name = document.querySelector('input[name="name"]').value
        let content = document.querySelector('input[name="content"]').value
        let form = {
            name:name,
            content:content
        }
        createCourses(form,function() {
            getCourses(renderCourses)
        })
    }
}

function handleEditForm() {
    let editBtn = document.querySelector('#edit')
    editBtn.onclick = () => {
        const id = editBtn.name
        const name =  document.querySelector('input[name="name"]').value
        const content =  document.querySelector('input[name="content"]').value
        const data = {
            name,content,id
        }
        editCourses(data)
    }
}