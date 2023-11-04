import { ref, watch } from "vue";

export interface Task {
    name: string;
    date: Date;
    streak: number;
}

export const KEY = 'TASKS';

const TASKS = ref<Task[]>([]);

export function useData() {
    watch(TASKS, (tasks) => {
        window.localStorage.setItem(KEY, JSON.stringify(tasks));
    }, { deep: true });

    function fetchTasks() {
        const tasks = window.localStorage.getItem(KEY);

        if (tasks) {
            TASKS.value = JSON.parse(tasks).map((task: Task) => {
                task.date = new Date(task.date);
                const hours = Math.abs(+task.date - +new Date()) / 3.6e6;

                if (hours > 24) {
                    task.streak = 0;
                }

                return task;
            });
        }
    }

    function addTask() {
        TASKS.value.push({
            name: `New Task ${TASKS.value.length + 1}`,
            date: new Date(),
            streak: 0,
        });
    }

    function incrementTaskStreak(task: Task) {
        task.streak++;
        task.date = new Date();
    }

    return {
        TASKS,
        fetchTasks,
        addTask,
        incrementTaskStreak,
    }
}