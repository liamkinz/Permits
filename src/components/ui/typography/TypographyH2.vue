<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <h2
    :class="
      cn(
        'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
        props.class,
      )
    "
  >
    <slot />
  </h2>
</template>
