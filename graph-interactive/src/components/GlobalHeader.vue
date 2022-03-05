<template>
  <div class="w-full h-20 p-5 border-b-4 border-pink bg-white">
    この開発は {{ total }} 時間かかるだろう
  </div>
  <div
    v-if="openingDialog"
    id="dialog"
    class="pl-10 py-3 overflow-auto bg-white border-2 border-black rounded-lg"
  >  
    <VDropdown
      placement="right"
    >
      <button
        @click="copyToClipboard"
        class="border rounded-md px-2 bg-gray-light text-black hover:bg-gray-dark hover:text-white"
      >
        copy
      </button>
      <template #popper>
        コピーしました
      </template>
    </VDropdown>
    <div     class="overflow-auto"
        :style="{
          maxHeight: '400px',
          maxWidth: '400px',
         }">
    <pre>{{ taskgraph }}</pre>
        </div>
    <button
      class="mx-6 border rounded-lg bg-pink h-8 w-40 text-center"
      @click="onDialog()"
    >
      閉じる
    </button>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { defineComponent, PropType, ref, toRefs, watch } from "vue";
import draggable from "vuedraggable";
import { Essential, Task } from '../api/models/task'
import TaskCard from "./TaskCard.vue";

export default defineComponent({
  name: "DirectedList",
  components: {
    TaskCard,
    draggable
  },
  props: {
    originalTasks: {
      type: Array as PropType<Task[][]>,
      required: true
    },

    directedTasks: {
      type: Array as PropType<Task[][]>,
      required: true,
    },

    openingDialog: {
      type: Boolean,
      required: true,
    },

    onDialog: {
      type: Function,
      required: true,
    }
  },
  setup(props) {
    const { originalTasks, directedTasks } = toRefs(props);
    const total = ref(0);

    const taskgraph = ref<{ tasks: Essential[] }>({tasks: []});
    const node = ref<{ [key: string]: Task }>({});

    watch(
      originalTasks.value,
      (tasks) => {
        total.value = tasks.reduce((acc, val) => 
          acc + (val.length === 0 ? 0:
                val.length * val[0].cost)
          , 0)
        ;
        const flatten = tasks.flat();
        taskgraph.value = { tasks: flatten.map((v) => v.jsonObject) };
        node.value = _.mapKeys(flatten, (v) => v.name);
      },
      {
        immediate: true,
        deep: true,
      }
    );

    watch(
      directedTasks.value,
      (tasks) => {
        taskgraph.value.tasks.forEach((val) => {
          val.depends = [];
        });

        tasks.forEach((val) => {
          if (val.length <= 1) return;
          const names = val.map((t) => t.name);
          for (let i = 1; i < names.length; i += 1) {
            taskgraph.value.tasks.find((t) => t.name === names[i])?.depends?.push(names[i - 1]);
          }
        });
      },
      {
        immediate: true,
        deep: true,
      }
    )

    function copyToClipboard() {
      navigator.clipboard.writeText(JSON.stringify(taskgraph.value, null, 2))
      .then(() => {
        console.log("copied!")
      })
      .catch(e => {
        console.error(e)
      })
    }

    return {
      node,
      total,
      taskgraph,
      copyToClipboard
    }
  }
});
</script>

<style scoped lang="scss">
// 中央にだす
#dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>