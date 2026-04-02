<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue'

const model = defineModel<string>({ default: '' })

defineProps<{
  placeholder?: string
}>()

const editorInit = {
  promotion: false,
  branding: false,
  min_height: 500,
  resize: true,

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
    <Editor
      v-model="model"
      tinymce-script-src="/tinymce/tinymce.min.js"
      license-key="gpl"
      :init="editorInit"
    />
  </div>
</template>

<style>
.wysiwyg-editor .tox-tinymce {
  border-radius: 0.75rem;
  border-color: #e5e7eb;
}
</style>
