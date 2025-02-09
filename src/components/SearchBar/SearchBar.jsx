import './SearchBar.scss';
import { useState } from 'react';

function SearchBar({ setImages }) {
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        if (!query.trim()) return; // Basic validation for empty queries

        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=IPLaBHT-jyUlNSgsrxAeY3a5GeCGpPfmg56xMh1FZt4`);
            //  const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=DoygYeyMl3CzPHOO5c81V82VXAtjx5R_mLrT7wAHmo4`);
            if (!response.ok) { // Check if the response status is not OK
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            const formattedImages = data.results.map((img) => ({
                id: img.id,
                url: img.urls.small,
                description: img.alt_description || 'No description'
            }));
            setImages(formattedImages);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };


    return (
        <div className="search-bar text-center">
            <input
                className="border-2 px-1 focus:outline-1 focus:outline-slate-500"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search images"
            />
            <div className="py-2">
                <button
                    onClick={handleSearch}
                    className="border-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                >
                    Search
                </button>

            </div>
        </div>
    );
}

export default SearchBar;
