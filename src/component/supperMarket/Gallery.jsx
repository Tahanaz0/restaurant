import React, { useRef, useState } from "react";
import { useTranslation } from 'react-i18next'; // 🌐 For language translation
import "./gallery.css";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md"; // ⬅️➡️ Navigation icons
import { RiDeleteBin6Line } from "react-icons/ri"; // 🗑️ Delete icon

// 🖼️ Default demo images (initial gallery)
const defaultImages = [
    "/images/pizza.png",
    '/images/pizz.png',
    '/images/cut.png'
];

// ✅ Main Gallery component
const Gallery = () => {
    const { t } = useTranslation(); // Hook for translations
    const [images, setImages] = useState(defaultImages); // State for image list
    const [active, setActive] = useState(0); // Tracks currently displayed image
    const [isDragging, setIsDragging] = useState(false); // For drag-drop state styling
    const inputRef = useRef(null); // File input reference (for triggering file picker)

    // 📤 Handle uploaded files (convert them to Base64 URLs)
    const onFiles = (fileList) => {
        const files = Array.from(fileList || []);
        if (files.length === 0) return;

        // Read all files asynchronously using FileReader
        const readers = files.map(
            (file) =>
                new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target.result);
                    reader.readAsDataURL(file);
                })
        );

        // After all files are read, add them to the gallery
        Promise.all(readers).then((urls) => {
            setImages((prev) => [...prev, ...urls]);
            if (active === -1 && urls.length > 0) setActive(0);
        });
    };

    // 📥 Handle drop event for drag-and-drop upload
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        onFiles(e.dataTransfer.files);
    };

    // 🗑️ Delete current active image from gallery
    const handleDelete = () => {
        if (images.length === 0) return;
        setImages((prev) => {
            const next = prev.filter((_, i) => i !== active);
            const nextIndex = Math.max(0, Math.min(active, next.length - 1));
            setActive(next.length === 0 ? -1 : nextIndex);
            return next;
        });
    };

    // ⬅️ Navigate to previous image
    const prev = () => {
        if (images.length < 2) return;
        setActive((i) => (i <= 0 ? images.length - 1 : i - 1));
    };

    // ➡️ Navigate to next image
    const next = () => {
        if (images.length < 2) return;
        setActive((i) => (i >= images.length - 1 ? 0 : i + 1));
    };

    // 💾 Placeholder save function (can be replaced with API call)
    const save = () => {
        console.log("Saving images:", images.length);
        alert("Gallery saved (demo)");
    };

    return (
        <div className="gallery-wrap">
            {/* ===== File Upload Section ===== */}
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
                    {/* Hidden file input (triggered by clicking the upload box) */}
                    <input
                        type="file"
                        ref={inputRef}
                        multiple
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => onFiles(e.target.files)}
                    />

                    {/* 📷 Upload area with text */}
                    <div className="uploader-inner">
                        <span className="uploader-icon">📷</span>
                        <p>{t('dragDropImages')}</p>
                    </div>
                </div>

                {/* 💾 Save button */}
                <div className="uploader-actions">
                    <button className="btn-save" onClick={save}>
                        {t('save')}
                    </button>
                </div>
            </div>

            {/* ===== Image Carousel Section ===== */}
            {images.length > 0 && (
                <div className="carousel">
                    {/* Left arrow navigation */}
                    {images.length > 1 && (
                        <button className="nav left" onClick={prev}>
                            <MdOutlineArrowBackIos />
                        </button>
                    )}

                    {/* 🖼️ Current image display */}
                    <div className="slide">
                        <img src={images[active]} alt="gallery" />
                        {/* 🗑️ Delete button for active image */}
                        <button className="delete" title={t('remove')} onClick={handleDelete}>
                            <RiDeleteBin6Line />
                        </button>
                    </div>

                    {/* Right arrow navigation */}
                    {images.length > 1 && (
                        <button className="nav right" onClick={next}>
                            <MdOutlineArrowForwardIos />
                        </button>
                    )}

                    {/* 🔘 Dots navigation (indicates active image) */}
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
