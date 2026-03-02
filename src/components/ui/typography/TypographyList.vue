<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <ul :class="cn('my-6 ml-6 list-disc [&>li]:mt-2', props.class)">
    <slot />
  </ul>
</template>
