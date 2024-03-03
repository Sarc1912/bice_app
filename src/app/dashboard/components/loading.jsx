import React from 'react'

function LoadingPage() {
  return (
<div id="loading-custom-icon" class="h-[300px] w-full">
  <div
    data-te-loading-management-init
    data-te-parent-selector="#loading-custom-icon">
    <div
      data-te-loading-icon-ref
      class="inline-block h-8 w-8 animate-spin border-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status">
      <span class="[&>svg]:w-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      </span>
    </div>
    <span data-te-loading-text-ref>Cargando...</span>
  </div>
</div>
  )
}

export default LoadingPage