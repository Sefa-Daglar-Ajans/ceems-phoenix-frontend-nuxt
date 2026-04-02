<script setup lang="ts">
const props = defineProps<{
  content: string
}>()

const iframeRef = ref<HTMLIFrameElement | null>(null)
const iframeHeight = ref(300)

const isFullDocument = computed(() => {
  const c = props.content
  return (
    c.includes('<!DOCTYPE') ||
    c.includes('<html') ||
    c.includes('<style') ||
    c.includes('<script')
  )
})

function syncHeight() {
  const iframe = iframeRef.value
  if (!iframe?.contentDocument?.body) return
  const height = iframe.contentDocument.documentElement.scrollHeight
  if (height > 0) iframeHeight.value = height
}

function onIframeLoad() {
  syncHeight()
  const observer = new MutationObserver(syncHeight)
  if (iframeRef.value?.contentDocument?.body) {
    observer.observe(iframeRef.value.contentDocument.body, {
      childList: true,
      subtree: true,
      attributes: true,
    })
  }
  const images = iframeRef.value?.contentDocument?.querySelectorAll('img') ?? []
  for (const img of images) {
    img.addEventListener('load', syncHeight)
  }
}
</script>

<template>
  <div v-if="isFullDocument" class="layout-container">
    <iframe
      ref="iframeRef"
      :srcdoc="content"
      :style="{ height: iframeHeight + 'px' }"
      class="w-full border-0 overflow-hidden"
      sandbox="allow-scripts allow-same-origin"
      @load="onIframeLoad"
    />
  </div>
  <div v-else class="layout-container max-w-4xl prose prose-lg" v-html="content" />
</template>
