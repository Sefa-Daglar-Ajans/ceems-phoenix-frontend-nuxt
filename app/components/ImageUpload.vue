<script setup lang="ts">
import axios from 'axios'
import { api } from '~/utils/api'

export interface UploadedImage {
  url: string
  alt?: string
  sortOrder: number
}

const model = defineModel<UploadedImage[]>({ default: () => [] })

const isDragging = ref(false)
const isUploading = ref(false)
const uploadProgress = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

function openFilePicker() {
  fileInput.value?.click()
}

async function handleFiles(files: FileList | File[]) {
  const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'))
  if (!fileArray.length) return

  isUploading.value = true
  uploadProgress.value = `${fileArray.length} dosya yükleniyor...`

  try {
    const formData = new FormData()
    for (const file of fileArray) {
      formData.append('files', file)
    }

    const { data } = await api().post<{ images: { url: string; originalName: string }[] }>(
      '/uploads/images',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    )

    const currentLength = model.value.length
    const newImages: UploadedImage[] = data.images.map((img, i) => ({
      url: img.url,
      alt: img.originalName.replace(/\.[^/.]+$/, ''),
      sortOrder: currentLength + i,
    }))

    model.value = [...model.value, ...newImages]
    uploadProgress.value = ''
  }
  catch (err) {
    if (axios.isAxiosError(err)) {
      uploadProgress.value = err.response?.data?.message || 'Yükleme başarısız oldu'
    }
    else {
      uploadProgress.value = 'Yükleme başarısız oldu'
    }
  }
  finally {
    isUploading.value = false
    if (fileInput.value) fileInput.value.value = ''
  }
}

function handleDrop(e: DragEvent) {
  isDragging.value = false
  if (e.dataTransfer?.files) {
    handleFiles(e.dataTransfer.files)
  }
}

function handleInputChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files) {
    handleFiles(target.files)
  }
}

function removeImage(index: number) {
  const updated = model.value.filter((_, i) => i !== index)
  updated.forEach((img, i) => { img.sortOrder = i })
  model.value = updated
}

function moveImage(from: number, to: number) {
  if (to < 0 || to >= model.value.length) return
  const arr = [...model.value]
  const [item] = arr.splice(from, 1)
  arr.splice(to, 0, item!)
  arr.forEach((img, i) => { img.sortOrder = i })
  model.value = arr
}
</script>

<template>
  <div class="space-y-3">
    <input
      ref="fileInput"
      type="file"
      accept="image/jpeg,image/png,image/webp,image/gif"
      multiple
      class="hidden"
      @change="handleInputChange"
    >

    <div
      class="relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer"
      :class="[
        isDragging ? 'border-brand-500 bg-brand-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50',
        isUploading ? 'pointer-events-none opacity-60' : '',
      ]"
      @click="openFilePicker"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <UIcon
        :name="isUploading ? 'i-heroicons-arrow-path' : 'i-heroicons-cloud-arrow-up'"
        :class="['size-10 mx-auto mb-2 text-gray-400', isUploading ? 'animate-spin' : '']"
      />
      <p class="text-sm text-gray-600 font-medium">
        {{ isUploading ? uploadProgress : 'Görselleri sürükleyip bırakın veya tıklayın' }}
      </p>
      <p class="text-xs text-gray-400 mt-1">JPEG, PNG, WebP, GIF — Maks 5 MB / dosya</p>
    </div>

    <p v-if="!isUploading && uploadProgress" class="text-sm text-red-500">{{ uploadProgress }}</p>

    <div v-if="model.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      <div
        v-for="(img, i) in model"
        :key="img.url"
        class="group relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-100"
      >
        <img
          :src="img.url"
          :alt="img.alt || ''"
          class="w-full h-full object-cover"
        >

        <div v-if="i === 0" class="absolute top-1.5 left-1.5">
          <UBadge color="primary" size="xs">Kapak</UBadge>
        </div>

        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
          <UButton
            v-if="i > 0"
            icon="i-heroicons-chevron-left"
            size="xs"
            color="neutral"
            variant="solid"
            class="rounded-full"
            @click.stop="moveImage(i, i - 1)"
          />
          <UButton
            icon="i-heroicons-trash"
            size="xs"
            color="error"
            variant="solid"
            class="rounded-full"
            @click.stop="removeImage(i)"
          />
          <UButton
            v-if="i < model.length - 1"
            icon="i-heroicons-chevron-right"
            size="xs"
            color="neutral"
            variant="solid"
            class="rounded-full"
            @click.stop="moveImage(i, i + 1)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
