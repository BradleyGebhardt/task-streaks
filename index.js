// Fetch the tasks
const storedTasks = window.localStorage.getItem('tasks');
const tasks = storedTasks ? JSON.parse(storedTasks) : [];
/**
 * @type {HTMLInputElement | null}
 */
const taskName = document.querySelector('#name');

/**
 * @type {HTMLDivElement | null}
 */
const taskCount = document.querySelector('#count');

/**
 * @type {HTMLDivElement | null}
 */
const taskLast = document.querySelector('#last');

/**
 * @type {HTMLButtonElement | null}
 */
const taskincrement = document.querySelector('#increment');

if (tasks.length) {
    taskName.value = tasks[0]?.name;

} else {
    tasks[0] = {
        name: 'Unnamed task',
        streak: 0,
        date: new Date(),
    };

    taskName.value = tasks[0].name;
}

for (const task of tasks) {
    const date = new Date(task.date);
    const hours = Math.abs(new Date() - date) / 3.6e6;

    if (hours > 24) {
        task.streak = 0;
    }
}

taskCount.innerHTML = tasks[0].streak;
taskLast.innerHTML = `Last update: ${new Date(tasks[0].date).toLocaleString()}`;

save();

taskName.onchange = (event) => {
    tasks[0].name = event.target.value;

    save();
};

taskincrement.onclick = () => {
    increment();

    save();
};

function increment() {
    tasks[0].streak += 1;
    tasks[0].date = new Date();

    taskCount.innerHTML = tasks[0].streak;
    taskLast.innerHTML = `Last update: ${new Date(tasks[0].date).toLocaleString()}`;
}

function save() {
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
}