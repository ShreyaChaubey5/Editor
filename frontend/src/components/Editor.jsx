import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
// Added missing extensions for your requirements
import Underline from '@tiptap/extension-underline';
import {TextStyle} from '@tiptap/extension-text-style';
import {Color} from '@tiptap/extension-color';
import {FontFamily} from '@tiptap/extension-font-family';
import {TextAlign} from '@tiptap/extension-text-align';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import Toolbar from './Toolbar'; // We will create this below

const Editor = () => {
  const { id: roomId } = useParams();
  const [ydoc, setYdoc] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isSynced, setIsSynced] = useState(false);
  const providerRef = useRef(null);

  useEffect(() => {
    if (providerRef.current) return;
    const doc = new Y.Doc();
    const prov = new WebsocketProvider('ws://127.0.0.1:1234', roomId, doc);
    providerRef.current = prov;
    setYdoc(doc);
    setProvider(prov);

    prov.on('sync', (synced) => {
      if (synced) setIsSynced(true);
    });

    return () => {
      prov.destroy();
      doc.destroy();
      providerRef.current = null;
    };
  }, [roomId]);

  if (!ydoc || !provider || !isSynced) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 font-medium">Syncing document...</p>
      </div>
    );
  }

  return <TiptapInstance ydoc={ydoc} />;
};

const TiptapInstance = ({ ydoc }) => {
  const extensions = useMemo(() => [
    StarterKit.configure({ history: false }),
    Underline,
    TextStyle,
    Color,
    FontFamily,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Collaboration.configure({
      document: ydoc,
      field: 'content',
    }),
  ], [ydoc]);

  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        // This makes it look like a professional paper
        class: 'prose prose-slate max-w-none mx-auto focus:outline-none min-h-[500px] p-10',
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="flex flex-col w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* 1. Toolbar Section */}
      <Toolbar editor={editor} />
      
      {/* 2. Editor Surface */}
      <div className="bg-gray-50 p-4 min-h-0 overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto bg-white shadow-sm border border-gray-100 min-h-[800px]">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Editor;