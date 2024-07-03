const aCourse = {
    code: "CSE121b",
    name: "Javascript Language",
    sections: [
        {sectionNum: 1, roomNum: 'STC 353', enrolled: 26, days: 'TTh', instructor: 'Bro T'},
        {sectionNum: 2, roomNum: 'STC 347', enrolled: 28, days: 'TTh', instructor: 'Sis A'}
    ]
};

function renderCourseInfo(course) {
    document.getElementById("courseName").textContent = course.name;
    document.getElementById("courseCode").textContent = course.code;
}

function renderSections(course) {
    document.getElementById("sections").innerHTML = course.sections.map(section =>
        `<tr id="section-${section.sectionNum}">
            <td>${section.sectionNum}</td>
            <td>${section.roomNum}</td>
            <td>${section.enrolled}</td>
            <td>${section.days}</td>
            <td>${section.instructor}</td>
        </tr>`
    ).join('');
}

function updateEnrollment(isEnrolling) {
    const sectionNum = parseInt(document.getElementById("sectionNumber").value);
    const section = aCourse.sections.find(s => s.sectionNum === sectionNum);
    if (section) {
        section.enrolled += isEnrolling ? 1 : -1;
        document.getElementById(`section-${sectionNum}`).children[2].textContent = section.enrolled;
    } else {
        console.error(`Section ${sectionNum} not found`);
    }
}

document.addEventListener('click', event => {
    if (event.target.id === 'enrollStudent') updateEnrollment(true);
    else if (event.target.id === 'dropStudent') updateEnrollment(false);
});

renderCourseInfo(aCourse);
renderSections(aCourse);