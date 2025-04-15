import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CareerFiltersProps {
  onFilter: (filters: {
    department: string;
    location: string;
    type: string;
    category: string;
  }) => void;
}

const CareerFilters = ({ onFilter }: CareerFiltersProps) => {
  const [filters, setFilters] = useState({
    department: '',
    location: '',
    type: '',
    category: '',
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const departments = ['Consulting', 'Technology', 'Sales', 'Operations', 'Administrative'];
  const locations = ['New York, NY', 'Chicago, IL', 'Dallas, TX', 'Remote'];
  const types = ['Full-time', 'Part-time', 'Contract', 'Remote'];
  const categories = ['Leadership', 'Consulting', 'Customer Support', 'Technology', 'Sales & Marketing', 'Administrative'];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 text-consultant-blue mr-2" />
        <h2 className="text-xl font-semibold">Filter Jobs</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <Select
            onValueChange={(value) => handleFilterChange('department', value)}
            value={filters.department}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-departments">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <Select
            onValueChange={(value) => handleFilterChange('location', value)}
            value={filters.location}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-locations">All Locations</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
          <Select
            onValueChange={(value) => handleFilterChange('type', value)}
            value={filters.type}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-types">All Types</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <Select
            onValueChange={(value) => handleFilterChange('category', value)}
            value={filters.category}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-categories">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CareerFilters;