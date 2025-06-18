<template>
  <Card>
    <template #header>
      <img v-if="product.images[0]" :src="product.images[0]" :alt="product.title" />
      <div v-else class="placeholder"></div>
    </template>

    <template #title>
      <p class="min-h-[60px] line-clamp-3">
        {{ product.title }}
      </p>
    </template>

    <template #subtitle>
      <Chip :label="formatCategory(product.category)" />
    </template>

    <template #content>
      <div class="font-bold text-lg">$ {{ product.price }}</div>
      <p class="m-0 line-clamp-3">
        {{ product.description }}
      </p>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { Product } from '../types/product'
import { formatCategory } from '../utils/formatCategory'

defineProps<{
  product: Product
}>()
</script>

<style>
.placeholder {
  background-color: #d3d3d3;
  width: 100%;
  height: 303px;
  border-radius: 12px 12px 0 0;
}
</style>