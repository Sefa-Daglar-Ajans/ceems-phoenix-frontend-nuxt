<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { StarterKit } from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { TextAlign } from '@tiptap/extension-text-align'
import { Underline } from '@tiptap/extension-underline'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { Highlight } from '@tiptap/extension-highlight'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { Youtube } from '@tiptap/extension-youtube'
import { Superscript } from '@tiptap/extension-superscript'
import { Subscript } from '@tiptap/extension-subscript'

const model = defineModel<string>({ default: '' })

const props = withDefaults(defineProps<{
  placeholder?: string
}>(), {
  placeholder: 'İçerik yazın...',
})

const sourceMode = ref(false)
const sourceCode = ref('')

const editor = useEditor({
  content: model.value,
  extensions: [
    StarterKit.configure({
      heading: { levels: [1, 2, 3, 4] },
    }),
    Image.configure({ inline: false, allowBase64: true }),
    Link.configure({ openOnClick: false, autolink: true }),
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Underline,
    Color,
    TextStyle,
    Highlight.configure({ multicolor: true }),
    Placeholder.configure({ placeholder: props.placeholder }),
    Table.configure({ resizable: true }),
    TableRow,
    TableCell,
    TableHeader,
    Youtube.configure({ inline: false }),
    Superscript,
    Subscript,
  ],
  onUpdate: ({ editor: e }) => {
    model.value = e.getHTML()
  },
})

watch(model, (val) => {
  if (editor.value && val !== editor.value.getHTML()) {
    editor.value.commands.setContent(val, false)
  }
})

function toggleSourceMode() {
  if (!editor.value) return

  if (!sourceMode.value) {
    sourceCode.value = editor.value.getHTML()
    sourceMode.value = true
  }
  else {
    editor.value.commands.setContent(sourceCode.value, false)
    model.value = sourceCode.value
    sourceMode.value = false
  }
}

function promptLink() {
  if (!editor.value) return
  const previousUrl = editor.value.getAttributes('link').href as string | undefined
  const url = window.prompt('Bağlantı URL girin:', previousUrl)
  if (url === null) return
  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }
  editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

function promptImage() {
  if (!editor.value) return
  const url = window.prompt('Görsel URL girin:')
  if (url) {
    editor.value.chain().focus().setImage({ src: url }).run()
  }
}

function promptYoutube() {
  if (!editor.value) return
  const url = window.prompt('YouTube URL girin:')
  if (url) {
    editor.value.chain().focus().setYoutubeVideo({ src: url }).run()
  }
}

function insertTable() {
  editor.value?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
}

onBeforeUnmount(() => {
  editor.value?.destroy()
})

interface ToolbarItem {
  icon: string
  title: string
  action: () => void
  isActive?: () => boolean
}

const toolbarGroups = computed((): ToolbarItem[][] => {
  const e = editor.value
  if (!e) return []

  return [
    [
      { icon: 'i-heroicons-bold', title: 'Kalın', action: () => e.chain().focus().toggleBold().run(), isActive: () => e.isActive('bold') },
      { icon: 'i-heroicons-italic', title: 'İtalik', action: () => e.chain().focus().toggleItalic().run(), isActive: () => e.isActive('italic') },
      { icon: 'i-lucide-underline', title: 'Altı çizili', action: () => e.chain().focus().toggleUnderline().run(), isActive: () => e.isActive('underline') },
      { icon: 'i-lucide-strikethrough', title: 'Üstü çizili', action: () => e.chain().focus().toggleStrike().run(), isActive: () => e.isActive('strike') },
      { icon: 'i-lucide-superscript', title: 'Üst simge', action: () => e.chain().focus().toggleSuperscript().run(), isActive: () => e.isActive('superscript') },
      { icon: 'i-lucide-subscript', title: 'Alt simge', action: () => e.chain().focus().toggleSubscript().run(), isActive: () => e.isActive('subscript') },
    ],
    [
      { icon: 'i-lucide-heading-1', title: 'Başlık 1', action: () => e.chain().focus().toggleHeading({ level: 1 }).run(), isActive: () => e.isActive('heading', { level: 1 }) },
      { icon: 'i-lucide-heading-2', title: 'Başlık 2', action: () => e.chain().focus().toggleHeading({ level: 2 }).run(), isActive: () => e.isActive('heading', { level: 2 }) },
      { icon: 'i-lucide-heading-3', title: 'Başlık 3', action: () => e.chain().focus().toggleHeading({ level: 3 }).run(), isActive: () => e.isActive('heading', { level: 3 }) },
    ],
    [
      { icon: 'i-heroicons-list-bullet', title: 'Sırasız liste', action: () => e.chain().focus().toggleBulletList().run(), isActive: () => e.isActive('bulletList') },
      { icon: 'i-lucide-list-ordered', title: 'Sıralı liste', action: () => e.chain().focus().toggleOrderedList().run(), isActive: () => e.isActive('orderedList') },
      { icon: 'i-lucide-quote', title: 'Alıntı', action: () => e.chain().focus().toggleBlockquote().run(), isActive: () => e.isActive('blockquote') },
      { icon: 'i-lucide-minus', title: 'Yatay çizgi', action: () => e.chain().focus().setHorizontalRule().run() },
    ],
    [
      { icon: 'i-lucide-align-left', title: 'Sola hizala', action: () => e.chain().focus().setTextAlign('left').run(), isActive: () => e.isActive({ textAlign: 'left' }) },
      { icon: 'i-lucide-align-center', title: 'Ortala', action: () => e.chain().focus().setTextAlign('center').run(), isActive: () => e.isActive({ textAlign: 'center' }) },
      { icon: 'i-lucide-align-right', title: 'Sağa hizala', action: () => e.chain().focus().setTextAlign('right').run(), isActive: () => e.isActive({ textAlign: 'right' }) },
      { icon: 'i-lucide-align-justify', title: 'İki yana yasla', action: () => e.chain().focus().setTextAlign('justify').run(), isActive: () => e.isActive({ textAlign: 'justify' }) },
    ],
    [
      { icon: 'i-heroicons-link', title: 'Bağlantı', action: promptLink, isActive: () => e.isActive('link') },
      { icon: 'i-heroicons-photo', title: 'Görsel', action: promptImage },
      { icon: 'i-lucide-youtube', title: 'YouTube', action: promptYoutube },
      { icon: 'i-lucide-table', title: 'Tablo', action: insertTable },
      { icon: 'i-lucide-code', title: 'Kod bloğu', action: () => e.chain().focus().toggleCodeBlock().run(), isActive: () => e.isActive('codeBlock') },
    ],
    [
      { icon: 'i-lucide-undo', title: 'Geri al', action: () => e.chain().focus().undo().run() },
      { icon: 'i-lucide-redo', title: 'İleri al', action: () => e.chain().focus().redo().run() },
    ],
  ]
})
</script>

<template>
  <div class="border border-gray-200 rounded-xl overflow-hidden bg-white">
    <div v-if="editor" class="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-200">
      <template v-for="(group, gi) in toolbarGroups" :key="gi">
        <div v-if="gi > 0" class="w-px h-6 bg-gray-200 mx-1" />
        <UButton
          v-for="(item, ii) in group"
          :key="ii"
          :icon="item.icon"
          :title="item.title"
          size="xs"
          :variant="item.isActive?.() ? 'solid' : 'ghost'"
          :color="item.isActive?.() ? 'primary' : 'neutral'"
          class="rounded-md"
          @click="item.action"
        />
      </template>

      <div class="w-px h-6 bg-gray-200 mx-1" />
      <UButton
        icon="i-lucide-code-xml"
        title="HTML Kaynak Kodu"
        size="xs"
        :variant="sourceMode ? 'solid' : 'ghost'"
        :color="sourceMode ? 'warning' : 'neutral'"
        class="rounded-md"
        @click="toggleSourceMode"
      />
    </div>

    <div v-if="sourceMode" class="p-0">
      <textarea
        v-model="sourceCode"
        class="w-full min-h-[400px] p-4 font-mono text-sm bg-gray-900 text-green-400 border-0 outline-none resize-y"
        spellcheck="false"
      />
    </div>
    <EditorContent
      v-else
      :editor="editor"
      class="tiptap-editor"
    />
  </div>
</template>

<style>
.tiptap-editor .tiptap {
  min-height: 400px;
  padding: 1rem;
  outline: none;
}

.tiptap-editor .tiptap > *:first-child { margin-top: 0; }

.tiptap-editor .tiptap p { margin: 0.5em 0; }
.tiptap-editor .tiptap h1 { font-size: 2em; font-weight: 700; margin: 0.67em 0; }
.tiptap-editor .tiptap h2 { font-size: 1.5em; font-weight: 700; margin: 0.75em 0; }
.tiptap-editor .tiptap h3 { font-size: 1.25em; font-weight: 600; margin: 0.83em 0; }
.tiptap-editor .tiptap h4 { font-size: 1.1em; font-weight: 600; margin: 1em 0; }

.tiptap-editor .tiptap ul { list-style: disc; padding-left: 1.5em; }
.tiptap-editor .tiptap ol { list-style: decimal; padding-left: 1.5em; }
.tiptap-editor .tiptap li { margin: 0.25em 0; }

.tiptap-editor .tiptap blockquote {
  border-left: 3px solid var(--color-brand-500, #4f46e5);
  padding-left: 1em;
  margin: 1em 0;
  color: #6b7280;
  font-style: italic;
}

.tiptap-editor .tiptap hr {
  border: none;
  border-top: 2px solid #e5e7eb;
  margin: 1.5em 0;
}

.tiptap-editor .tiptap a {
  color: var(--color-brand-600, #4f46e5);
  text-decoration: underline;
  cursor: pointer;
}

.tiptap-editor .tiptap img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1em 0;
}

.tiptap-editor .tiptap pre {
  background: #1e293b;
  color: #e2e8f0;
  padding: 1em;
  border-radius: 0.5rem;
  overflow-x: auto;
  font-family: ui-monospace, monospace;
  font-size: 0.875em;
  margin: 1em 0;
}

.tiptap-editor .tiptap code {
  background: #f1f5f9;
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-size: 0.875em;
}
.tiptap-editor .tiptap pre code {
  background: none;
  padding: 0;
}

.tiptap-editor .tiptap table {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}
.tiptap-editor .tiptap th,
.tiptap-editor .tiptap td {
  border: 1px solid #d1d5db;
  padding: 0.5em 0.75em;
  text-align: left;
}
.tiptap-editor .tiptap th {
  background: #f9fafb;
  font-weight: 600;
}

.tiptap-editor .tiptap .ProseMirror-selectednode {
  outline: 2px solid var(--color-brand-500, #4f46e5);
  border-radius: 0.25rem;
}

.tiptap-editor .tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #9ca3af;
  pointer-events: none;
  height: 0;
}

.tiptap-editor .tiptap iframe {
  max-width: 100%;
  border-radius: 0.5rem;
  margin: 1em 0;
}
</style>
