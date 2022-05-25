import { Editor as TinyMCEReact } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';

export interface EditorProps {
  initialValue: string;
  config?: Record<string, any>;
  handleInit?: (_: any, editor: TinyMCEEditor) => TinyMCEEditor;
  handleDirty?: () => void;
}

export default function Editor({ initialValue, config, handleInit, handleDirty }: EditorProps) {
  return (
    <TinyMCEReact
      apiKey="h6zx6v4ezz08lvqgu51lpzn82ifynz3gtds1ak2pgnukq2yl"
      onInit={handleInit}
      onDirty={handleDirty}
      initialValue={initialValue}
      init={config}
    />
  )
}
