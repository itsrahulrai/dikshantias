"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (content: string) => void;
}) {
  const editorRef = useRef(null);

  return (
    <div className="w-full">
      <Editor
        apiKey="nem2benxflhzoqa897i6yv6u492wfl4d5xpj09u6c1rroe7o" // free mode (no account needed)
        onInit={(_evt, editor) => (editorRef.current = editor)}
        value={value}
        onEditorChange={(newValue) => onChange(newValue)}
        init={{
          height: 300,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | image media link table | code fullscreen preview | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
}
