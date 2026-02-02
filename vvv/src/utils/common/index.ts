interface IOptions {
  threshold: number[]
  root: HTMLElement
  rootMargin: string
}

const useLazyImg = (
  root: HTMLElement,
  img: HTMLImageElement,
  options: IOptions = {
    threshold: [0.5],
    root: root,
    rootMargin: '120px',
  },
) => {
  // start
  function callbackFn(entries: any) {
    if (entries[0].isIntersecting) {
      img.src = img?.getAttribute('data-url') as string
      io.unobserve(img as HTMLElement)
    }
  }
  const io = new IntersectionObserver(callbackFn, options)
  io.observe(img as HTMLElement)
  // 卸载
  function uninstall() {
    io.disconnect()
  }

  return { uninstall }
}

export default useLazyImg



