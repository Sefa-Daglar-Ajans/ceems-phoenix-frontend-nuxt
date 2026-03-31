<script setup lang="ts">
interface Props {
  badge?: string
  title: string
  titleHighlight?: string
  description?: string
}

defineProps<Props>()
</script>

<template>
  <section class="bg-gray-900 text-white py-24 relative overflow-hidden">
    <div class="layout-container relative z-10" :class="$slots.default ? '' : 'text-center'">
      <span v-if="badge" class="text-brand-500 font-bold tracking-widest uppercase mb-4 block">
        {{ badge }}
      </span>
      <h1 class="text-4xl lg:text-6xl font-bold mb-8 uppercase tracking-tighter">
        <slot name="title">
          {{ title }}
          <br v-if="titleHighlight">
          <span v-if="titleHighlight" class="text-brand-400">{{ titleHighlight }}</span>
        </slot>
      </h1>
      <p v-if="description" class="max-w-2xl text-gray-400 text-lg leading-relaxed" :class="{ 'mx-auto': !$slots.default }">
        {{ description }}
      </p>
      <slot />
    </div>
    <div class="absolute inset-0 bg-brand-500/10 mix-blend-overlay" />
  </section>
</template>
