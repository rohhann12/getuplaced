import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import axios from 'axios';

interface Data {
  id: number;
  ctoName: string;
  email: string;
  companyName: string;
  status: string;
  template: 'tech' | 'non-tech';
}

interface DashboardProps {
  prop: Data[];
  calls: number;
}

export default function Dashboard({ prop,calls }: DashboardProps) {
 const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [emailTemplates, setEmailTemplates] = useState<Record<number, 'tech' | 'non-tech'>>({});
  const [selectedData, setSelectedData] = useState<Data[]>([]);

  // basically every click pr we check ki leng of array is equal to 5 ya ni
  useEffect(() => {
    if (Array.isArray(prop)) {
      const templates = Object.fromEntries(prop.map(email => [email.id, email.template,email.companyName,email.ctoName,email.email]));
      setEmailTemplates(templates);
    }
  }, [prop]);
  // const handleSelectAll = () => {
  //   setSelectedEmails(selectAll ? [] : prop.map(email => email.id));
  //   setSelectAll(!selectAll);
  // };
  const handleSelectAll = () => {
    const isSelectingAll = !selectAll;
    setSelectAll(isSelectingAll);
  
    if (isSelectingAll) {
      const allIds = prop.map(email => email.id);
      setSelectedEmails(allIds);
      setSelectedData(prop); // all data selected
    } else {
      setSelectedEmails([]);
      setSelectedData([]); // none selected
    }
  };
  
  
  const handleSelectEmail = (id: number) => {
    setSelectedEmails(prev => {
      const updated = prev.includes(id)
        ? prev.filter(emailId => emailId !== id)
        : [...prev, id];
  
      // Get the full email object
      const emailData = prop.find(e => e.id === id);
  
      // Update selectedData
      setSelectedData(prevData => {
        if (updated.includes(id)) {
          return prevData.some(e => e.id === id)
            ? prevData
            : [...prevData, emailData!];
        } else {
          return prevData.filter(e => e.id !== id);
        }
      });
  
      // Update selectAll
      setSelectAll(updated.length === prop.length);
      return updated;
    });
  };
  
  
  // ismei bhi har usko ek state deni padegi warna woh ek se hie sarein change kredera
  const handleTemplateChange = (id: number, template: 'tech') => {
    setEmailTemplates(prev => ({ ...prev, [id]: template }));
  };

  const handleSendEmails = async () => {
    const payload = selectedData.map(entry => ({
      id: entry.id,
      name: entry.ctoName,
      email: entry.email,
      company: entry.companyName,
      template: emailTemplates[entry.id]
    }));
  
    console.log('Sending prop to:', payload);
  
    // Send to backend
    // await axios.post("/api/users/prop/sender", payload);
  };
  
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="p-6">
      {/* Email Counter */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold text-black">Emails Sent to Founders</h2>
        <p className="text-3xl font-bold mt-2 text-black">{calls}</p>
      </div>

      {/* Email Table */}
      <div className="mb-4 bg-white rounded-lg shadow">
        <div className='p-4 rounded-xl'>
          
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
                <th className="px-4 py-3 text-left text-sm font-medium text-black">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-black">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-black">Company Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-black">Template</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Array.isArray(prop) ? prop.map((email) => (
                <tr key={email.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {/* <input
                      type="checkbox"
                      checked={selectedEmails.includes(email.id)}
                      onChange={() => handleSelectEmail(email.id)}
                      className="rounded border-gray-300 text-black focus:ring-black"
                    /> */}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1.5 rounded-full text-sm font-medium ${getStatusColor(email.status)}`}>
                      Verified
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-black">{email.ctoName}</td>
                  <td className="px-4 py-3 text-sm text-black">{email.email}</td>
                  <td className="px-4 py-3 text-sm text-black">{email.companyName}</td>
                  <td className="px-4 py-3 text-sm">
                    <select
                      value={emailTemplates[email.id]}
                      onChange={(e) => handleTemplateChange(email.id, e.target.value as 'tech')}
                      className="w-full p-1 border rounded-md text-black bg-white focus:ring-2 focus:ring-gray-200 focus:outline-none"
                    >
                      <option value="tech">Template 1</option>
                    </select>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500">No prop to display</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t flex justify-between items-center text-sm text-black">
          <div>{selectedEmails.length} of {prop.length} row(s) selected</div>
          {/* <div className="flex space-x-2">
            <button className="px-3 py-1 rounded hover:bg-gray-100 text-black">Previous</button>
            <button className="px-3 py-1 rounded hover:bg-gray-100 text-black">Next</button>
          </div> */}
        </div>
      </div>

      {/* Send Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSendEmails}
          disabled={selectedEmails.length === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg shadow-lg transition-all duration-200 ${
            selectedEmails.length > 0
              ? 'bg-white text-black font-semibold hover:bg-gray-800 hover:text-white hover:scale-105'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="h-5 w-5" />
          <span>Send Emails ({selectedEmails.length})</span>
        </button>
      </div>
    </div>
  );
}
