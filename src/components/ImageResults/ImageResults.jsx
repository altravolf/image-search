import './ImageResults.scss';

function ImageResults({ images, setSelectedImage }) {
    return (
        <div className="image-results">
            {images.map((image) => (
                <div key={image.id} className="image-result">
                    <img src={image.url} alt={image.description} />
                    <button
                        onClick={() => {
                            console.log("Selected Image on Click:", image); // Log selected image
                            setSelectedImage(image);
                        }}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Add Captions
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ImageResults;
