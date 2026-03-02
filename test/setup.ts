export function mountFixture (html: string): HTMLElement {
  const root = document.createElement('div')
  root.innerHTML = html
  document.body.appendChild(root)
  return root
}

export function cleanupFixture (root: HTMLElement): void {
  root.remove()
}
