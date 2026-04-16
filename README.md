**CollabDocs: Real-Time Collaborative Suite**
CollabDocs is a professional-grade, full-stack collaborative document editor. 
It leverages CRDTs (Conflict-free Replicated Data Types) to allow multiple users to edit the same document simultaneously with sub-millisecond
latency and zero conflicts.

**Key Features**
**Real-Time Collaboration**: Powered by Yjs for seamless, conflict-free document synchronization.

**Rich Text Editor**: A high-end interface supporting Bold, Italic, Underline, Headings (H1, H2), Bullet Lists, and Text Alignment.

**Custom Typography**: Dynamic Font Family selection and a real-time Color Picker.

**Live Cursors**: Visual indicators showing where other collaborators are typing.

**Integrated Group Chat**: Real-time messaging sidebar powered by Socket.io for team communication.

**Professional UI**: A "paper-on-desk" aesthetic with a centered document canvas and floating toolbars.

**Project Structure**
Editor/
├── backend/
│   ├── data/                # Local LevelDB persistence storage
│   ├── index.js             # Socket.io Chat Server (Port 4000)
│   ├── yjs-server.cjs       # Yjs Sync Server (Port 1234)
│   └── package.json         # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Editor.jsx      # Core Editor logic & Tiptap setup
│   │   │   ├── Toolbar.jsx     # Rich text controls & Typography
│   │   │   ├── Chat.jsx        # Real-time chat interface
│   │   │--EditorStyles.css    
│   │   ├── EditorPage.jsx      # Main layout and workspace environment
│   │   └── App.jsx             # Routing and App entry
│   └── package.json            # Frontend dependencies
└── README.md

**How to Run the Project**
1. Prerequisite
Ensure you have Node.js installed on your system.

2. Backend Setup
Open two separate terminals for the backend services:

Terminal 1 (Sync Server):
cd backend
npm install
node yjs-server.cjs

Terminal 2 (Chat Server):
cd backend
node index.js

Frontend Setup
cd frontend
npm install --legacy-peer-deps
npm run dev
