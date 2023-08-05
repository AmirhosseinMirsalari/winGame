import { Box } from "@mui/material";
import { convertFromRaw, Editor, EditorState } from "draft-js";

const Description = ({ description }: { description: string }) => {
  const contentState = convertFromRaw(JSON.parse(description));
  const editorState = EditorState.createWithContent(contentState);
  return (
    <Box
      sx={{
        fontFamily: "iranyekan",
        color: "common.digitaBlack",
        textAlign: "justify",
        lineHeight: "50px"
      }}
    >
      <Editor editorState={editorState} readOnly onChange={() => {}} />
    </Box>
  );
};

export default Description;
