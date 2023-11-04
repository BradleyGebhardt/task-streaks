<template>
    <v-container class="text-h3 text-center fill-height">
        <v-row v-if="currentTask >= 0">
            <v-col>
                <v-window v-model="currentTask">
                    <v-window-item v-for="(task, i) in TASKS" :key="'window' + task.date.toDateString()" :value="i">
                        <v-text-field v-model="task.name" name="Task name"></v-text-field>
                        <p>{{ task.streak }}</p>
                        <p class="text-h6">Last update: {{ task.date.toLocaleString() }}</p>
        
                        <v-btn color="green-darken-3" @click="incrementTaskStreak(task)">
                            Log Streak
                        </v-btn>
                    </v-window-item>
                </v-window>
            </v-col>
        </v-row>

        <v-row v-else>
            <v-col>
                Number of tasks: {{ TASKS.length }}
            </v-col>
        </v-row>

        <v-bottom-navigation v-model="currentTask" class="bg-indigo-darken-4" elevation="2" grow>
            <v-btn v-for="(task, i) in TASKS" :key="task.name + task.date.toDateString()" :value="i">
                <v-icon>mdi-clipboard</v-icon>

                <span>{{ task.name }}</span>
            </v-btn>

            <v-btn value="add" @click="add">
                <v-icon>mdi-plus</v-icon>

                <span>Add Task</span>
            </v-btn>
        </v-bottom-navigation>
    </v-container>
</template>

<script lang="ts" setup>
import { useData } from '@/composables/useData';
import { onMounted } from 'vue';
import { ref } from 'vue';

const { TASKS, addTask, incrementTaskStreak } = useData();

const currentTask = ref();

onMounted(() => {
    if (TASKS.value.length) {
        currentTask.value = 0;
    }
});

function add() {
    addTask();

    currentTask.value = TASKS.value.length - 1;
}
</script>
