<template>
  <div
    class="m-3 p-6 border-2 rounded-lg border-pink"
    :style="{ minWidth: '252px' }"
  >
    <div class="flex flex-col">
      <draggable
        :list="list"
        group="task"
        item-key="uuid"
        @add="onAdd"
        class="space-y-2 b-3"
      >
        <template #header>
          <div class="text-yellow">
            いらないのはココへ
          </div>
        </template>
        <template #item="{ element }">
          <TaskCard
            :task="element"
          />
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { defineComponent, ref } from "vue";
import draggable from "vuedraggable";
import { Task } from '../api/models/task'
import TaskCard from "./TaskCard.vue";

export default defineComponent({
  name: "RemoveArea",
  components: {
    TaskCard,
    draggable
  },
  setup() {
    const list = ref<Task[]>([]);

    function onAdd() {
      list.value = _
        .chain(list.value)
        .uniqBy('name')
        .sortBy('index', 'name')
        .value()
      ;
    }

    return {
      list,
      onAdd
    }
  }
});
</script>
