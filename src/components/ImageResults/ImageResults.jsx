import './ImageResults.scss';

function ImageResults({ images, setSelectedImage }) {
    return (
        <div className="image-results">
            {images.map((image) => (
                <div key={image.id} className="image-result">
                    <img src={image.url} alt={image.description} />
                    <button onClick={() => setSelectedImage(image)}>Add Captions</button>
                </div>
            ))}

        </div>
    );
}
export default ImageResults;
