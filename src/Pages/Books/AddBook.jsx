import React, { useState } from 'react';
import { useFirebase } from '../../context/firebase';
import { 
  Book, 
  User, 
  DollarSign, 
  FileText, 
  Building, 
  Globe, 
  Hash, 
  BookOpen,
  Bookmark,
  Image as ImageIcon,
  Save,
  AlertCircle
} from 'lucide-react';

const AddBook = () => {
    const firebase = useFirebase();
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [Publisher, setPublisher] = useState('');
    const [language, setLanguage] = useState('');
    const [pages, setPages] = useState('');
    const [isbn, setIsbn] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const categories = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Children', 'Mystery'];
    const languages = ['English','Hindi','Marathi','Sanskrit', 'Spanish', 'French', 'German', 'Italian'];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!image || !name || !author || !price || !description || !category) {
            setMessage('All fields are required!');
            return;
        }
    
        try {
            setLoading(true);
    
            let imageBase64 = "";
            if (image) {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    imageBase64 = reader.result.split(",")[1]; // Base64 string
                    const docRef = await firebase.HandleCreateNewBook(
                        name,
                        category,
                        price,
                        author,
                        imageBase64,
                        description,
                        Publisher,
                        language,
                        pages,
                        isbn
                    );
    
                    setMessage('Book added successfully with ID: ' + docRef);
                    setName('');
                    setAuthor('');
                    setPrice('');
                    setImage(null);
                    setImagePreview(null);
                    setDescription('');
                    setCategory('');
                    setPublisher('');
                    setLanguage('');
                    setPages('');
                    setIsbn('');
                };
                reader.readAsDataURL(image);
            }
        } catch (error) {
            setMessage('Error adding book: ' + error.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen bg-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl bg-white p-8 shadow-lg rounded-lg border-2 border-orange-400">
                <h2 className="text-3xl font-extrabold text-center text-orange-600 mb-8 flex items-center justify-center">
                    <Book className="h-8 w-8 mr-2" />
                    Add a New Book
                </h2>

                {message && (
                    <div className={`flex items-center justify-center mb-6 p-3 rounded ${
                        message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <p>{message}</p>
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Column */}
                    <div className="w-full md:w-1/2 space-y-6">
                        <div className="border-2 border-orange-200 p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold text-orange-800 mb-4 border-b border-orange-200 pb-2">
                                Basic Information
                            </h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center text-sm font-medium text-orange-700 mb-1">
                                        <Book className="h-4 w-4 mr-2" />
                                        Book Name
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter book name"
                                        className="w-full px-3 py-2 border border-orange-300 rounded-md focus:ring focus:ring-orange-300 focus:border-orange-500"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center text-sm font-medium text-orange-700 mb-1">
                                        <User className="h-4 w-4 mr-2" />
                                        Author
                                    </label>
                                    <input
                                        type="text"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        placeholder="Enter author name"
                                        className="w-full px-3 py-2 border border-orange-300 rounded-md focus:ring focus:ring-orange-300 focus:border-orange-500"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center text-sm font-medium text-orange-700 mb-1">
                                        <Building className="h-4 w-4 mr-2" />
                                        Publisher
                                    </label>
                                    <input
                                        type="text"
                                        value={Publisher}
                                        onChange={(e) => setPublisher(e.target.value)}
                                        placeholder="Enter Publisher Name"
                                        className="w-full px-3 py-2 border border-orange-300 rounded-md focus:ring focus:ring-orange-300 focus:border-orange-500"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center text-sm font-medium text-orange-700 mb-1">
                                        <DollarSign className="h-4 w-4 mr-2" />
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Enter price"
                                        className="w-full px-3 py-2 border border-orange-300 rounded-md focus:ring focus:ring-orange-300 focus:border-orange-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="flex items-center text-sm font-medium text-orange-700 mb-1">
                                        <FileText className="h-4 w-4 mr-2" />
                                        Description
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter book description"
                                        className="w-full px-3 py-2 border border-orange-300 rounded-md focus:ring focus:ring-orange-300 focus:border-orange-500"
                                        rows="4"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-full md:w-1/2 space-y-6">
                        <div className="border-2 border-orange-200 p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold text-orange-800 mb-4 border-b border-orange-200 pb-2">
                                Additional Details
                            </h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center text-sm font-medium text-orange-700 mb-1">
                                        <BookOpen className="h-4 w-4 mr-2" />
                                        Pages
                                    </label>
                                    <input
                                        type="number"
                                        value={pages}
                                        onChange={(e) => setPages(e.target.value)}
                                        placeholder="Enter number of pages"
                                        className="w-full px-3 py-2 border border-orange-300 rounded-md focus:ring focus:ring-orange-300 focus:border-orange-500"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center text-sm font-medium text-orange-700 mb-1">
                                        <Hash className="h-4 w-4 mr-2" />
                                        ISBN
                                    </label>
                                    <input
                                        type="text"
                                        value={isbn}
                                        onChange={(e) => setIsbn(e.target.value)}
                                        placeholder="Enter ISBN of book"
                                        className="w-full px-3 py-2 border border-orange-300 rounded-md focus:ring focus:ring-orange-300 focus:border-orange-500"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center text-sm font-medium text-orange-700 mb-1">
                                        <Bookmark className="h-4 w-4 mr-2" />
                                        Category
                                    </label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-3 py-2 border border-orange-300 rounded-md focus:ring focus:ring-orange-300 focus:border-orange-500"
                                    >
                                        <option value="" disabled>
                                            Select a category
                                        </option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="flex items-center text-sm font-medium text-orange-700 mb-1">
                                        <Globe className="h-4 w-4 mr-2" />
                                        Language
                                    </label>
                                    <select
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="w-full px-3 py-2 border border-orange-300 rounded-md focus:ring focus:ring-orange-300 focus:border-orange-500"
                                    >
                                        <option value="" disabled>
                                            Select a Language
                                        </option>
                                        {languages.map((lan) => (
                                            <option key={lan} value={lan}>
                                                {lan}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="flex items-center text-sm font-medium text-orange-700 mb-1">
                                        <ImageIcon className="h-4 w-4 mr-2" />
                                        Book Cover Image
                                    </label>
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        className="w-full px-3 py-2 border border-orange-300 rounded-md focus:ring focus:ring-orange-300 focus:border-orange-500"
                                    />
                                    {imagePreview && (
                                        <div className="mt-2">
                                            <img 
                                                src={imagePreview} 
                                                alt="Book preview" 
                                                className="h-32 object-cover border border-orange-300 rounded-md"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center justify-center px-6 py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-colors duration-200"
                    >
                        <Save className="h-5 w-5 mr-2" />
                        {loading ? 'Submitting...' : 'Add Book'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddBook;