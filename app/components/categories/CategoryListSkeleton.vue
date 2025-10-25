<template>
  <div class="flex flex-col gap-y-3 max-h-96 overflow-y-auto scrollbar-custom">
    <div class="w-24 h-4 bg-zinc-200 animate-pulse"></div>
    <div class="flex flex-col gap-y-2">
      <div
        v-for="i in 8"
        :key="i"
        class="w-full flex items-center justify-between py-1"
      >
        <div class="w-2/3 h-4 bg-zinc-200 animate-pulse"></div>
        <div class="w-4 h-4 bg-zinc-200 animate-pulse rounded"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
