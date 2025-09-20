import React, { useEffect, useState, useRef } from "react";
import { Printer, ArrowLeft } from "lucide-react";
import { useLocation } from "react-router-dom";

const Invoice = ({ onBack }) => {
  const location = useLocation();
  const [job, setJob] = useState(location.state || null);
  const [loading, setLoading] = useState(!job);
  const invoiceRef = useRef(null);

  useEffect(() => {
    // Set document title to invoice number
    if (job && job.invoiceNumber) {
      document.title = job.invoiceNumber;
    }

    if (!job) {
      setTimeout(() => {
        setJob({
          invoiceNumber: "INV-2025-015",
          name: "",
          address: "",
          instructions: "",
          date: new Date().toISOString().split("T")[0],
          servicePrice: 0,
          transport: 0,
          tax: 0,
          totalPrice: 0,
          services: [
            { description: "Basic Wash & Wax", name: "Basic Wash & Wax", price: 55 },
            { description: "Interior Deep Clean", name: "Interior Deep Clean", price: 80 },
            { description: "Paint Protection", name: "Paint Protection", price: 120 }
          ],
        });
        setLoading(false);
      }, 1000);
    }
  }, [job]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handlePrint = () => {
    document.title = job.invoiceNumber;
    window.print();
    
    // Reset title after printing
    setTimeout(() => {
      document.title = "DMD Invoice ";
    }, 100);
  };

  // const handleDownload = () => {
  //   document.title = job.invoiceNumber;
  //   window.print();
    
  //   // Reset title after printing
  //   setTimeout(() => {
  //     document.title = "DMD Invoice ";
  //   }, 100);
  // };

  // Calculate subtotal with safety check
  const subtotal = Array.isArray(job.services) 
    ? job.services.reduce((sum, item) => sum + (Number(item.price) || 0), 0)
    : Number(job.servicePrice) || 0;

  return (
    <div className="bg-gray-100 min-h-screen">
  {/* Print Container - Controls the exact dimensions for consistency */}
  <div className="w-[210mm] mx-auto bg-white min-h-[297mm] shadow-md">
    {/* Top Bar - Will be hidden when printing */}
    <div className="p-4 bg-gray-800 print:hidden">
      <div className="w-full flex justify-between items-center">
        <button onClick={onBack} className="flex items-center text-gray-100 hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Dashboard
        </button>
        <div className="flex space-x-3">
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700 transition-colors"
          >
            <Printer className="h-5 w-5 mr-2" />
            Print
          </button>
          {/* <button 
            onClick={handleDownload}
            className="bg-gray-600 text-white px-4 py-2 rounded flex items-center hover:bg-gray-700 transition-colors"
          >
            <Download className="h-5 w-5 mr-2" />
            Download PDF
          </button> */}
        </div>
      </div>
    </div>

    {/* Invoice Document */}
    <div ref={invoiceRef} className="px-8 py-6">
      {/* Header */}
      <div className="border-b-1 border-gray-200 pb-6 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">DANIEL'S MOBILE DETAILING</h1>
            <div className="text-gray-600 text-sm mt-1">
              <p>75 Heath Road, Locks Heath, Southampton, SO31 6BJ</p>
              <p>078 69 99 7211</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded border border-gray-200 text-right">
            <h2 className="font-bold text-xl text-gray-800">INVOICE</h2>
            <div className="flex gap-3 text-sm mt-1">
              <span className="font-semibold text-gray-600">INVOICE NO:</span>
              <span className="font-bold text-gray-800">{job.invoiceNumber}</span>
            </div>
            <div className="flex gap-3 text-sm">
              <span className="font-semibold text-gray-600">DATE:</span>
              <span className="text-gray-800">{job.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Client Details */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="border-l-4 border-gray-300 pl-4">
          <h2 className="text-base font-bold text-gray-800 mb-2 text-left">BILL TO</h2>
          <div className="text-gray-600">
            <p className="font-medium text-gray-800">{job.name || "N/A"}</p>
            <p className="whitespace-pre-line">{job.address || "N/A"}</p>
          </div>
        </div>
        <div className="border-l-4 border-gray-300 pl-4">
          <h2 className="text-base font-bold text-gray-800 mb-2 text-left">INSTRUCTIONS</h2>
          <div className="text-gray-600">
            <p className="whitespace-pre-line">{job.description || "No special instructions provided."}</p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="mb-6">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left py-3 px-4 bg-gray-100 border-y border-gray-200 font-semibold text-gray-700">DESCRIPTION</th>
              <th className="text-right py-3 px-4 bg-gray-100 border-y border-gray-200 font-semibold text-gray-700">PRICE</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(job.services) ? (
            job.services.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-2 px-3 text-sm text-gray-800 text-left">
                  {item.name || item.description || "Service"}
                </td>
                <td className="py-2 px-3 text-sm text-right font-medium text-gray-800">
                  £{Number(item.price).toFixed(2)}
                </td>
              </tr>
            ))
          ) : (
            <tr className="border-b border-gray-100">
              <td className="py-1 px-3 text-sm text-gray-800 text-left">Service</td>
              <td className="py-1 px-3 text-sm text-right font-medium text-gray-800">
                £{Number(job.servicePrice).toFixed(2)}
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-72">
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between py-2 text-gray-600">
              <span>SERVICE PRICE:</span>
              <span className="font-medium">£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 text-gray-600">
              <span>TRANSPORT:</span>
              <span className="font-medium">£{Number(job.transport).toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 text-gray-600">
              <span>TAX:</span>
              <span className="font-medium">£{Number(job.tax).toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-3 text-lg font-bold border-t-2 border-gray-200 mt-2">
              <span>TOTAL:</span>
              <span>£{Number(job.totalPrice).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center text-gray-600 border-t border-gray-200 pt-4">
        <p>Thank you for choosing Daniel Mobile Detailing!</p>
      </div>
    </div>
  </div>

      
      {/* Updated print styles to fix page layout and hide header/footer */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: A4;
            margin: 5;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html {
            height: 99%;
          }
          .print\\:hidden {
            display: none !important;
          }
          /* Hide browser default header and footer */
          @page {
            margin: 0;
          }
          /* Hide any other UI elements not needed for printing */
          header, footer, nav {
            display: none !important;
          }
        }
      `}} />
    </div>
  );
};

export default Invoice;