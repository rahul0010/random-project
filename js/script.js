const student_enrollment_form = document.querySelector('.form-container.py-4.pr-4');
const student_table = document.querySelector('.enrolled-student-table');
const student_list = document.querySelector('.enrolled-student-lists');
const alert_elem = document.querySelector('.alert.alert-danger');


student_enrollment_form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form_data = new FormData(student_enrollment_form);
    let name;
    let email;
    let website;
    let image;
    let gender;
    const skills = [];
    for (const [key, value] of form_data) {
        if (key == 'name') {
            name = value;
        } else if (key == 'email') {
            email = value;
        } else if (key == 'website') {
            website = value.startsWith('http') ? value : `https://${value}`;
        } else if (key == 'image') {
            image = value.startsWith('http') ? value : `https://${value}`;
        } else if (key == 'gender') {
            gender = value;
        } else if (key == 'skills') {
            skills.push(value);
        }
    }

    if (name && email && website && website && gender) {
        if(student_table.classList.contains('d-none')) {
            student_table.classList.remove('d-none');
            alert_elem.classList.add('d-none');
        } 
        const html = `<tr class="student hidden">
                        <td>
                            <div class="description-container">
                                <span class="name">${name}</span>
                                <span class="gender">${gender.toLocaleUpperCase()}</span>
                                <span class="email">${email}</span>
                                <a href="#" class="link">${website}</a>
                                <span class="skills">${skills.join(', ')}</span>
                            </div>
                        </td>
                        <td>
                            <img src="${image}" class="student-image">
                        </td>
                    </tr>`
        student_list.insertAdjacentHTML('beforeend', html);
        await fade_student(0);
    }
});

const fade_student = async (ms) => {
    return new Promise(resolve => setTimeout(() => {
        student_list.querySelector('.hidden').classList.remove('hidden');
        resolve;
    }, ms))
}

const trim = (el) => {
    el.value = el.value.replace(/(^\s*)|(\s*$)/gi, "").replace(/[ ]{2,}/gi, " ").replace(/\n +/, "\n");
    return;
};
