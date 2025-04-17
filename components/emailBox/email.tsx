import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import axios from 'axios';

interface Email {
  id: number;
  ctoName: string;
  email: string;
  companyName: string;
  status: string;
  template: 'tech' | 'non-tech';
}

interface DashboardProps {
  emails: Email[];
}

export default function Dashboard({ emails }: DashboardProps) {
  const [sent, setSent] = useState<number>(0);
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [emailTemplates, setEmailTemplates] = useState<Record<number, 'tech' | 'non-tech'>>({});

  useEffect(() => {
    if (Array.isArray(emails)) {
      const templates = Object.fromEntries(emails.map(email => [email.id, email.template]));
      setEmailTemplates(templates);
    }
  }, [emails]);

  const emailCounter = async () => {
    try {
      const response = await axios.get('/api/users/dashboard');
      setSent(0);
    } catch (error) {
      console.error('Failed to fetch email count:', error);
    }
  };

  useEffect(() => {
    emailCounter();
  }, []);

  const handleSelectAll = () => {
    setSelectedEmails(selectAll ? [] : emails.map(email => email.id));
    setSelectAll(!selectAll);
  };

  const handleSelectEmail = (id: number) => {
    setSelectedEmails(prev => {
      const updated = prev.includes(id)
        ? prev.filter(emailId => emailId !== id)
        : [...prev, id];
  
      setSelectAll(updated.length === emails.length);
      return updated;
    });
  };

  const handleTemplateChange = (id: number, template: 'tech' | 'non-tech') => {
    setEmailTemplates(prev => ({ ...prev, [id]: template }));
  };

  const handleSendEmails =async () => {
    const payload = selectedEmails.map(id => ({
      id,
      template: emailTemplates[id]
    }));
    const send=await axios.post("/api/users/emails/sender",{

    })
    console.log('Sending emails to:', payload);
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
        <p className="text-3xl font-bold mt-2 text-black">{sent}</p>
      </div>

      {/* Email Table */}
      <div className="mb-4 bg-white rounded-lg shadow">

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
              {Array.isArray(emails) ? emails.map((email) => (
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
                  <td className="px-4 py-3 text-sm text-black">{email.ctoName}</td>
                  <td className="px-4 py-3 text-sm text-black">{email.email}</td>
                  <td className="px-4 py-3 text-sm text-black">{email.companyName}</td>
                  <td className="px-4 py-3 text-sm">
                    <select
                      value={emailTemplates[email.id]}
                      onChange={(e) => handleTemplateChange(email.id, e.target.value as 'tech' | 'non-tech')}
                      className="w-full p-1 border rounded-md text-black bg-white focus:ring-2 focus:ring-gray-200 focus:outline-none"
                    >
                      <option value="tech">Tech</option>
                      <option value="non-tech">Non-Tech</option>
                    </select>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500">No emails to display</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t flex justify-between items-center text-sm text-black">
          <div>{selectedEmails.length} of {emails.length} row(s) selected</div>
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
