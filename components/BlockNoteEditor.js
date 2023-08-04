'use client'; // this registers <Editor> as a Client Component
import { BlockNoteEditor } from '@blocknote/core';
import { BlockNoteView, useBlockNote } from '@blocknote/react';
import '@blocknote/core/style.css';
import { useState } from 'react';

// Our <Editor> component we can reuse later
export default function MyBlockNoteEditor({ ...props }) {
    const { id, onChange = () => {}, propValue = '' } = props;
    // Creates a new editor instance.
    const editor = useBlockNote({
        theme: 'dark',
        // Listens for when the editor's contents change.
        onEditorContentChange: (editor) => {
            // Converts the editor's contents from Block objects to Markdown and
            // saves them.
            const saveBlocksAsMarkdown = async () => {
                const markdown = await editor.blocksToMarkdown(editor.topLevelBlocks);
                onChange(markdown);
            };
            saveBlocksAsMarkdown();
        },
    });

    // Renders the editor instance using a React component.
    return <BlockNoteView id={id} editor={editor} />;
}
