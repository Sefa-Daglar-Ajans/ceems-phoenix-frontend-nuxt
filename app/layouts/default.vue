<template>
  <div class="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-800">
    <AppHeader />

    <main class="flex-1">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
