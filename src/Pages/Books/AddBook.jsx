import React, { useState } from 'react';
import { useFirebase } from '../../context/firebase';
import { Languages } from 'lucide-react';


//    Publisher,
// Languages,
// Pages,
// ISBN,
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

    const categories = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Children', 'Mystery'];
    const languages = ['English','Hindi','Marathi','Sanskrit', 'Spanish', 'French', 'German', 'Italian'];


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
                        imageBase64, // Pass the encoded base64 string
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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add a New Book</h2>

                {message && (
                    <p
                        className={`text-center text-sm mb-4 ${
                            message.includes('success') ? 'text-green-500' : 'text-red-500'
                        }`}
                    >
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Book Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter book name"
                            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Author</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Enter author name"
                            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Publisher</label>
                        <input
                            type="text"
                            value={Publisher}
                            onChange={(e) => setPublisher(e.target.value)}
                            placeholder="Enter Publisher Name"
                            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter price"
                            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pages</label>
                        <input
                            type="number"
                            value={pages}
                            onChange={(e) => setPages(e.target.value)}
                            placeholder="Enter numbers of Pages"
                            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Isbn</label>
                        <input
                            type="number"
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                            placeholder="Enter isbn if book"
                            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter book description"
                            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                            rows="4"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-300"
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
                        <label className="block text-sm font-medium text-gray-700">Languages</label>
                        <select
                            value={Languages}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-300"
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


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-2 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-600 focus:outline-none"
                    >
                        {loading ? 'Submitting...' : 'Add Book'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBook;
