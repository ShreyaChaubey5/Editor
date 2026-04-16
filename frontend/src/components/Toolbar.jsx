import React from 'react';
import { 
  Bold, Italic, Underline, List, 
  AlignLeft, AlignCenter, AlignRight,
  Heading1, Heading2, Palette, Type
} from 'lucide-react';
import '../EditorStyles.css'; 

const Toolbar = ({ editor }) => {
  if (!editor) return null;

  // The logic remains exactly as you wrote it
  const IconButton = ({ onClick, isActive, children, title }) => (
    <button
      onClick={(e) => { e.preventDefault(); onClick(); }}
      title={title}
      // We swap the Tailwind string for our clean CSS classes
      className={`toolbar-btn ${isActive ? 'is-active' : ''}`}
    >
      {children}
    </button>
  );

  return (
    <div className="modern-toolbar">
      {/* Structure Group */}
      <IconButton 
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
        isActive={editor.isActive('heading', { level: 1 })}
        title="Title"
      >
        <Heading1 size={18} />
      </IconButton>
      <IconButton 
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
        isActive={editor.isActive('heading', { level: 2 })}
        title="Subtitle"
      >
        <Heading2 size={18} />
      </IconButton>
      <IconButton 
        onClick={() => editor.chain().focus().setParagraph().run()} 
        isActive={editor.isActive('paragraph')}
        title="Normal Text"
      >
        <Type size={18} />
      </IconButton>

      <div className="toolbar-divider" />

      {/* Styling Group */}
      <IconButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold">
        <Bold size={18} />
      </IconButton>
      <IconButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic">
        <Italic size={18} />
      </IconButton>
      <IconButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline">
        <Underline size={18} />
      </IconButton>

      <div className="toolbar-divider" />

      {/* Lists & Alignment */}
      <IconButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bullet Points">
        <List size={18} />
      </IconButton>
      
      <div className="toolbar-divider" />
      
      <IconButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })}>
        <AlignLeft size={18} />
      </IconButton>
      <IconButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })}>
        <AlignCenter size={18} />
      </IconButton>
      <IconButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })}>
        <AlignRight size={18} />
      </IconButton>

      <div className="toolbar-divider" />

      {/* Typography: Font Family */}
      <select 
        onChange={e => editor.chain().focus().setFontFamily(e.target.value).run()}
        className="toolbar-select"
        value={editor.getAttributes('textStyle').fontFamily || 'Inter'}
      >
        <option value="Inter">Inter</option>
        <option value="serif">Serif</option>
        <option value="monospace">Mono</option>
        <option value="cursive">Cursive</option>
      </select>

      <div className="toolbar-divider" />

      {/* Color Picker Section */}
      <div className="flex items-center gap-1 hover:bg-gray-100 p-1 rounded transition-colors cursor-pointer relative">
        <Palette size={16} className="text-gray-500" />
        <input
          type="color"
          onInput={e => editor.chain().focus().setColor(e.target.value).run()}
          className="w-5 h-5 p-0 border-none cursor-pointer bg-transparent absolute opacity-0 w-full h-full left-0"
          title="Text Color"
        />
        {/* Visual indicator of current color */}
        <div 
          className="w-4 h-1 rounded-full mt-4 absolute bottom-1" 
          style={{ backgroundColor: editor.getAttributes('textStyle').color || '#000000' }}
        />
      </div>
    </div>
  );
};

export default Toolbar;