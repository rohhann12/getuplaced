"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface TemplateFormProps {
  type: 'tech' | 'non-tech';
  isOpen: boolean;
  onClose: () => void;
}

const TemplateForm = ({ type, isOpen, onClose }: TemplateFormProps) => {
  const [template, setTemplate] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [domain, setDomain] = useState("");
  const [subject, setSubject] = useState("");

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-white rounded-lg">
      <div className="h-full flex flex-col p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            {type === 'tech' ? 'Tech  Template' : 'Non-Tech Template'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <label htmlFor="template-name" className="block text-sm font-medium text-gray-600 mb-1">
              Template Name
            </label>
            <input
              id="template-name"
              className="w-full p-2 bg-white text-gray-800 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
              placeholder={`e.g., ${type === 'tech' ? 'Software Engineer Template' : 'Marketing Template'}`}
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="domain" className="block text-sm font-medium text-gray-600 mb-1">
              Domain
            </label>
            <input
              id="domain"
              className="w-full p-2 bg-white text-gray-800 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
              placeholder={`e.g., ${type === 'tech' ? 'Software Development' : 'Marketing'}`}
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-600 mb-1">
              Email Subject
            </label>
            <input
              id="subject"
              className="w-full p-2 bg-white text-gray-800 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
              placeholder={`e.g., Application for ${type === 'tech' ? 'Software Engineer' : 'Marketing'} Position`}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="template" className="block text-sm font-medium text-gray-600 mb-1">
              Email Template
            </label>
            <textarea
              id="template"
              className="w-full h-48 p-2 bg-white text-gray-800 font-mono resize-none rounded-md border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
              placeholder={`Write your ${type === 'tech' ? 'tech' : 'non-tech'} role email template here...`}
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
            />
          </div>
        </div>

        <div className="pt-4 border-t mt-4">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Save Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TemplateInput() {
  const [selectedTemplate, setSelectedTemplate] = useState<'tech' | 'non-tech' | null>(null);

  return (
    <div className="relative min-h-[80vh] w-full">
  {!selectedTemplate ? (
    <div className="flex justify-center items-start min-h-[100vh] w-full">
      {/* Tech Template Box */}
      <div
        onClick={() => setSelectedTemplate('tech')}
        className="bg-white p-6 rounded-xl shadow-lg border hover:scale-105 border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
        <div className="flex flex-col items-center justify-center h-40 space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Template-1</h3>
          <p className="text-gray-600 text-center">Configure your template</p>
        </div>
      </div>

      {/* Non-Tech Template Box (commented out) */}
      {/*
      <div
        onClick={() => setSelectedTemplate('non-tech')}
        className="bg-white p-6 rounded-xl shadow-lg border hover:scale-105 border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
        <div className="flex flex-col items-center justify-center h-40 space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Non-Tech Template</h3>
          <p className="text-gray-600 text-center">Configure your template for non-technical positions</p>
        </div>
      </div>
      */}
    </div>
  ) : (
    <TemplateForm
      type={selectedTemplate}
      isOpen={true}
      onClose={() => setSelectedTemplate(null)}
    />
  )}
</div>

  );
}
