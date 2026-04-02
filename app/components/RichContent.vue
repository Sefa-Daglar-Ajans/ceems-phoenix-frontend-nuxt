<script setup lang="ts">
const props = defineProps<{
  content: string
}>()

const iframeRef = ref<HTMLIFrameElement | null>(null)
const iframeHeight = ref(300)
const nonce = Math.random().toString(36).slice(2)

const isFullDocument = computed(() => {
  const c = props.content
  return (
    c.includes('<!DOCTYPE')
    || c.includes('<html')
    || c.includes('<style')
    || c.includes('<script')
  )
})

const srcdoc = computed(() => {
  const resizeScript = `
<script>
  (function(){
    var nonce = "${nonce}";
    function send(){
      var h = document.documentElement.scrollHeight;
      parent.postMessage({ type:"rich-content-resize", nonce:nonce, height:h }, "*");
    }
    new ResizeObserver(send).observe(document.body);
    window.addEventListener("load", send);
    send();
  })();
<\/script>`

  if (props.content.includes('</body>')) {
    return props.content.replace('</body>', resizeScript + '</body>')
  }
  return props.content + resizeScript
})

function onMessage(e: MessageEvent) {
  if (
    e.data?.type === 'rich-content-resize'
    && e.data?.nonce === nonce
    && typeof e.data?.height === 'number'
  ) {
    iframeHeight.value = e.data.height
  }
}

onMounted(() => {
  window.addEventListener('message', onMessage)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', onMessage)
})
</script>

<template>
  <div v-if="isFullDocument" class="layout-container">
    <iframe
      ref="iframeRef"
      :srcdoc="srcdoc"
      :style="{ height: iframeHeight + 'px' }"
      class="w-full border-0 overflow-hidden"
      sandbox="allow-scripts"
    />
  </div>
  <div v-else class="layout-container max-w-4xl prose prose-lg" v-html="content" />
</template>
