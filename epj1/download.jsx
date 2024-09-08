function FileDownload() {
    const [fileName, setFileName] = useState('');
  
    const handleFileDownload = () => {
      // Replace 'http://localhost:8080' with your Spring Boot API URL
      const url = 'http://localhost:8080/api/files/download/${fileName}';
      window.location.href = url; // Triggers file download
    };
  
    return (
      <div>
        <input type="text" placeholder="Enter file name" onChange={(e) => setFileName(e.target.value)} />
        <button onClick={handleFileDownload}>Download File</button>
      </div>
    );
  }
  
  export default FileDownload;