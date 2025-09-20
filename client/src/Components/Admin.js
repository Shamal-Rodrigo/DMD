import React  from 'react';
import { useNavigate} from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';
import { Plus, Search, Edit2, Trash2, X, Calendar, DollarSign, MapPin, BarChart2, FileText, AlertCircle } from 'lucide-react';

// Sample data for demonstration
const initialJobs = [
  {
    id: 1,
    invoiceNumber: "INV-2025-001",
    name: "John Smith",
    address: "123 Main St, New York, NY 10001",
    description: "Plumbing repair and bathroom renovation",
    date: "2025-04-08",
    services: [
      { name: "Bathroom plumbing repair", price: 450 },
      { name: "Sink installation", price: 250 },
      { name: "Shower head replacement", price: 150 }
    ],
    transport: 75,
    tax: 85,
    totalPrice: 1010
  },
  {
    id: 2,
    invoiceNumber: "INV-2025-002",
    name: "Emily Johnson",
    address: "456 Park Ave, Boston, MA 02108",
    description: "Electrical system upgrade",
    date: "2025-04-10",
    services: [
      { name: "Circuit panel upgrade", price: 800 },
      { name: "Outlet installation (6 units)", price: 300 },
      { name: "Lighting fixture installation", price: 100 }
    ],
    transport: 50,
    tax: 120,
    totalPrice: 1370
  },
  {
    id: 3,
    invoiceNumber: "INV-2025-003",
    name: "Michael Williams",
    address: "789 Oak Dr, Chicago, IL 60601",
    description: "HVAC maintenance",
    date: "2025-04-15",
    services: [
      { name: "HVAC filter replacement", price: 150 },
      { name: "System cleaning", price: 200 }
    ],
    transport: 60,
    tax: 41,
    totalPrice: 451
  }
];

const [jobs, setJobs] = useState();
const [loading, setLoading] = useState(true)

const getAllJobs = async() =>{
  try {
    const response = await axios.get("http://localhost:8000/api/job/getjobs");
    setJobs(response);
  } catch (error) {
    console.log("Error occured in data loading - ", error);
  }
}


// Generate a new invoice number based on the latest one
const generateInvoiceNumber = (jobs) => {
  if (jobs.length === 0) return "INV-2025-001";
  
  const lastInvoice = jobs.reduce((max, job) => {
    const current = parseInt(job.invoiceNumber.split('-')[2]);
    return current > max ? current : max;
  }, 0);
  
  return `INV-${(lastInvoice + 1).toString().padStart(3, '0')}`;
};

// Calculate totals from services
const calculateTotals = (services, transport) => {
  const serviceTotal = services.reduce((sum, service) => sum + parseFloat(service.price || 0), 0);
  const transportCost = parseFloat(transport || 0);
  const tax = serviceTotal * 0.1; // 10% tax
  const totalPrice = serviceTotal + transportCost + tax;
  
  return {
    serviceTotal,
    tax,
    totalPrice
  };
};

const Admin = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingJob, setEditingJob] = useState(null);
  const navigate = useNavigate();
  const [newJob, setNewJob] = useState({
    invoiceNumber: generateInvoiceNumber(jobs),
    name: "",
    address: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
    services: [{ name: "", price: "" }],
    transport: 0,
    tax: 0,
    totalPrice: 0
  });

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(job => 
    job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle input changes for new job form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedJob = { ...newJob, [name]: value };
    
    // Recalculate tax and total if transport changes
    if (name === 'transport') {
      const { tax, totalPrice } = calculateTotals(updatedJob.services, value);
      updatedJob.tax = tax;
      updatedJob.totalPrice = totalPrice;
    }
    
    setNewJob(updatedJob);
  };

  // Handle service input changes
  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServices = [...newJob.services];
    updatedServices[index] = { ...updatedServices[index], [name]: value };
    
    // Recalculate totals
    const { tax, totalPrice } = calculateTotals(updatedServices, newJob.transport);
    
    setNewJob({
      ...newJob,
      services: updatedServices,
      tax,
      totalPrice
    });
  };

  // Add new service field
  const addServiceField = () => {
    setNewJob({
      ...newJob,
      services: [...newJob.services, { name: "", price: "" }]
    });
    
  };

  // Remove service field
  const removeServiceField = (index) => {
    if (newJob.services.length === 1) return; // Keep at least one service
    
    const updatedServices = newJob.services.filter((_, i) => i !== index);
    const { tax, totalPrice } = calculateTotals(updatedServices, newJob.transport);
    
    setNewJob({
      ...newJob,
      services: updatedServices,
      tax,
      totalPrice
    });
  };

  // Handle job submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingJob) {
      // Update existing job
      setJobs(jobs.map(job => job.id === editingJob.id ? {...newJob, id: job.id} : job));
    } else {
      // Add new job
      const jobToAdd = {
        ...newJob,
        id: jobs.length > 0 ? Math.max(...jobs.map(job => job.id)) + 1 : 1
      };
      setJobs([...jobs, jobToAdd]);
    }

    console.log(jobs)
    
    // Reset form and close modal
    setIsModalOpen(false);
    setEditingJob(null);
    setNewJob({
      invoiceNumber: generateInvoiceNumber([...jobs, newJob]),
      name: "",
      address: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      services: [{ name: "", price: "" }],
      transport: 0,
      tax: 0,
      totalPrice: 0
    });
  };

  // Handle editing job
  const handleEdit = (job) => {
    setEditingJob(job);
    setNewJob({...job});
    setIsModalOpen(true);
  };

  // Handle deleting job
  const handleDelete = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const handleInvoice = (job) => {
    navigate("/invoice", {state: job});
  };

  // Calculate dashboard stats
  const totalRevenue = jobs.reduce((sum, job) => sum + job.totalPrice, 0);
  const averageJobValue = jobs.length > 0 ? totalRevenue / jobs.length : 0;
  const pendingJobs = jobs.filter(job => new Date(job.date) > new Date()).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-violet-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Service Jobs Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setEditingJob(null);
                setNewJob({
                  ...newJob,
                  invoiceNumber: generateInvoiceNumber(jobs),
                  date: new Date().toISOString().split('T')[0],
                  services: [{ name: "", price: "" }]
                });
                setIsModalOpen(true);
              }}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium flex items-center hover:bg-indigo-50 transition-colors shadow-md"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Job
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center border-l-4 border-green-500">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center border-l-4 border-blue-500">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <BarChart2 className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Average Job Value</p>
              <p className="text-2xl font-bold text-gray-800">${averageJobValue.toFixed(2)}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center border-l-4 border-purple-500">
            <div className="rounded-full bg-purple-100 p-3 mr-4">
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending Jobs</p>
              <p className="text-2xl font-bold text-gray-800">{pendingJobs}</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="relative rounded-md shadow-sm max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 py-3 sm:text-sm border-gray-300 rounded-lg"
              placeholder="Search jobs by name, invoice or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice #
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Services
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                        {job.invoiceNumber}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{job.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {job.address.length > 20 ? `${job.address.substring(0, 20)}...` : job.address}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {job.description.length > 30 ? `${job.description.substring(0, 30)}...` : job.description}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {job.services.length} service{job.services.length !== 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(job.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">${job.totalPrice.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                            title="View Invoice"
                            onClick={() => handleInvoice(job)}
                          >
                            <FileText className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleEdit(job)}
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50"
                            title="Edit Job"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(job.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                            title="Delete Job"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-10 text-center text-sm text-gray-500">
                      <div className="flex flex-col items-center">
                        <AlertCircle className="h-12 w-12 text-gray-400 mb-2" />
                        <p>No jobs found. Try a different search or add a new job.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal for Adding/Editing Job */}
      {isModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative bg-white rounded-lg max-w-3xl w-full mx-4 shadow-xl">
            <div className="absolute top-4 right-4">
              <button
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-5 flex items-center border-b pb-3">
                {editingJob ? (
                  <>
                    <Edit2 className="w-5 h-5 mr-2 text-indigo-600" />
                    Edit Job #{editingJob.invoiceNumber}
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2 text-indigo-600" />
                    Add New Service Job
                  </>
                )}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Invoice Number
                    </label>
                    <input
                      type="text"
                      name="invoiceNumber"
                      value={newJob.invoiceNumber}
                      readOnly
                      className="bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={newJob.date}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newJob.name}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={newJob.address}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={newJob.description}
                      onChange={handleInputChange}
                      rows="2"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    ></textarea>
                  </div>
                </div>
                
                {/* Services Section */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700 flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      Services
                    </h4>
                    <button
                      type="button"
                      onClick={addServiceField}
                      className="text-xs flex items-center px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Service
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {newJob.services.map((service, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="flex-grow">
                          <input
                            type="text"
                            name="name"
                            value={service.name}
                            onChange={(e) => handleServiceChange(index, e)}
                            placeholder="Service description"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div className="w-32">
                          <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="price"
                              value={service.price}
                              onChange={(e) => handleServiceChange(index, e)}
                              min="0"
                              step="0.01"
                              placeholder="Price"
                              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                              required
                            />
                          </div>
                        </div>
                        {newJob.services.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeServiceField(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Services Total:</span>
                      <span className="text-sm font-medium">
                        ${newJob.services.reduce((sum, service) => sum + parseFloat(service.price || 0), 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Pricing Section */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Additional Costs & Totals
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Transport ($)
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="transport"
                          value={newJob.transport}
                          onChange={handleInputChange}
                          min="0"
                          step="0.01"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tax ($)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="tax"
                          value={newJob.tax.toFixed(2)}
                          readOnly
                          className="bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Total Price ($)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="totalPrice"
                          value={newJob.totalPrice.toFixed(2)}
                          readOnly
                          className="bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-700 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {editingJob ? 'Update Job' : 'Add Job'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;