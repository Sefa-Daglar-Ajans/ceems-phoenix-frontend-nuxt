<script setup lang="ts">
import { UBadge, UButton } from '#components'

definePageMeta({ layout: 'panel', middleware: ['auth'] })
useHead({ title: 'İletişim Mesajları - Admin Paneli' })

const toast = useToast()

interface ContactSubmission {
  id: number
  name: string
  email: string
  message: string
  isRead: boolean
  createdAt: string
}

const submissions = ref<ContactSubmission[]>([
  { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@mail.com', message: 'Ürünleriniz hakkında bilgi almak istiyorum. Doktor tavsiyesiyle kullanmak istiyorum.', isRead: false, createdAt: '2026-03-31T14:30:00' },
  { id: 2, name: 'Fatma Kaya', email: 'fatma@mail.com', message: 'MitoOva X ürünü için sipariş vermek istiyorum. Kargo süresi ne kadar?', isRead: false, createdAt: '2026-03-30T10:15:00' },
  { id: 3, name: 'Mehmet Demir', email: 'mehmet@mail.com', message: 'Toplu sipariş için fiyat teklifi alabilir miyim?', isRead: true, createdAt: '2026-03-28T09:00:00' },
  { id: 4, name: 'Zeynep Çelik', email: 'zeynep@mail.com', message: 'Ürünün yan etkileri hakkında bilgi almak istiyorum.', isRead: true, createdAt: '2026-03-25T16:45:00' },
])
const loading = ref(false)

const columns = [
  {
    accessorKey: 'isRead',
    header: '',
    cell: ({ row }: any) => h('div', {
      class: `w-2 h-2 rounded-full ${row.original.isRead ? 'bg-gray-300' : 'bg-brand-500'}`,
    }),
  },
  { accessorKey: 'name', header: 'İsim' },
  { accessorKey: 'email', header: 'E-posta' },
  {
    accessorKey: 'message',
    header: 'Mesaj',
    cell: ({ row }: any) => {
      const msg = row.original.message
      return msg.length > 60 ? `${msg.substring(0, 60)}...` : msg
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Tarih',
    cell: ({ row }: any) => new Date(row.original.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }: any) => {
      if (row.original.isRead) return null
      return h(UButton, {
        label: 'Okundu',
        size: 'xs',
        variant: 'soft',
        color: 'primary',
        onClick: () => {
          const s = submissions.value.find(s => s.id === row.original.id)
          if (s) {
            s.isRead = true
            toast.add({ title: 'Okundu olarak işaretlendi', color: 'success' })
          }
        },
      })
    },
  },
]

const unreadCount = computed(() => submissions.value.filter(s => !s.isRead).length)

// Detail modal
const selectedSubmission = ref<ContactSubmission | null>(null)
const showDetailModal = ref(false)

function viewDetail(submission: ContactSubmission) {
  selectedSubmission.value = submission
  showDetailModal.value = true
  if (!submission.isRead) {
    submission.isRead = true
  }
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 uppercase tracking-tight">İletişim Mesajları</h1>
      <p class="text-sm text-gray-500 mt-1">
        Ziyaretçilerden gelen iletişim formları
        <UBadge v-if="unreadCount > 0" :label="`${unreadCount} okunmamış`" color="error" variant="subtle" size="xs" class="ml-2" />
      </p>
    </div>

    <UCard class="shadow-sm border-none">
      <UTable
        :data="submissions"
        :columns="columns"
        :loading="loading"
        class="w-full"
        @select="(_e: Event, row: any) => viewDetail(row.original)"
      >
        <template #empty>
          <div class="py-8 text-center text-gray-400">
            <UIcon name="i-heroicons-envelope" class="size-10 mx-auto" />
            <p class="mt-2">Mesaj bulunamadı.</p>
          </div>
        </template>
      </UTable>
    </UCard>

    <!-- Detail Modal -->
    <UModal v-model:open="showDetailModal" :title="selectedSubmission?.name || 'Mesaj'">
      <template #body>
        <div v-if="selectedSubmission" class="space-y-4">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
              <span class="font-bold text-brand-600 text-sm">{{ selectedSubmission.name[0] }}</span>
            </div>
            <div>
              <p class="font-bold text-gray-900">{{ selectedSubmission.name }}</p>
              <p class="text-sm text-gray-500">{{ selectedSubmission.email }}</p>
            </div>
          </div>
          <USeparator />
          <p class="text-gray-700 leading-relaxed">{{ selectedSubmission.message }}</p>
          <p class="text-xs text-gray-400">
            {{ new Date(selectedSubmission.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}
          </p>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <UButton label="Kapat" color="neutral" variant="ghost" @click="showDetailModal = false" />
        </div>
      </template>
    </UModal>
  </div>
</template>
