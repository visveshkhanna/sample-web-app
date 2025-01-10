function Course(name, info, prerequisites = []) {
  this.name = name;
  this.info = info;
  this.prerequisites = prerequisites;
}

Course.prototype.startCourse = function () {
  console.log(`Starting course: ${this.name}`);
};

Course.prototype.checkPrerequisites = function (completedCourses) {
  return this.prerequisites.filter(
    (prerequisite) => !completedCourses.includes(prerequisite)
  );
};

function VideoCourse(name, info, prerequisites) {
  Course.call(this, name, info, prerequisites);
}

VideoCourse.prototype = Object.create(Course.prototype);

function LiveCourse(name, info, prerequisites, schedule) {
  Course.call(this, name, info, prerequisites);
  this.schedule = schedule;
}

LiveCourse.prototype = Object.create(Course.prototype);

LiveCourse.prototype.getSchedule = function () {
  return this.schedule;
};

function Student(name, completedCourses = []) {
  this.name = name;
  this.completedCourses = completedCourses;
  this.progress = {};
}

Student.prototype.trackProgress = function (courseName, progress) {
  this.progress[courseName] = progress;
  console.log(`Progress for ${courseName}: ${progress}%`);
};

Student.prototype.completeCourse = function (courseName) {
  if (!this.completedCourses.includes(courseName)) {
    this.completedCourses.push(courseName);
    console.log(`Course completed: ${courseName}`);
  }
};

const courses = [
  new VideoCourse(
    "English",
    "Basic English course. No prerequisites required.",
    []
  ),
  new LiveCourse(
    "Science",
    "Intermediate Science course. Prerequisite: English.",
    ["English"],
    "Mon-Fri 10 AM"
  ),
  new VideoCourse("Maths", "Advanced Maths course. Prerequisite: Science.", [
    "Science",
  ]),
];

const student = new Student("John Doe", ["English"]);

function fetchCourses() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(courses);
    }, 1000);
  });
}

function fetchPrerequisites(course) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const missingPrerequisites = course.checkPrerequisites(
        student.completedCourses
      );
      resolve(missingPrerequisites);
    }, 1000);
  });
}

function renderCourses(courses) {
  const courseList = document.getElementById("courseList");
  const courseHTML = courses
    .map(
      (course) => `
        <div id="${course.name}" class="flex flex-col gap-2 p-4 items-center border rounded-lg cursor-pointer hover:bg-gray-200 transition-all">
        <img src="/assets/large-placeholder-course.png" width="64" alt="${course.name} />    
        <p class="font-semibold">${course.name}</p>
        </div>`
    )
    .join("");
  courseList.innerHTML = courseHTML;
}

function initCourses() {
  const courseList = document.getElementById("courseList");
  courseList.innerHTML = `<p class="animate-pulse">Loading courses...</p>`;

  fetchCourses()
    .then((courses) => {
      renderCourses(courses);
      courses.forEach((course) => {
        const courseElement = document.getElementById(course.name);
        if (courseElement) {
          courseElement.addEventListener("click", () =>
            displayCourseInfo(course)
          );
        }
      });
    })
    .catch(() => {
      courseList.innerHTML = `<p class="text-red-500">Failed to load courses.</p>`;
    });
}

function displayCourseInfo(course) {
  const courseInfo = document.getElementById("courseInfo");
  courseInfo.innerHTML = `
        <div class="flex flex-col gap-2">
            <p class="text-lg font-semibold">${course.name}</p>
            <p>${course.info}</p>
            <p class="text-sm text-gray-600">Prerequisites: ${
              course.prerequisites.join(", ") || "None"
            }</p>
            <button id="startButton" class="w-fit bg-gray-300 text-sm py-1 px-4 rounded">Start</button>
        </div>
    `;

  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", () => handleStartClick(course));
}

function handleStartClick(course) {
  const courseInfo = document.getElementById("courseInfo");
  courseInfo.innerHTML += `<p class="animate-pulse">Checking prerequisites...</p>`;

  fetchPrerequisites(course)
    .then((missingPrerequisites) => {
      if (missingPrerequisites.length > 0) {
        courseInfo.innerHTML = `
                    <p class="text-red-500">Cannot start the course. Missing prerequisites: ${missingPrerequisites.join(
                      ", "
                    )}</p>
                `;
        return Promise.reject("Missing prerequisites");
      }
      courseInfo.innerHTML = `<p>All prerequisites are met. Starting the course...</p>`;
      return course.startCourse();
    })
    .then(() => {
      student.trackProgress(course.name, 0);
      return navigateToInteractive(course.name);
    })
    .catch((error) => {
      console.error(error);
    });
}

function navigateToInteractive(courseName) {
  return new Promise((resolve) => {
    console.log(`Navigating to /interactive for course: ${courseName}`);
    setTimeout(() => {
      window.location.href = `/interactive`;
      resolve();
    }, 1000);
  });
}

initCourses();
