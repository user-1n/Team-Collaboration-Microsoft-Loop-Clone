// import React, { useEffect, useRef, useState } from 'react'
// import EditorJS from '@editorjs/editorjs';
// import Header from '@editorjs/header';
// import Delimiter from '@editorjs/delimiter';
// import Alert from 'editorjs-alert';
// import List from "@editorjs/list";
// import NestedList from '@editorjs/nested-list';
// import Checklist from '@editorjs/checklist'
// import Embed from '@editorjs/embed';
// import SimpleImage from 'simple-image-editorjs';
// import Table from '@editorjs/table'
// import CodeTool from '@editorjs/code';
// import { TextVariantTune } from '@editorjs/text-variant-tune';
// import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
// import { db } from '@/config/firebaseConfig';
// import { useUser } from '@clerk/nextjs';
// import Paragraph from '@editorjs/paragraph';
// import GenerateAITemplate from './GenerateAITemplate';


// function RichDocumentEditor({ params }) {

//   const ref = useRef();
//   let editor;
//   const { user } = useUser();
//   const [documentOutput, setDocumentOutput] = useState([]);
//   // const [isFetched,setIsFetched]=useState(false);
//   let isFetched=false
//   useEffect(() => {
//     user && InitEditor();
//   }, [user])

//   /**
//    * Used to save Document
//    */
//   const SaveDocument = () => {
//     console.log("UPDATE")
//     ref.current.save().then(async (outputData) => {
//       const docRef = doc(db,'documentOutput', params?.documentid);
     
//       await updateDoc(docRef, {
//         output: JSON.stringify(outputData),
//         editedBy: user?.primaryEmailAddress?.emailAddress
//       })
//     })
//   }

//   const GetDocumentOutput = () => {
//     const unsubscribe = onSnapshot(doc(db, 'documentOutput', params?.documentid),
//       (doc) => {
//         if (doc.data()?.editedBy != user?.primaryEmailAddress?.emailAddress||isFetched==false)
//           doc.data().editedBy&&editor?.render(JSON.parse(doc.data()?.output)); 
//         isFetched=true  
//       })
//   }

//   const InitEditor = () => {
//     if (!editor?.current) {
//       editor = new EditorJS({
//         onChange: (api, event) => {
//            SaveDocument()
//           //ref.current.save().then(async (outputData) => {console.log(outputData)})
//         },
//         onReady:()=>{
//           GetDocumentOutput()
//         },
//         /**
//          * Id of Element that should contain Editor instance
//          */
//         holder: 'editorjs',
//         tools: {
//           header: Header,
//           delimiter: Delimiter,
//           paragraph:Paragraph,
//           alert: {
//             class: Alert,
//             inlineToolbar: true,
//             shortcut: 'CMD+SHIFT+A',
//             config: {
//               alertTypes: ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'],
//               defaultType: 'primary',
//               messagePlaceholder: 'Enter something',
//             }
//           },
//           table: Table,
//           list: {
//             class: List,
//             inlineToolbar: true,
//             shortcut: 'CMD+SHIFT+L',
//             config: {
//               defaultStyle: 'unordered'
//             },
//           },
//           checklist: {
//             class: Checklist,
//             shortcut: 'CMD+SHIFT+C',
//             inlineToolbar: true,
//           },
//           image: SimpleImage,
//           code: {
//             class: CodeTool,
//             shortcut: 'CMD+SHIFT+P'
//           },
//           //   textVariant: TextVariantTune


//         },

//       });
//       ref.current = editor;
//     }
//   }
//   return (
//     <div className=' '>
//       <div id='editorjs' className='w-[70%]'></div>
//       <div className='fixed bottom-10 md:ml-80 left-0 z-10'>
//         <GenerateAITemplate setGenerateAIOutput={(output)=>editor?.render(output)} />
//       </div>
//     </div>
//   )
// }

// export default RichDocumentEditor


import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import List from "@editorjs/list";
import Checklist from '@editorjs/checklist';
import SimpleImage from 'simple-image-editorjs';
import Table from '@editorjs/table';
import CodeTool from '@editorjs/code';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useUser } from '@clerk/nextjs';
import Paragraph from '@editorjs/paragraph';
import GenerateAITemplate from './GenerateAITemplate';

function RichDocumentEditor({ params }) {
    const ref = useRef();
    const { user } = useUser();
    const [isFetched, setIsFetched] = useState(false); // Use state to track if fetched
    const [editor, setEditor] = useState(null); // Store the editor instance

    useEffect(() => {
        console.log('Params:', params); // Log params for debugging
        if (user) {
            InitEditor();
        }
    }, [user]);

    const SaveDocument = async () => {
        if (!params?.documentid) {
            console.error("Document ID is undefined");
            return; // Exit if documentid is not defined
        }
        console.log("UPDATE");
        try {
            const outputData = await ref.current.save();
            const docRef = doc(db, 'documentOutput', params.documentid);
            await updateDoc(docRef, {
                output: JSON.stringify(outputData),
                editedBy: user?.primaryEmailAddress?.emailAddress,
            });
        } catch (error) {
            console.error("Error saving document:", error);
        }
    };

    const GetDocumentOutput = () => {
        if (!params?.documentid) {
            console.error("Document ID is undefined, cannot fetch output.");
            return; // Exit if documentid is not defined
        }

        const unsubscribe = onSnapshot(doc(db, 'documentOutput', params.documentid), (doc) => {
            if (!doc.exists()) {
                console.error("No document found with the given ID");
                return; // Exit if the document does not exist
            }

            if (doc.data()?.editedBy !== user?.primaryEmailAddress?.emailAddress || !isFetched) {
                if (doc.data().editedBy) {
                    editor?.render(JSON.parse(doc.data()?.output));
                }
                setIsFetched(true); // Update state to indicate data has been fetched
            }
        });

        // Cleanup the subscription on unmount
        return () => unsubscribe();
    };

    const InitEditor = () => {
        if (!ref.current) {
            const newEditor = new EditorJS({
                onChange: (api, event) => {
                    SaveDocument();
                },
                onReady: () => {
                    GetDocumentOutput();
                },
                holder: 'editorjs',
                tools: {
                    header: Header,
                    delimiter: Delimiter,
                    paragraph: Paragraph,
                    alert: {
                        class: Alert,
                        inlineToolbar: true,
                        shortcut: 'CMD+SHIFT+A',
                        config: {
                            alertTypes: ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'],
                            defaultType: 'primary',
                            messagePlaceholder: 'Enter something',
                        },
                    },
                    table: Table,
                    list: {
                        class: List,
                        inlineToolbar: true,
                        shortcut: 'CMD+SHIFT+L',
                        config: {
                            defaultStyle: 'unordered',
                        },
                    },
                    checklist: {
                        class: Checklist,
                        shortcut: 'CMD+SHIFT+C',
                        inlineToolbar: true,
                    },
                    image: SimpleImage,
                    code: {
                        class: CodeTool,
                        shortcut: 'CMD+SHIFT+P',
                    },
                },
            });
            ref.current = newEditor;
            setEditor(newEditor); // Store the editor instance in state
        }
    };

    return (
        <div>
            <div id='editorjs' className='w-[70%]'></div>
            <div className='fixed bottom-10 md:ml-80 left-0 z-10'>
                <GenerateAITemplate setGenerateAIOutput={(output) => ref.current?.render(output)} />
            </div>
        </div>
    );
}

export default RichDocumentEditor;

