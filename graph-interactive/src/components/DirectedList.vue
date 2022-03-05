<template>
  <div
    class="m-3 p-6 border-2 rounded-lg border-gray-light"
    :style="{ minWidth: '100px' }"
  >
    <div class="flex flex-col">
      <draggable
        :list="list"
        group="task"
        item-key="uuid"
        class="space-y-2"
      >
        <template #header>
          <div class="text-yellow">
            first
          </div>
        </template>
        <template #item="{ element }">
          <TaskCard
            :task="element"
          />
        </template>
        <template #footer>
          <div class="text-yellow">
            last
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { defineComponent, PropType, toRefs } from "vue";
import draggable from "vuedraggable";
import { Task } from '../api/models/task'
import TaskCard from "./TaskCard.vue";

export default defineComponent({
  name: "DirectedList",
  components: {
    TaskCard,
    draggable
  },
  props: {
    list: {
      type: Array as PropType<Task[]>,
      required: true,
    }
  }
});
</script>
