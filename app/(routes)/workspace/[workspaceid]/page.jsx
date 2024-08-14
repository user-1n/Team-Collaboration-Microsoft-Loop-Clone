// import React from 'react'
// import SideNav from '../_components/SideNav'
// import { Room } from '@/app/Room'
// import DocumentEditorSection from '../_components/DocumentEditorSection'

// function Workspace({params}) {
//   return (

//     <Room>
// <div>

//     <div>
//       <Room params={params}>
//         <SideNav params={params} />
//         </Room>
//     </div>


// <div className='md:ml-72'>
//   <DocumentEditorSection params={params}/>


// </div>
//     </div>

//     </Room>
    
//   )
// }

// export default Workspace


import React from 'react';
import SideNav from '../_components/SideNav';
import { Room } from '@/app/Room';
import DocumentEditorSection from '../_components/DocumentEditorSection';

function Workspace({ params }) {
  return (
    <Room params={params}> {/* Use Room only once */}
      <div>
        <div>
          <SideNav params={params} />
        </div>
        <div className='md:ml-72'>
          <DocumentEditorSection params={params} />
        </div>
      </div>
    </Room>
  );
}

export default Workspace;
