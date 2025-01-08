// src/Tiptap.tsx
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Paragraph from '@tiptap/extension-paragraph';
import Heading from '@tiptap/extension-heading';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Paragraph,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: '<p>Write your poem here...</p>',
    autofocus: true,
  });

  const handleSubmit = () => {
    if (editor) {
      const htmlContent = editor.getHTML();
      console.log('Formatted content:', htmlContent);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="editor-container">
        {editor && (
          <>
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()}>
                Bold
              </button>
              <button onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()}>
                Italic
              </button>
              <button onClick={() => editor.chain().focus().toggleUnderline().run()} disabled={!editor.can().chain().focus().toggleUnderline().run()}>
                Underline
              </button>
            </BubbleMenu>
            <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <button onClick={() => editor.chain().focus().toggleBulletList().run()}>Bullet List</button>
              <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>Ordered List</button>
              <button onClick={() => editor.chain().focus().setParagraph().run()}>Paragraph</button>
              <button onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}>Heading 1</button>
              <button onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}>Heading 2</button>
            </FloatingMenu>
          </>
        )}
        <EditorContent editor={editor} />
      </div>
      <button onClick={handleSubmit} style={{ marginTop: '20px', padding: '10px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px' }}>
        Submit
      </button>
    </div>
  );
};

export default Tiptap;
