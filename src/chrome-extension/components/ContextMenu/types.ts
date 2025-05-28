export type TContextMenu = {
  position: { x: number; y: number }
  selectedText: string
  onAction1: (text: string) => void
  onAction2: (text: string) => void
  onClose: () => void
}
