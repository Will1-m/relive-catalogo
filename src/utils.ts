export function debounce<T extends (...args: any[]) => void>(fn: T, delay = 300): T {
  let timeout: ReturnType<typeof setTimeout>
  return function(this: any, ...args: any[]) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(this, args), delay)
  } as T
}