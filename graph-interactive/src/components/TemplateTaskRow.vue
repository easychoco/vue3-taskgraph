<template>
  <div class="flex flex-row mt-5 mb-2 space-x-1">
    <button
      @click="onAdd"
      class="border rounded-lg flex-shrink-0 px-1 h-8 bg-limeGreen"
    >
      追加
    </button>
    <TaskCard
      :edit="false"
      :task="templateTask"
      :fixed="true"
    />
      <draggable
        :list="createdTasks"
        :group="{ name: 'task', pull: 'clone', put: false }"
        item-key="uuid"
        class="flex flex-row flex-wrap content-around"
        handle="#card"
      >
        <template #item="{ element, index }">
          <div class="flex flex-row space-x-1 ml-4 mb-2">
            <TaskCard
              :detail="true"
              :error="isError[index]"
              :edit="element.isEdit"
              :task="createdTasks[index]"
              id="card"
            />
            <button
              @click="switchEdit(index)"
              class="border rounded-lg px-1 bg-yellow h-8"
              id="ignore"
            >
              {{ element.isEdit ? "終了" : "編集" }}
            </button>
            <button
              @click="onDelete(index)"
              class="border rounded-lg px-1 bg-pink h-8 ignore"
              id="ignore"
            >
              ×
            </button>
          </div>
        </template>
      </draggable>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs, watch } from "vue";
import TaskCard from "./TaskCard.vue";
import { Task } from "../api/models/task";
import _ from "lodash";
import draggable from "vuedraggable";

export default defineComponent({
  name: "MainPage",
  components: {
    TaskCard,
    draggable
  },
  props: {
    templateTask: {
      type: Object as PropType<Task>,
      required: true,
    },

    createdTasks: {
      type: Object as PropType<Task[]>,
      required: true,
    }
  },
  setup(props) {
    const { templateTask, createdTasks } = toRefs(props);

    const init = createdTasks.value.map(() => false);
    const isError = ref<boolean[]>(init);
    const xor = ref(0);

    watch(
      createdTasks,
      (val) => {
        isError.value = init;
        isError.value = val.map((task) => {
            const names = createdTasks.value.map((val) => val.name);
            return task.name.length === 0 || // 0文字 or 重複は NG
            _.indexOf(names, task.name) !== _.lastIndexOf(names, task.name)
          ;
        });
      },
      {
        immediate: true,
        deep: true,
      }
    )

    function onAdd() {
      createdTasks.value.push(templateTask.value.copy());
    }

    function onDelete(index: number) {
      createdTasks.value.splice(index, 1);
    }

    function switchEdit(index: number) {
      // toggle boolean
      createdTasks.value[index].isEdit = !createdTasks.value[index].isEdit;
    }

    return {
      isError,
      disabled: () => { xor.value > 0 },

      onAdd,
      onDelete,
      switchEdit,
    }
  },
});
</script>

<style lang="scss" scoped>
.sortable-chosen #ignore {
  display: none;
}
</style>