<template>
  <div v-if="detail && !edit">
    <VTooltip
      placement="top-start"
      :arrow-padding="80"
    >
      <TaskEssential
        :task="task"
        :edit="false"
        :error="error"
      />
      <template #popper>
        <div
          v-if="task.description"
          class="border-b border-dashed "
        >
            {{ task.description }}
        </div>
        <div
          v-if="task.notes"
          class="flex flex-col"
        >
          <div
            v-for="(text, index) in task.notes"
            :key="index"
          >
            ・{{ text }}
          </div>
        </div>
      </template>
    </VTooltip>
  </div>
  <div v-else>
    <TaskEssential
      :task="task"
      :edit="edit"
      :fixed="fixed"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Task } from '../api/models/task'
import TaskEssential from "./TaskEssential.vue";

export default defineComponent({
  name: "TaskCard",
  components: {
    TaskEssential
  },
  props: {

    task: {
      type: Object as PropType<Task>,
      required: true,
    },

    detail: {
      type: Boolean,
      required: false,
      default: false,
    },

    edit: {
      type: Boolean,
      required: false,
      default: false,
    },

    error: {
      type: Boolean,
      required: false,
      default: false,
    },

    fixed: {
      type: Boolean,
      required: false,
      default: false,
    }
  }
});
</script>
