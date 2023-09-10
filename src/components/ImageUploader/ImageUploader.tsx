import React, { type ChangeEvent, useRef, useState } from 'react'

interface ImageUploaderProps {
  filesLength?: number
  onChange: (files: File[]) => void
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ filesLength, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])
    const updatedFiles = [...selectedFiles, ...files]
    setSelectedFiles(updatedFiles)
    event.target.value = ''
    onChange(updatedFiles)
  }

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  const handleRemoveImage = (file: File) => {
    const updatedFiles = selectedFiles.filter((f) => f !== file)
    setSelectedFiles(updatedFiles)
    onChange(updatedFiles)
  }

  return (
    <div className="flex flex-wrap">
      {
        selectedFiles.length > 0 && selectedFiles.map((file, idx) => (
          <div
            key={`${file.name}-${idx}`}
            className="relative w-16 h-16 mr-1">
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded"
              className="w-16 h-16 rounded-md object-cover" />
            <button
              type="button"
              className="absolute top-0 right-0 m-1 p-1 bg-red-500 text-white rounded-full text-sm"
              onClick={() => { handleRemoveImage(file) }}
            >
              X
            </button>
          </div>
        ))
      }
      {!filesLength || filesLength > selectedFiles.length ?
        (
          <div className="relative w-16 h-16 border-2 border-gray-400 rounded-md cursor-pointer">
            <input
              ref={inputRef}
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              multiple
              onChange={handleFileChange}
            />

            <button
              type="button"
              className="w-full h-full"
              onClick={handleButtonClick}>
              <div className="flex justify-center items-center w-full h-full">
                <span className="text-4xl text-gray-400">+</span>
              </div>
            </button>
          </div>
        ) : (<></>)
      }
    </div>
  )
}

export default ImageUploader
