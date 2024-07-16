"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { MapLocator } from "./map-locator"

export function MapContainer() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  
  // TODO: Amhed: Move these over to the .db
  const [businesses, setBusinesses] = useState([
    {
      id: 1,
      name: "Acme Corp",
      address: "123 Main St, Anytown USA",
      category: "Retail",
      phone: "555-1234",
      website: "https://www.acmecorp.com",
      coordinates: { lat: 40.73061, lng: -73.935242 },
    },
    {
      id: 2,
      name: "Widgets Inc",
      address: "456 Oak Rd, Somewhere City",
      category: "Manufacturing",
      phone: "555-5678",
      website: "https://www.widgetsinc.com",
      coordinates: { lat: 34.052235, lng: -118.243683 },
    },
    {
      id: 3,
      name: "Gadgets Galore",
      address: "789 Elm St, Elsewhere Town",
      category: "Retail",
      phone: "555-9012",
      website: "https://www.gadgetsgalore.com",
      coordinates: { lat: 51.507351, lng: -0.127758 },
    },
    {
      id: 4,
      name: "Biz Solutions",
      address: "321 Oak Ln, Somewhere Else",
      category: "Professional Services",
      phone: "555-3456",
      website: "https://www.bizsolutions.com",
      coordinates: { lat: 37.7749, lng: -122.4194 },
    },
  ])
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      return (
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "" || business.category === selectedCategory)
      )
    })
  }, [businesses, searchTerm, selectedCategory])
  const [showAddBusinessModal, setShowAddBusinessModal] = useState(false)
  const handleAddBusiness = () => {
    setShowAddBusinessModal(true)
  }
  return (
    <div className="flex flex-col h-screen w-screen max-w-screen-2xl">
      <header className="bg-primary text-primary-foreground py-4 px-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto"> 
        <h1 className="text-2xl font-bold">We Accept USDC</h1>
        <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
          type="text"
          placeholder="Search..."
          className="pr-4 py-2 rounded-md bg-primary-foreground text-primary focus:outline-none focus:ring-2 focus:ring-primary-foreground"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
          <Button variant="default" className="flex items-center gap-2">
            <FilterIcon className="h-5 w-5" />
            <span>Filter</span>
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
          {/* TODO: Amhed: Make dynamic */}
          <DropdownMenuLabel>Filter by category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={selectedCategory === ""}
            onCheckedChange={() => setSelectedCategory("")}
          >
            All
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedCategory === "Retail"}
            onCheckedChange={() => setSelectedCategory("Retail")}
          >
            Retail
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedCategory === "Manufacturing"}
            onCheckedChange={() => setSelectedCategory("Manufacturing")}
          >
            Manufacturing
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedCategory === "Professional Services"}
            onCheckedChange={() => setSelectedCategory("Professional Services")}
          >
            Professional Services
          </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="destructive" onClick={handleAddBusiness}>
          Add Yours!
        </Button>
        </div>
      </div>
      </header>
      {showAddBusinessModal && (
      <Dialog>
        <DialogTrigger asChild>
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-background p-6 rounded-lg shadow-lg w-full max-w-md">
          <DialogContent>
            <DialogHeader>
            <DialogTitle>Add Your Business</DialogTitle>
            <DialogDescription>Fill out the form to add your business to the directory.</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
            <div>
              <Label htmlFor="name">Business Name</Label>
              <Input id="name" type="text" placeholder="Enter business name" />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="Enter business address" />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Retail">Retail</SelectItem>
                <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                <SelectItem value="Professional Services">Professional Services</SelectItem>
              </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="Enter business phone" />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input id="website" type="url" placeholder="Enter business website" />
            </div>
            </form>
          </DialogContent>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddBusinessModal(false)}>
            Cancel
            </Button>
            <Button className="ml-auto">Save</Button>
          </DialogFooter>
          </div>
        </div>
        </DialogTrigger>
      </Dialog>
      )}
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_2fr]">
      <div className="bg-muted overflow-auto">
        <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Businesses</h2>
        <div className="space-y-4">
          {filteredBusinesses.map((business) => (
          <Card key={business.id} className="cursor-pointer hover:bg-muted/50">
            <CardHeader>
            <CardTitle>{business.name}</CardTitle>
            <CardDescription>{business.category}</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="text-muted-foreground">{business.address}</div>
            <div className="text-muted-foreground">{business.phone}</div>
            <div className="text-muted-foreground">
              <Link href="#" target="_blank" prefetch={false}>
              {business.website}
              </Link>
            </div>
            </CardContent>
          </Card>
          ))}
        </div>
        </div>
      </div>
      <div className="bg-muted/20">        
        <MapLocator />
      </div>
      </div>
    </div>
    )
}

// TODO: Amhed: Move all of these to their own Icon/Components
function ChevronDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}


function FilterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}


function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
