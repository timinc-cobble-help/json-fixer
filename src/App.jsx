import Page from "./components/structure/Page";
import { FileUploader } from "react-drag-drop-files";
import "./style.scss";
import { useCallback, useMemo, useState } from "react";
import { jsonrepair } from "jsonrepair";
import downloadFile from "downloadfile-js";

function App() {
  const [input, setInput] = useState("");

  const output = useMemo(() => {
    try {
      return JSON.stringify(JSON.parse(jsonrepair(input)), null, 2)
    } catch (error) {
      return ""
    }
  }, [input]);

  const handleUpload = useCallback((file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target.result;
      setInput(fileContent);
    };

    reader.readAsText(file);
  }, []);

  const handleDownload = useCallback(() => {
    downloadFile(output, "output.json", "application/json")
  }, [output]);

  return <Page name="Tim's JSON Fixer">
    <p>So, you&apos;re working with a JSON file and having trouble getting the syntax right. Come on over this way, drop your file in the text area on the left, and I&apos;ll do my best to fix it on the right.</p>
    <p>Don&apos;t worry, you&apos;re not uploading your file to a server somewhere, you&apos;re just loading it into your browser.</p>
    <div className="flex flex-row grow gap-1">
      <div className="flex flex-col basis-0 grow gap-1">
        <div className="flex flex-row gap-1">
          <FileUploader classes="mb-0" types={["json"]} hoverTitle="Drop" handleChange={handleUpload}>
            Upload your file
          </FileUploader>
        </div>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className="grow" style={{ resize: "none" }}></textarea>
      </div>
      <div className="flex flex-col basis-0 grow gap-1">
        <div className="flex flex-row justify-end gap-1">
          <button onClick={handleDownload}>Download fixed file</button>
        </div>
        <textarea value={output} readOnly className="grow" style={{ resize: "none" }}></textarea>
      </div>
    </div>
  </Page>;
}

export default App;
