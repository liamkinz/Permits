<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <h4
    :class="cn('scroll-m-20 text-xl font-semibold tracking-tight', props.class)"
  >
    <slot />
  </h4>
</template>
