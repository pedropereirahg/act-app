import { useRef, useState, useEffect, MouseEventHandler } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';

export type UseEditorFn = [boolean, MouseEventHandler<HTMLElement>, Record<string, any>]

export default function useEditor(initialValue: string, callbackSave = console.log, defaultConfig = {}): UseEditorFn {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [editorIsDirty, setEditorIsDirty] = useState(false);

  useEffect(
    () => setEditorIsDirty(false),
    [initialValue]
  );

  const onEditorSave = (): MouseEventHandler<HTMLElement> | undefined => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setEditorIsDirty(false);
      editorRef.current.setDirty(false);
      callbackSave(content);
      return
    }
  };

  const handleInit = (_: any, editor: TinyMCEEditor) => editorRef.current = editor

  const handleDirty = (): void => setEditorIsDirty(true)

  const config: Record<string, any> = {
    height: 200,
    menubar: false,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
    ],
    toolbar: 'undo redo | blocks | ' +
      'bold italic forecolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
    ...defaultConfig
  }

  const editorConfig = { handleInit, handleDirty, config }

  return [editorIsDirty, onEditorSave, editorConfig];
}
