<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <h1
    :class="
      cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        props.class,
      )
    "
  >
    <slot />
  </h1>
</template>
