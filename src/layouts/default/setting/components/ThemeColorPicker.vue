<template>
  <div class="flex flex-wrap justify-around">
    <template v-for="color in colorList" :key="color">
      <span
        class="inline-block relative w-4 h-4 cursor-pointer relative text-xs leading-4 text-center border border-gray-200"
        :style="{ backgroundColor: color }"
        @click="handleClick(color)"
      >
        <IconCheck v-if="cursor === color" class="text-gray-200" />
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import IconCheck from '~icons/ic/twotone-check'

const emit = defineEmits<{ (e: 'change', color: string): void }>()

defineProps({
  colorList: {
    type: Array as PropType<Array<string>>,
    default: () => []
  },
  cursor: {
    type: String,
    required: true
  }
})

function handleClick(color: string) {
  emit('change', color)
}
</script>
