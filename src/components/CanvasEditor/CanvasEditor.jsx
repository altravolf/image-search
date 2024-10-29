import './CanvasEditor.scss';
import { useRef, useEffect, useState } from 'react';
import { FiType, FiSquare } from 'react-icons/fi';

function CanvasEditor({ selectedImage, setCanvasInstance }) {
    const canvasRef = useRef(null);
    const [fabric, setFabric] = useState(null);

    useEffect(() => {
        import('fabric').then((fabricModule) => {
            setFabric(fabricModule.fabric);
            console.log("Fabric imported successfully");
        });
    }, []);

    useEffect(() => {
        if (!fabric || !canvasRef.current) return;

        // Set canvas dimensions based on the viewport size for responsive behavior
        const canvasWidth = window.innerWidth > 1024 ? 800 : window.innerWidth * 0.9;
        const canvasHeight = window.innerWidth > 1024 ? 600 : canvasWidth * 0.75;

        // Clean up any existing canvas instance
        const existingCanvas = fabric.Canvas.instances.find(c => c.lowerCanvasEl === canvasRef.current);
        if (existingCanvas) {
            existingCanvas.dispose();
        }

        const canvas = new fabric.Canvas(canvasRef.current, {
            width: canvasWidth,
            height: canvasHeight,
            backgroundColor: '#f3f4f6',
        });
        setCanvasInstance(canvas);

        // Add the selected image to the canvas if available
        if (selectedImage && selectedImage.url) {
            fabric.Image.fromURL(
                selectedImage.url,
                (img) => {
                    if (!img) {
                        console.error("Failed to load image.");
                        return;
                    }
                    img.set({
                        selectable: false,
                        left: (canvasWidth - img.width * 0.5) / 2, // Center the image horizontally
                        top: (canvasHeight - img.height * 0.5) / 2, // Center the image vertically
                        scaleX: 0.5, // Adjust scale if needed
                        scaleY: 0.5,
                    });
                    canvas.add(img);
                    canvas.renderAll();
                    console.log("Image added to canvas:", selectedImage.url);
                },
                { crossOrigin: 'anonymous' }
            );
        } else {
            console.warn("Selected image is invalid or does not have a URL.");
        }

        // Cleanup the canvas instance on unmount
        return () => {
            canvas.dispose();
        };
    }, [fabric, selectedImage, setCanvasInstance]);

    const addText = () => {
        if (!fabric || !canvasRef.current) return;
        const text = new fabric.Textbox('Edit me!', {
            left: 50,
            top: 50,
            fontSize: 20,
            fill: '#000',
        });
        setCanvasInstance((prevCanvas) => {
            prevCanvas.add(text);
            prevCanvas.renderAll();
            return prevCanvas;
        });
    };

    const addRectangle = () => {
        if (!fabric || !canvasRef.current) return;
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            width: 100,
            height: 100,
            fill: 'blue',
        });
        setCanvasInstance((prevCanvas) => {
            prevCanvas.add(rect);
            prevCanvas.renderAll();
            return prevCanvas;
        });
    };

    return (
        <div className="canvas-editor my-4 flex flex-col items-center">
            <div className="flex justify-center space-x-4 mb-4">
                <button
                    onClick={addText}
                    className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    <FiType className="inline-block" />
                    <span>Add Text</span>
                </button>
                <button
                    onClick={addRectangle}
                    className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    <FiSquare className="inline-block" />
                    <span>Add Rectangle</span>
                </button>
            </div>
            <div className="canvas-wrapper border border-gray-300 rounded-lg shadow-md w-full max-w-screen-lg">
                <canvas ref={canvasRef} className="w-full h-full" />
            </div>
        </div>
    );
}

export default CanvasEditor;
