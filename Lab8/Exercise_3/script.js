class Course {
    constructor(courseName, instructor) {
        this.courseName = courseName;
        this.instructor = instructor;
    }

    displayCourse() {
        document.getElementById('course-title').innerText = `Course: ${this.courseName}`;
        document.getElementById('instructor-name').innerText = `Instructor: ${this.instructor}`;
        console.log(`Course: ${this.courseName}, Instructor: ${this.instructor}`);
    }
}

let course1 = new Course("Web Technologies", "Dr. Kumar");
course1.displayCourse();

let enrollCourse = new Promise((resolve, reject) => {
    let seatsAvailable = true; 

    setTimeout(() => {
        if (seatsAvailable) {
            resolve("Enrollment Successful");
        } else {
            reject("Course Full");
        }
    }, 3000);
});

const statusDiv = document.getElementById('enrollment-status');

enrollCourse
    .then(msg => {
        statusDiv.textContent = msg;
        statusDiv.className = "status success";
        console.log(msg);
    })
    .catch(err => {
        statusDiv.textContent = err;
        statusDiv.className = "status error";
        console.log(err);
    });
