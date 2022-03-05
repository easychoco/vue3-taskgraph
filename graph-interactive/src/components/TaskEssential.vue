<template>
  <div
    class="border rounded-md p-1 font-bold"
    :style="{
      width: '200px',
      backgroundColor: fixed ? '#CCCCCC' : error ? '#FF2222' : '#FFFFFF',
      fontWeight: fixed ? 700 : 'normal'
    }"
  >
    <div class="flex flex-row space-x-3">
      <div
        class="rounded-full border-none w-5 h-5 flex justify-center items-center bg-red text-white text-xl"
        :style="{ backgroundColor: 'rgba('+ String(255 * task.cost / 8) +', 100, 100)' }"
      >
        {{ task.cost }}
      </div>
      <div
        v-if="edit"
        class="border-b-2"
      >
        <input
          v-model="task.name"
          :placeholder="'タスク名 (' + task.difficulty + ')'"
          class="border-none outline-none bg-transparent"
          :style="{ width: '160px' }"
        />
      </div>
      <div v-else>
        {{ task.name }}
      </div>
    </div>
  </div>
  <div
    v-if="edit"
    class="flex-col"
  >
    <div class="flex flex-row">
      <div class="w-12">
        詳細：
      </div>
      <input
        v-model="task.description"
        placeholder="詳細"
        class="border-b outline-none"
        :style="{ width: '150px' }"
      />
    </div>
    <div class="flex flex-row">
      <div class="w-12">
        メモ：
      </div>
      <textarea
        v-model="rawNote"
        placeholder="詳細"
        class="border-b outline-none"
        :style="{ width: '150px' }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs, watch } from "vue";
import { Task } from '../api/models/task'

export default defineComponent({
  name: "TaskEssential",
  props: {

    task: {
      type: Object as PropType<Task>,
      required: true,
    },

    edit: {
      type: Boolean,
      required: true,
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
  },
  setup(props) {
    const { task } = toRefs(props);
    const rawNote = ref(task.value.notes?.join('\n'));

    watch(
      rawNote,
      (val) => task.value.notes = val?.split('\n')
    );

    return {
      rawNote
    }
  }
});
</script>
