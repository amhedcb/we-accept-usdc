"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import Link from "next/link"
import { businesses, BusinessInfo } from "./db"



export function BusinessTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<keyof BusinessInfo>("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [columnSearchTerms, setColumnSearchTerms] = useState({
    name: "",
    location: "",
    website: "",
    country: "",
    type: "",
  })

  
  const filteredBusinesses = businesses.filter(
    (business) =>
      business.name.toLowerCase().includes(columnSearchTerms.name.toLowerCase()) &&
      business.location.toLowerCase().includes(columnSearchTerms.location.toLowerCase()) &&
      business.website.toLowerCase().includes(columnSearchTerms.website.toLowerCase()) &&
      business.country.toLowerCase().includes(columnSearchTerms.country.toLowerCase()) &&
      business.type.toLowerCase().includes(columnSearchTerms.type.toLowerCase()),
  )
  
  const sortedBusinesses = filteredBusinesses.sort((a: BusinessInfo, b: BusinessInfo) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
    return 0
  })
  
  const handleSort = (column: keyof BusinessInfo) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }
  const handleColumnSearch = (column: keyof BusinessInfo, value: string) => {
    setColumnSearchTerms((prevState) => ({
      ...prevState,
      [column]: value,
    }))
  }
  return (
    <div className="container mx-auto my-8 px-4">
      <div className="grid grid-cols-5 gap-4 mb-4">
        <div>
          <Input
            placeholder="Name..."
            value={columnSearchTerms.name}
            onChange={(e) => handleColumnSearch("name", e.target.value)}
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
        </div>
        <div>
        </div>
        <div>
          <Input
            placeholder="Country..."
            value={columnSearchTerms.country}
            onChange={(e) => handleColumnSearch("country", e.target.value)}
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <Input
            placeholder="Business Type..."
            value={columnSearchTerms.type}
            onChange={(e) => handleColumnSearch("type", e.target.value)}
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                onClick={() => handleSort("name")}
                className="cursor-pointer bg-primary text-primary-foreground"
              >
                Business Name{" "}
                {sortColumn === "name" && <span className="ml-2">{sortDirection === "asc" ? "\u25B2" : "\u25BC"}</span>}
              </TableHead>
              <TableHead
                onClick={() => handleSort("location")}
                className="cursor-pointer bg-primary text-primary-foreground"
              >
                Location{" "}
                {sortColumn === "location" && (
                  <span className="ml-2">{sortDirection === "asc" ? "\u25B2" : "\u25BC"}</span>
                )}
              </TableHead>
              <TableHead
                onClick={() => handleSort("website")}
                className="cursor-pointer bg-primary text-primary-foreground"
              >
                Website{" "}
                {sortColumn === "website" && (
                  <span className="ml-2">{sortDirection === "asc" ? "\u25B2" : "\u25BC"}</span>
                )}
              </TableHead>
              <TableHead
                onClick={() => handleSort("country")}
                className="cursor-pointer bg-primary text-primary-foreground"
              >
                Country{" "}
                {sortColumn === "country" && (
                  <span className="ml-2">{sortDirection === "asc" ? "\u25B2" : "\u25BC"}</span>
                )}
              </TableHead>
              <TableHead
                onClick={() => handleSort("type")}
                className="cursor-pointer bg-primary text-primary-foreground"
              >
                Business Type{" "}
                {sortColumn === "type" && <span className="ml-2">{sortDirection === "asc" ? "\u25B2" : "\u25BC"}</span>}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedBusinesses.map((business, index) => (
              <TableRow key={index}>
                <TableCell>{business.name}</TableCell>
                <TableCell>{business.location}</TableCell>
                <TableCell>
                  <Link href="#" target="_blank" prefetch={false}>
                    {business.website}
                  </Link>
                </TableCell>
                <TableCell>{business.country}</TableCell>
                <TableCell>{business.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
