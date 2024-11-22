import { Search } from "lucide-react"

import { Label } from "./label"
import { Input } from "./input"

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <div className="relative">
      <form {...props}>
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          placeholder="Cari nama proyek atau kategori..."
          className="pl-10"
        />
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
      </form>
    </div>
  )
}
