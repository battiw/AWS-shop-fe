import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3, 0, 3),
  },
}));

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const classes = useStyles();
  const [file, setFile] = useState<any>();

  const onFileChange = (e: any) => {
    console.log(e);
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    setFile(files.item(0));
  };

  const removeFile = () => {
    setFile("");
  };

  const uploadFile = async (e: any) => {
    // Get the presigned URL
    const response = await axios({
      method: "GET",
      // url: "https://645gkyvbe9.execute-api.eu-west-1.amazonaws.com/dev/import", // using WP
      url: "https://sfc4iwmuik.execute-api.eu-west-1.amazonaws.com/dev/import", // without WP
      // url,
      params: {
        name: encodeURIComponent(file.name),
      },
    });
    console.log("File to upload: ", file.name);
    console.log("File to upload1: ", file);
    console.log("Uploading to: ", response.data);
    console.log("Uploading to1: ", response);
    console.log("Uploading to2: ", response.data.url);
    const result = await fetch(response.data, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": "text/csv",
      },
    });
    console.log("Result: ", result);
    setFile("");
  };
  return (
    <div className={classes.content}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </div>
  );
}
