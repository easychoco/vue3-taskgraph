<template>
  <div class="h-full bg-gray-dark border-8 border-limeGreen rounded-3xl">
    <div class="flex flex-row flex-wrap">

      <RemoveArea />

      <div
        v-for="(tasks, index) in list"
        :key="index"
      >
        <DirectedList
          :list="tasks"
        />
      </div>
      <div class="flex flex-col">
        <button
          class="mx-6 my-3 border rounded-lg bg-limeGreen h-8 w-40 text-center"
          @click="onAdd"
        >
          追加
        </button>
        <button
          class="mx-6 border rounded-lg bg-yellow h-8 w-40 text-center"
          @click="onDialog()"
        >
          確認
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, watch, PropType, toRefs } from "vue";
import draggable from "vuedraggable";
import { Task } from "../api/models/task";
import TaskCard from "./TaskCard.vue";
import DirectedList from "./DirectedList.vue";
import RemoveArea from "./RemoveArea.vue";
import _ from "lodash";

export default defineComponent({
  name: "GraphCanvas",
  components: {
    TaskCard,
    DirectedList,
    RemoveArea,
    draggable
  },
  props: {
    list: {
      type: Array as PropType<Task[][]>,
      required: true,
    },

    onDialog: {
      type: Function,
      required: true,
    }
  },
  emits: [
    'update:opening-dialog'
  ],
  setup(props, { emit }) {

    // d3-graph-controller を使おうと思ったけれど、
    // エッジの張り直しができなくてやめた

    const { list } = toRefs(props);

    function onAdd() {
      list.value.push([new Task()]);
    }

    watch(
      list.value,
      (val) => {
        const zeroIdx = _.findIndex(val, (arr) => arr.length == 0);
        if (zeroIdx >= 0) {
          list.value.splice(zeroIdx, 1);
        }
      },
      {
        immediate: true
      }
    )

    return {
      list,
      onAdd
    }
  },
});
</script>
