// SearchBar.tsx
export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('SearchBar input:', e.target.value)   // <= LOG
    onChange(e.target.value)
  }
  return (
    <input
      type="text"
      value={value}
      onChange={handleInput}
      placeholder="Busca un producto…"
      className="…"
    />
  )
}
