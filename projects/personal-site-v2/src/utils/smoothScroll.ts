/**
 * Smooth scroll utility with offset handling for fixed navigation
 */
export function smoothScrollTo(
  elementId: string,
  offset: number = 80, // Default offset for fixed nav
  behavior: ScrollBehavior = 'smooth'
): void {
  const element = document.getElementById(elementId)

  if (!element) {
    console.warn(`Element with id "${elementId}" not found`)
    return
  }

  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - offset

  window.scrollTo({
    top: offsetPosition,
    behavior,
  })
}

/**
 * Setup smooth scroll for all anchor links
 */
export function setupSmoothScroll(): void {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    const anchor = target.closest('a')

    if (!anchor) return

    const href = anchor.getAttribute('href')

    if (!href?.startsWith('#')) return

    const elementId = href.substring(1)

    if (!elementId) return

    e.preventDefault()
    smoothScrollTo(elementId)
  })
}
