Engineering Log: AI-Guided Development
This document outlines the collaborative process between the developer and AI to architect and debug CollabDocs. 
Each prompt was designed to be "token-efficient"—focusing on high-level architecture before diving into implementation.

Phase 1: Architecture & Requirements
Prompt 1: Initial System Design (Summarized)
Developer: "Architect (sumarise form of requirements which is given in Assignment). Core requirements: Real-time multi-user text sync (conflict-free),
Rich Text UI (typography/alignment), and a side-car Group Chat. Suggest a lightweight stack for sub-millisecond latency."

AI Guidance: Suggested Tiptap for the editor, Yjs for CRDT-based sync, and Socket.io for chat. 
Recommended a dual-socket backend to isolate document binary data from chat JSON data.

Prompt 2: Dependency & Setup Strategy
Developer: "Provide a minimalist setup guide. Which peer dependencies are required for Tiptap v3 and Yjs persistence via LevelDB?
How should ports be allocated to avoid cross-protocol interference?"

AI Guidance: Detailed the installation of @tiptap/extension-collaboration and y-websocket. 
Assigned Port 1234 for the binary Sync Server and Port 4000 for the Chat Server.

🛠️ Phase 2: Solving Technical Hurdles
Prompt 3: Fixing Lifecycle Race Conditions
Developer: "Receiving TypeError: Cannot read properties of undefined (reading 'doc') in cursor-plugin.js. 
The Tiptap instance is mounting before the Yjs provider is ready. 
How do I implement a 'Gatekeeper' pattern in React to ensure the provider is fully synced before editor initialization?"

AI Guidance: Proposed a TiptapInstance sub-component that only renders when the isSynced state from the WebsocketProvider is true. 
This ensures the editor is "born" with its data.

Prompt 4: CSS Layering & Paper Aesthetic
Developer: "The UI feels like a flat web app. I need a 'Paper-on-Desk' look similar to Google Docs.
Give me a CSS architecture for a centered document canvas with specific print-standard margins (1.5in) and a floating toolbar that doesn't obstruct the editor."

AI Guidance: Provided a scoped .css architecture using box-shadow layers and max-width: 816px (standard A4 width) to create a 
professional desktop publishing environment.

🚀 Phase 3: Final Polish & Best Practices
Prompt 5: Dependency Conflict Resolution
Developer: "Encountering ERESOLVE error with npm install due to version mismatches between
Tiptap v2 and v3 extensions. How do I safely bypass this while maintaining project stability?"

AI Guidance: Explained the use of --legacy-peer-deps and verified that the Tiptap 2.x collaboration extension remains compatible with the 3.x core API surface.

Prompt 6: Binary Data Persistence
Developer: "I see a data/ folder in my backend with .log and MANIFEST files. Explain its purpose and advise on whether this should be included in the Git repository."

AI Guidance: Identified the files as LevelDB Write-Ahead Logs for document persistence. Recommended adding backend/data/ to .gitignore to prevent repository bloating while explaining the persistence logic for interviews.
