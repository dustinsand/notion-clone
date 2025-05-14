'use client'

import Document from "@/components/Document"
import React from "react";

function DocumentPage({params }) {
    const { id } = React.use(params);
    return (
            <div className="flex flex-col flex-1 min-h-screen">
                <Document id={id}/>
            </div>
    )
}

export default DocumentPage