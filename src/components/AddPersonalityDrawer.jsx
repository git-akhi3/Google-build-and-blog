import React, { useState } from 'react';
const AddPersonalityDrawer = ({ isOpen, onClose }) => {
 const [formData, setFormData] = useState({
   figure: '',
   context: '',
   era: '',
   field: '',
   personality: '',
   quirks: '',
   humorTopics: '',
   image: ''
 });
  const handleSubmit = (e) => {
   e.preventDefault();
   // Handle form submission here
   console.log(formData);
   onClose();
 };
  return (
   <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
     isOpen ? 'translate-x-0' : 'translate-x-full'
   }`}>
     <div className="h-full flex flex-col">
       <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
         <h2 className="text-xl font-bold">Add New Personality</h2>
         <button onClick={onClose} className="text-white hover:text-gray-200">
           ✕
         </button>
       </div>
        <div className="flex-1 overflow-y-auto p-4">
         <form onSubmit={handleSubmit} className="space-y-4">
           <div>
             <label className="block text-sm font-medium text-gray-700">Name</label>
             <input
               type="text"
               value={formData.figure}
               onChange={(e) => setFormData({...formData, figure: e.target.value})}
               className="mt-1 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
             />
           </div>
            <div>
             <label className="block text-sm font-medium text-gray-700">Context</label>
             <textarea
               value={formData.context}
               onChange={(e) => setFormData({...formData, context: e.target.value})}
               className="mt-1 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
               rows="3"
             />
           </div>
            <div>
             <label className="block text-sm font-medium text-gray-700">Era</label>
             <input
               type="text"
               value={formData.era}
               onChange={(e) => setFormData({...formData, era: e.target.value})}
               className="mt-1 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
             />
           </div>
            <div>
             <label className="block text-sm font-medium text-gray-700">Field</label>
             <input
               type="text"
               value={formData.field}
               onChange={(e) => setFormData({...formData, field: e.target.value})}
               className="mt-1 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
             />
           </div>
            <div>
             <label className="block text-sm font-medium text-gray-700">Personality</label>
             <textarea
               value={formData.personality}
               onChange={(e) => setFormData({...formData, personality: e.target.value})}
               className="mt-1 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
               rows="2"
             />
           </div>
            <div>
             <label className="block text-sm font-medium text-gray-700">Quirks</label>
             <textarea
               value={formData.quirks}
               onChange={(e) => setFormData({...formData, quirks: e.target.value})}
               className="mt-1 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
               rows="2"
             />
           </div>
            <div>
             <label className="block text-sm font-medium text-gray-700">Humor Topics</label>
             <textarea
               value={formData.humorTopics}
               onChange={(e) => setFormData({...formData, humorTopics: e.target.value})}
               className="mt-1 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
               rows="2"
             />
           </div>
            <div>
             <label className="block text-sm font-medium text-gray-700">Image URL</label>
             <input
               type="text"
               value={formData.image}
               onChange={(e) => setFormData({...formData, image: e.target.value})}
               className="mt-1 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
             />
           </div>
            <button
             type="submit"
             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
           >
             Add Personality
           </button>
         </form>
       </div>
     </div>
   </div>
 );
}
export default AddPersonalityDrawer;