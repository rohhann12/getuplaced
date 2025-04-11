'use client'

import { useState } from 'react'
import { MoreHorizontal, ChevronDown, Send } from 'lucide-react'

// Dummy data for emails
const dummyEmails = [
  { 
    id: 1, 
    status: 'Success', 
    name: 'Kenneth Thompson',
    email: 'ken99@example.com', 
    companyName: 'TechCorp Inc.',
    template: 'tech'
  },
  { 
    id: 2, 
    status: 'Success', 
    name: 'Abraham Wilson',
    email: 'abe45@example.com', 
    companyName: 'Innovation Labs',
    template: 'tech'
  },
  { 
    id: 3, 
    status: 'Processing', 
    name: 'Monserrat Davis',
    email: 'monserrat44@example.com', 
    companyName: 'Future Systems',
    template: 'non-tech'
  },
  { 
    id: 4, 
    status: 'Success', 
    name: 'Silas Anderson',
    email: 'silas22@example.com', 
    companyName: 'Digital Solutions',
    template: 'tech'
  },
  { 
    id: 5, 
    status: 'Failed', 
    name: 'Carmella Martinez',
    email: 'carmella@example.com', 
    companyName: 'Cloud Dynamics',
    template: 'non-tech'
  }
]

export default function Dashboard() {
  const [selectedEmails, setSelectedEmails] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [emailTemplates, setEmailTemplates] = useState<{[key: number]: 'tech' | 'non-tech'}>(
    Object.fromEntries(dummyEmails.map(email => [email.id, email.template as 'tech' | 'non-tech']))
  )

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedEmails([])
    } else {
      setSelectedEmails(dummyEmails.map(email => email.id))
    }
    setSelectAll(!selectAll)
  }

  const handleSelectEmail = (id: number) => {
    if (selectedEmails.includes(id)) {
      setSelectedEmails(selectedEmails.filter(emailId => emailId !== id))
      setSelectAll(false)
    } else {
      setSelectedEmails([...selectedEmails, id])
      if (selectedEmails.length + 1 === dummyEmails.length) {
        setSelectAll(true)
      }
    }
  }

  const handleTemplateChange = (id: number, template: 'tech' | 'non-tech') => {
    setEmailTemplates(prev => ({
      ...prev,
      [id]: template
    }))
  }

  const handleSendEmails = () => {
    // Handle sending emails here with template information
    console.log('Sending emails to:', selectedEmails.map(id => ({
      id,
      template: emailTemplates[id]
    })))
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      {/* Email Counter */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold text-black">Emails Sent to Founders</h2>
        <p className="text-3xl font-bold mt-2 text-black">247</p>
      </div>

      {/* Email Table */}
      <div className="mb-4 bg-white rounded-lg shadow">
        <div className="p-4 flex justify-between items-center border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Filter emails..."
              className="w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-black placeholder-gray-500"
            />
          </div>
          {/* <button className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 text-black">
            <span>Columns</span>
            <ChevronDown className="h-4 w-4" />
          </button> */}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-black">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-black">
                  <div className="flex items-center space-x-1">
                    <span>Name</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-black">
                  <div className="flex items-center space-x-1">
                    <span>Email</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-black">
                  <div className="flex items-center space-x-1">
                    <span>Company Name</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-black">
                  <div className="flex items-center space-x-1">
                    <span>Template</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="w-12 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dummyEmails.map((email) => (
                <tr key={email.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedEmails.includes(email.id)}
                      onChange={() => handleSelectEmail(email.id)}
                      className="rounded border-gray-300 text-black focus:ring-black"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(email.status)}`}>
                      {email.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-black">{email.name}</td>
                  <td className="px-4 py-3 text-sm text-black">{email.email}</td>
                  <td className="px-4 py-3 text-sm text-black">{email.companyName}</td>
                  <td className="px-4 py-3 text-sm">
                    <select
                      value={emailTemplates[email.id]}
                      onChange={(e) => handleTemplateChange(email.id, e.target.value as 'tech' | 'non-tech')}
                      className="w-full p-1 border rounded-md text-black bg-white focus:ring-2 focus:ring-gray-200 focus:outline-none"
                    >
                      <option value="tech">Tech Role</option>
                      <option value="non-tech">Non-Tech Role</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-black hover:text-gray-600">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t flex justify-between items-center text-sm text-black">
          <div>{selectedEmails.length} of {dummyEmails.length} row(s) selected</div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 rounded hover:bg-gray-100 text-black">Previous</button>
            <button className="px-3 py-1 rounded hover:bg-gray-100 text-black">Next</button>
          </div>
        </div>
      </div>

      {/* Send Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSendEmails}
          disabled={selectedEmails.length === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg shadow-lg transition-all duration-200 ${
            selectedEmails.length > 0
              ? 'bg-white text-black font-sembold hover:bg-gray-800 hover:scale-105'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="h-5 w-5" />
          <span>Send Emails ({selectedEmails.length})</span>
        </button>
      </div>
    </div>
  )
}
