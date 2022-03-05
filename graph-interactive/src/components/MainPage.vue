<template>
  <GlobalHeader
    :original-tasks="createdTasks"
    :directed-tasks="directedTasks"
    :opening-dialog="openingDialog"
    :on-dialog="flipDialog"
  />

  <div class="m-3">
    <div :style="{ minHeight: '400px' }">
      <GraphCanvas
        :list="directedTasks"
        :on-dialog="flipDialog"
      />
    </div>

    <div
      v-for="(task, index) in templateTasks"
      :key="index"
      class="pb-1"
    >
      <TemplateTaskRow
        :template-task="task"
        :created-tasks="createdTasks[index]"
      />
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import GlobalHeader from "./GlobalHeader.vue";
import GraphCanvas from "./GraphCanvas.vue";
import TaskCard from "./TaskCard.vue";
import TemplateTaskRow from "./TemplateTaskRow.vue";
import { Task, Difficulty } from "../api/models/task"
import input from '../assets/io/input/input.taskgraph.json'

export default defineComponent({
  name: "MainPage",
  components: {
    GlobalHeader,
    GraphCanvas,
    TaskCard,
    TemplateTaskRow,
  },
  setup() {
    const task0 = ref(new Task(
      'included',
      'included',
    ));

    const task1 = ref(new Task(
      'easy',
      'easy',
    ));

    const task2 = ref(new Task(
      'light',
      'light',
    ));

    const task3 = ref(new Task(
      'normal',
      'normal',
    ));

    const task4 = ref(new Task(
      'heavy',
      'heavy',
    ));

    const task5 = ref(new Task(
      'hard',
      'hard',
    ));

    const templateTasks = ref([
      task0.value,
      task1.value,
      task2.value,
      task3.value,
      task4.value,
      task5.value
    ]);

    const createdTasks = ref<Task[][]>(
      templateTasks.value.map((val) => [])
    );

    const directedTasks = ref<Task[][]>([[]]);
    directedTasks.value[0] = input.tasks.map((val) => {
        const task = new Task(
        val.name,
        val.difficulty as Difficulty,
        val.description,
        val.depends,
        val.notes,
      );
      createdTasks.value[task.index].push(task);
      return task;
    });

    const openingDialog = ref(false);
    function flipDialog() {
      openingDialog.value = !openingDialog.value;
    }

    return {
      directedTasks,
      templateTasks,
      createdTasks,
      openingDialog,
      flipDialog,
    }
  },
});
</script>
