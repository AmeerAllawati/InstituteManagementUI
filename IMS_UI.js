function displayStudents() {
    fetch('http://localhost:8080/', {
        headers: {
            'Authorization' : 'Basic ' + authEncoded,
        }
    })
        .then(response => response.json())
        .then(data => {
            const ul = document.querySelector('#students-list');

            ul.innerHTML = '';
            const li = document.createElement('li');
            li.textContent = 'Students list:';
            ul.appendChild(li);

            data.forEach(student => {
                const li = document.createElement('li');
                li.textContent = `ID: ${student.id}, Name: ${student.name}, Email: ${student.email}`;
                ul.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error getting the students list: ', error);
        })
}

const username = 'admin';
const password = 'new_password';
const authEncoded = btoa(username + ':' + password);

setInterval(displayStudents, 100);
const submitStudentsBtn = document.getElementById('submit-btn');
const updateStudentBtn = document.getElementById('update-btn');
const deleteStudentBtn = document.getElementById('delete-btn');


submitStudentsBtn.addEventListener('click', () => {
    const idInput = document.getElementById('id-input').value;
    const nameInput = document.getElementById('name-input').value;
    const emailInput = document.getElementById('email-input').value;




    const formData = {
        id: idInput,
        name: nameInput,
        email: emailInput
    };



    
    fetch('http://localhost:8080/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Basic ' + authEncoded
        },
        body: JSON.stringify(formData)
    })
        .catch(error => console.error(error));
});

updateStudentBtn.addEventListener('click', () => {
    const idInput = document.getElementById('id-input').value;
    const nameInput = document.getElementById('name-input').value;
    const emailInput = document.getElementById('email-input').value;

    const formData = {
        id: idInput,
        name: nameInput,
        email: emailInput
    };

    fetch('http://localhost:8080/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Basic ' + authEncoded
        },
        body: JSON.stringify(formData)
    })
        .catch(error => console.error(error));
});

deleteStudentBtn.addEventListener('click', () => {
    const idInput = document.getElementById('id-input').value;



    fetch('http://localhost:8080/' + idInput, {
        method: 'DELETE',
        headers: {
            'Authorization' : 'Basic' + authEncoded
        }
    })
        .catch(error => console.error(error));
});