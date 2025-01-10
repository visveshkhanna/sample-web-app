# Sample EdTech Application

This is a sample EdTech application that allows users to browse and start courses, solve interactive problems, and track their progress.

## Getting Started

### Prerequisites

- A web browser
- A local server to serve the HTML files (e.g., [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for Visual Studio Code)

### Running the Application

1. Clone the repository or download the source code.
2. Open the project in Visual Studio Code.
3. Use the Live Server extension to serve the project.
4. Open your browser and navigate to `http://127.0.0.1:5500` (or the address provided by Live Server).

### File Descriptions

- `index.html`: The main entry point of the application.
- `assets/index.html`: Placeholder for assets.
- `courses/index.html`: The page that lists all available courses.
- `courses/courses.js`: Contains the logic for fetching and displaying courses, checking prerequisites, and navigating to the interactive problem-solving page.
- `interactive/index.html`: The page for solving interactive problems.
- `interactive/interactive.js`: Contains the logic for generating questions, handling answer submissions, and providing feedback.
- `user/index.html`: The user profile page.
- `user/user.js`: Contains the logic for displaying and updating user progress.

### Key Functions

#### `courses/courses.js`

- `fetchCourses()`: Fetches the list of courses.
- `fetchPrerequisites(course)`: Fetches the prerequisites for a given course.
- `renderCourses(courses)`: Renders the list of courses.
- `initCourses()`: Initializes the courses page.
- `displayCourseInfo(course)`: Displays information about a selected course.
- `handleStartClick(course)`: Handles the start button click event for a course.
- `navigateToInteractive(courseName)`: Navigates to the interactive problem-solving page.

#### `interactive/interactive.js`

- `getRandomNumber(min, max)`: Generates a random number between `min` and `max`.
- `generateQuestion()`: Generates a random math question.
- `simulateFeedback(answer, correctAnswer)`: Simulates feedback for a given answer.
- `clearOldQuestions()`: Clears old questions from the history.
- `handleAnswerSubmission()`: Handles the answer submission event.
- `displayQuestion()`: Displays a new question.
- `showCompletionOption()`: Shows the course completion option.
- `emitCourseCompletionEvent()`: Emits a course completion event.

#### `user/user.js`

- `userProxy`: A proxy object for the user to handle validation.
- Event listeners for updating user progress.

## License

This project is licensed under the MIT License.