<script setup lang="ts">
import axios from 'axios'

import type { Product, ProductApiResponse, Category } from './types/product'
import { ref, onMounted, watch } from 'vue'
import { useToast } from 'primevue/usetoast'

import ProductCard from './components/ProductCard.vue'

const toast = useToast()
const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const selectedCategories = ref<string | null>(null)
const searchQuery = ref<string | null>('')
const totalRecords = ref(0)
const sortOrder = ref<'asc' | 'desc' | null>(null)
const isLoading = ref<boolean>(false)

const first = ref(0)
const rows = ref(6)

const sortOptions = [
  { label: 'Do not sort', value: null },
  { label: 'From low to high', value: 'asc' },
  { label: 'From high to low', value: 'desc' },
]

const loadProducts = async () => {
  try {
    isLoading.value = true
    let url = `https://dummyjson.com/products?limit=${rows.value}&skip=${first.value}`

    if (sortOrder.value) {
      url += `&sortBy=price&order=${sortOrder.value}`
    }
    const response = await axios.get<ProductApiResponse>(url)
    products.value = response.data.products
    totalRecords.value = response.data.total
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Products loaded successfully.',
      life: 5000
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Loading Failed',
      detail: 'Unable to fetch products. Please try again later.',
      life: 5000
    })
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const searchProduct = async () => {
  try {
    isLoading.value = true
    let url = `https://dummyjson.com/products/search?q=${searchQuery.value}`

    if (sortOrder.value) {
      url += `&sortBy=price&order=${sortOrder.value}`
    }
    const response = await axios.get<ProductApiResponse>(url)
    products.value = response.data.products
    totalRecords.value = response.data.total
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Loading Failed',
      detail: 'Unable to search products. Please try again later.',
      life: 5000
    })
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const productsCategory = async () => {
  try {
    isLoading.value = true
    const response = await axios.get('https://dummyjson.com/products/categories')
    console.log('categories', response)
    categories.value = response.data
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Loading Failed',
      detail: 'Unable to fetch categories. Please try again later.',
      life: 5000
    })
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const loadProductsCategory = async () => {
  try {
    isLoading.value = true
    let url = `https://dummyjson.com/products/category/${selectedCategories.value}?limit=${rows.value}&skip=${first.value}`
    if (sortOrder.value) {
      url += `&sortBy=price&order=${sortOrder.value}`
    }
    const response = await axios.get<ProductApiResponse>(url)
    products.value = response.data.products
    totalRecords.value = response.data.total
  } catch (error) {
      toast.add({
      severity: 'error',
      summary: 'Loading Failed',
      detail: 'Unable to fetch category. Please try again later.',
      life: 5000
    })
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const handleSortChange = async () => {
  if (selectedCategories.value) {
    await loadProductsCategory()
  } else if (searchQuery.value) {
    await searchProduct()
  } else {
    await loadProducts()
  }
}

watch([first, rows, selectedCategories], async () => {
  if (selectedCategories.value) {
    await loadProductsCategory()
  } else if (searchQuery.value) {
    searchProduct()
  } else {
    await loadProducts()
  }
})

onMounted(loadProducts)
onMounted(productsCategory)
</script>

<template>
  <Toast />
  <div class="flex items-center justify-between py-8">
    <IconField class="w-max">
        <InputIcon class="pi pi-search" />
        <InputText v-model="searchQuery" name="search" type="text" placeholder="Search Products" @input="searchProduct" />
    </IconField>
    <div class="flex items-center gap-4 my-4">
      <label for="sort" class="font-medium"></label>
      <Select
        id="sort"
        v-model="sortOrder"
        :options="sortOptions"
        optionLabel="label"
        optionValue="value"
        @change="handleSortChange"
        placeholder="Sort by price..."
        class="min-w-[187px]"
      />
    </div>
  </div>
  <div class="flex gap-4">
      <div class="flex justify-start min-w-[250px]">
          <div class="flex flex-col gap-3">
              <div v-for="category of categories" :key="category.slug" class="flex items-start gap-2">
                  <RadioButton v-model="selectedCategories" :inputId="category.slug" name="category" :value="category.slug" />
                  <label :for="category.slug">{{ category.name }}</label>
              </div>
          </div>
      </div>
      <div
        v-if="!isLoading"
        class="product-grid"
      >
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
        <!-- <Card
          v-for="product in products"
          :key="product.id"
        >
            <template #header>
                <img :src="product.images[0]" :alt="product.title" />
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
            <template #footer>
                <div class="flex gap-4 mt-1">
                    <Button label="Add to Cart" class="w-full" />
                </div>
            </template>
        </Card> -->
      </div>
      <div
        v-if="isLoading"
        class="flex justify-center min-w-[950px]"
      >
        <ProgressSpinner class="custom-spinner" />
      </div>
  </div>
  <div class="my-4 flex justify-center">
    <Paginator
      :rows="rows"
      :first="first"
      :totalRecords="totalRecords"
      @update:first="val => first = val"
      @update:rows="val => rows = val"
      template="PrevPageLink PageLinks NextPageLink"
    />
  </div>
</template>

<style>
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.custom-spinner svg circle {
  stroke: #10b981 !important;
}
</style>
