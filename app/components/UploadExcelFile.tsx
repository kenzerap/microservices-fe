'use client';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { Product } from '../models/product.model';

export default function UploadExcelFile() {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<Product[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (
      selectedFile &&
      selectedFile.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      setFile(selectedFile);
    } else {
      alert('Please upload a valid Excel file.');
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert('No file selected.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      setJsonData(json as Product[]);

      console.log(json);
    };
    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    if (jsonData.length > 0) {
      saveUploadedData(jsonData);
    }
  }, [jsonData]);

  const saveUploadedData = async (jsonData: Product[]) => {
    const response = await fetch('/api/files-upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    });

    const data = await response.json();
    console.log(data)

    if (response.ok) {
      alert('Upload successful.');
    } else {
      alert(`Failed to Upload: ${data.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-700"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload
      </button>
      {file && <p>Selected file: {file.name}</p>}
    </div>
  );
}
