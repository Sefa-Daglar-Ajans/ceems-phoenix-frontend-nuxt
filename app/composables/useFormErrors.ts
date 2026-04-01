import type { ApiErrorResponse, ApiFieldError } from '~/utils/api'

export function useFormErrors() {
  const fieldErrors = ref<Record<string, string>>({})
  const generalError = ref<string | null>(null)

  function setBackendErrors(error: unknown) {
    clearErrors()

    const apiError = error as ApiErrorResponse
    if (apiError?.errors && Array.isArray(apiError.errors)) {
      for (const err of apiError.errors as ApiFieldError[]) {
        fieldErrors.value[err.field] = err.message
      }
    }

    if (apiError?.message) {
      generalError.value = apiError.message
    }
  }

  function setFieldError(field: string, message: string) {
    fieldErrors.value[field] = message
  }

  function clearErrors() {
    fieldErrors.value = {}
    generalError.value = null
  }

  function getFieldError(field: string): string | undefined {
    return fieldErrors.value[field]
  }

  return {
    fieldErrors,
    generalError,
    setBackendErrors,
    setFieldError,
    clearErrors,
    getFieldError,
  }
}
