import App from '../components/App'

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof document === 'undefined' ? null : children}
    </div>
  )
}

export default function Index() {
  return (
    <SafeHydrate>
      <App />
    </SafeHydrate>
  )
}