<template>
  <span :class="[prefixCls, collapsed ? 'is-collapsed' : '']"><IconHamburger /></span>
</template>

<script setup lang="ts">
import IconHamburger from '~icons/icon-park-outline/indent-right'
import { useDesign } from '/@/composables/core/useDesign'

defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
})

const { prefixCls } = useDesign('app-hamburger')
</script>

<style lang="scss" scoped>
@use '/@/styles/mixins.scss' as *;
@use '/@/styles/var.scss';

$prefixCls: #{var.$namespace}-app-hamburger;

.#{$prefixCls} {
  transition: transform var.$transition-duration;

  @include when(is-collapsed) {
    transform: rotate(180deg);
  }
}
</style>
