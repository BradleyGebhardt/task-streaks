<template>
    <v-app>
        <v-main class="bg-blue-darken-4">
            <router-view />
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { useData } from '@/composables/useData';
import { onMounted } from 'vue';

const { fetchTasks } = useData();

onMounted(() => {
    fetchTasks();
});
</script>
