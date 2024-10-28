import './DownloadButton.scss';
import { FiDownload } from 'react-icons/fi';

function DownloadButton({ canvasInstance }) {
    const handleDownload = () => {
        if (canvasInstance.current) {
            const dataUrl = canvasInstance.current.toDataURL({
                format: 'png',
                quality: 1,
            });
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'edited-image.png';
            link.click();
            console.log("Canvas image downloaded");
        } else {
            console.error("Canvas instance is null.");
        }
    };

    return (
        <button
            onClick={handleDownload}
            className="flex items-center justify-center px-4 py-2 mt-4 bg-purple-600 text-white rounded shadow-md hover:bg-purple-700 transition duration-300"
        >
            <FiDownload className="mr-2" />
            Download
        </button>
    );
}

export default DownloadButton;
