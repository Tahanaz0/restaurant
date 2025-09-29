import React, { useRef, useState } from "react";
import "./gallery.css";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";




const defaultImages = [
    "/images/pizza.png",
    '/images/pizz.png',
    '/images/cut.png'
];

const Gallery = () => {
    const [images, setImages] = useState(defaultImages);
    const [active, setActive] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef(null);

    const onFiles = (fileList) => {
        const files = Array.from(fileList || []);
        if (files.length === 0) return;
        const readers = files.map(
            (file) =>
                new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target.result);
                    reader.readAsDataURL(file);
                })
        );
        Promise.all(readers).then((urls) => {
            setImages((prev) => [...prev, ...urls]);
            if (active === -1 && urls.length > 0) setActive(0);
        });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        onFiles(e.dataTransfer.files);
    };

    const handleDelete = () => {
        if (images.length === 0) return;
        setImages((prev) => {
            const next = prev.filter((_, i) => i !== active);
            const nextIndex = Math.max(0, Math.min(active, next.length - 1));
            setActive(next.length === 0 ? -1 : nextIndex);
            return next;
        });
    };

    const prev = () => {
        if (images.length < 2) return;
        setActive((i) => (i <= 0 ? images.length - 1 : i - 1));
    };
    const next = () => {
        if (images.length < 2) return;
        setActive((i) => (i >= images.length - 1 ? 0 : i + 1));
    };

    const save = () => {
        // Placeholder for API call
        console.log("Saving images:", images.length);
        alert("Gallery saved (demo)");
    };

    return (
        <div className="gallery-wrap">
            <div className="drag-drop">
                <div
                    className={`uploader ${isDragging ? "dragging" : ""}`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                >
                    <input
                        type="file"
                        ref={inputRef}
                        multiple
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => onFiles(e.target.files)}
                    />
                    <div className="uploader-inner">
                        <span className="uploader-icon">📷</span>
                        <p>Drag and drop images here or click to upload</p>
                    </div>

                </div>
                <div className="uploader-actions">
                    <button className="btn-save" onClick={save}>Save</button>
                </div>
            </div>
            {images.length > 0 && (
                <div className="carousel">
                    {images.length > 1 && (
                        <button className="nav left" onClick={prev}><MdOutlineArrowBackIos />
                        </button>
                    )}
                    <div className="slide">
                        <img src={images[active]} alt="gallery" />
                        <button className="delete" title="Remove" onClick={handleDelete}><RiDeleteBin6Line />
                        </button>
                    </div>
                    {images.length > 1 && (
                        <button className="nav right" onClick={next}><MdOutlineArrowForwardIos />

                        </button>
                    )}
                    <div className="dots">
                        {images.map((_, i) => (
                            <span
                                key={i}
                                className={`dot ${i === active ? "active" : ""}`}
                                onClick={() => setActive(i)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;