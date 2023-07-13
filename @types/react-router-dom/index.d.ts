export interface HistoryProps {
  push: (url: string) => void
  replace: (url: string) => void
  goBack: () => void
}
