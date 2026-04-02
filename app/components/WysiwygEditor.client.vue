<script setup lang="ts">
import tinymce from 'tinymce/tinymce'
import 'tinymce/icons/default/icons.min.js'
import 'tinymce/themes/silver/theme.min.js'
import 'tinymce/models/dom/model.min.js'

import 'tinymce/skins/ui/oxide/skin.css'
import contentUiCss from 'tinymce/skins/ui/oxide/content.css?inline'
import contentCss from 'tinymce/skins/content/default/content.css?inline'

import 'tinymce/plugins/accordion'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/emoticons/js/emojis.js'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/help'
import 'tinymce/plugins/image'
import 'tinymce/plugins/importcss'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/quickbars'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/table'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/wordcount'

import Editor from '@tinymce/tinymce-vue'

if (typeof window !== 'undefined') {
  ;(window as any).tinymce = tinymce
}

const model = defineModel<string>({ default: '' })

defineProps<{
  placeholder?: string
}>()

const mode = ref<'wysiwyg' | 'html'>('wysiwyg')
const htmlSource = ref('')
const previewHeight = ref(300)
const previewRef = ref<HTMLIFrameElement | null>(null)
const nonce = Math.random().toString(36).slice(2)

const isFullDocument = computed(() => {
  const c = model.value
  return c.includes('<!DOCTYPE') || c.includes('<html') || c.includes('<head')
})

function switchToHtml() {
  htmlSource.value = model.value
  mode.value = 'html'
}

function switchToWysiwyg() {
  model.value = htmlSource.value
  mode.value = 'wysiwyg'
}

function onHtmlInput(e: Event) {
  const val = (e.target as HTMLTextAreaElement).value
  htmlSource.value = val
  model.value = val
}

const previewSrcdoc = computed(() => {
  const resize = `<script>(function(){var n="${nonce}";function s(){parent.postMessage({type:"editor-preview",nonce:n,height:document.documentElement.scrollHeight},"*")}new ResizeObserver(s).observe(document.body);window.addEventListener("load",s);s()})()</` + 'script>'
  const src = htmlSource.value
  if (src.includes('</body>')) return src.replace('</body>', resize + '</body>')
  return src + resize
})

function onPreviewMessage(e: MessageEvent) {
  if (e.data?.type === 'editor-preview' && e.data?.nonce === nonce && typeof e.data?.height === 'number') {
    previewHeight.value = Math.max(200, Math.min(e.data.height, 600))
  }
}

onMounted(() => window.addEventListener('message', onPreviewMessage))
onBeforeUnmount(() => window.removeEventListener('message', onPreviewMessage))

watch(isFullDocument, (full) => {
  if (full && mode.value === 'wysiwyg') switchToHtml()
}, { immediate: true })

const editorInit = {
  promotion: false,
  branding: false,
  min_height: 500,
  resize: true,
  skin: false,
  content_css: false as const,
  content_style: [contentUiCss, contentCss].join('\n'),

  plugins: [
    'accordion', 'advlist', 'anchor', 'autolink', 'autoresize',
    'charmap', 'code', 'codesample', 'directionality', 'emoticons',
    'fullscreen', 'help', 'image', 'importcss', 'insertdatetime',
    'link', 'lists', 'media', 'nonbreaking', 'pagebreak', 'preview',
    'quickbars', 'searchreplace', 'table', 'visualblocks',
    'visualchars', 'wordcount',
  ].join(' '),

  toolbar: [
    'undo redo | blocks fontfamily fontsize',
    'bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify',
    'bullist numlist outdent indent | link image media table | charmap emoticons codesample blockquote',
    'removeformat | searchreplace visualblocks code fullscreen preview help',
  ].join(' | '),

  menubar: 'file edit view insert format tools table help',

  block_formats: 'Paragraf=p; Başlık 1=h1; Başlık 2=h2; Başlık 3=h3; Başlık 4=h4; Başlık 5=h5; Başlık 6=h6; Ön biçimlendirilmiş=pre',

  font_family_formats: 'Inter=Inter,sans-serif; Montserrat=Montserrat,sans-serif; Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; Georgia=georgia,palatino; Poppins=Poppins,sans-serif; Roboto=Roboto,sans-serif; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva',

  font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 20pt 24pt 28pt 32pt 36pt 48pt 60pt 72pt',

  color_map: [
    '000000', 'Siyah',
    '434343', 'Koyu Gri',
    '666666', 'Gri',
    '999999', 'Açık Gri',
    'FFFFFF', 'Beyaz',
    'FF0000', 'Kırmızı',
    'FF9900', 'Turuncu',
    'FFFF00', 'Sarı',
    '00FF00', 'Yeşil',
    '00FFFF', 'Cyan',
    '0000FF', 'Mavi',
    '9900FF', 'Mor',
    'FF00FF', 'Pembe',
    '10B981', 'Brand',
    '059669', 'Brand Koyu',
  ],

  image_advtab: true,
  image_caption: true,
  link_default_target: '_blank',
  link_assume_external_targets: true,

  codesample_languages: [
    { text: 'HTML/XML', value: 'markup' },
    { text: 'CSS', value: 'css' },
    { text: 'JavaScript', value: 'javascript' },
    { text: 'TypeScript', value: 'typescript' },
    { text: 'JSON', value: 'json' },
    { text: 'Bash', value: 'bash' },
  ],

  quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',
  quickbars_insert_toolbar: 'quickimage quicktable',
}
</script>

<template>
  <div class="wysiwyg-editor">
    <div class="flex items-center gap-2 mb-3">
      <UButtonGroup>
        <UButton
          size="sm"
          :color="mode === 'wysiwyg' ? 'primary' : 'neutral'"
          :variant="mode === 'wysiwyg' ? 'solid' : 'outline'"
          icon="i-heroicons-pencil-square"
          label="Editör"
          :disabled="isFullDocument && mode === 'html'"
          @click="switchToWysiwyg"
        />
        <UButton
          size="sm"
          :color="mode === 'html' ? 'primary' : 'neutral'"
          :variant="mode === 'html' ? 'solid' : 'outline'"
          icon="i-heroicons-code-bracket"
          label="HTML Kaynak"
          @click="switchToHtml"
        />
      </UButtonGroup>

      <span v-if="isFullDocument && mode === 'html'" class="text-xs text-amber-600 flex items-center gap-1">
        <UIcon name="i-heroicons-exclamation-triangle-16-solid" class="size-3.5" />
        Tam HTML doküman — yalnızca kaynak modunda düzenlenebilir
      </span>
    </div>

    <Editor
      v-if="mode === 'wysiwyg'"
      v-model="model"
      license-key="gpl"
      :init="editorInit"
    />

    <div v-else class="html-source-editor space-y-3">
      <textarea
        :value="htmlSource"
        spellcheck="false"
        class="w-full min-h-[500px] rounded-xl border border-gray-200 bg-gray-950 text-gray-100 p-4 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-y"
        @input="onHtmlInput"
      />

      <div v-if="htmlSource.trim()" class="rounded-xl border border-gray-200 overflow-hidden">
        <div class="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
          <UIcon name="i-heroicons-eye" class="size-4 text-gray-400" />
          <span class="text-xs font-medium text-gray-500 uppercase tracking-wider">Önizleme</span>
        </div>
        <iframe
          ref="previewRef"
          :srcdoc="previewSrcdoc"
          :style="{ height: previewHeight + 'px' }"
          class="w-full border-0"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  </div>
</template>

<style>
.wysiwyg-editor .tox-tinymce {
  border-radius: 0.75rem;
  border-color: #e5e7eb;
}
</style>
