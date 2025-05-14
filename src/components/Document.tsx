'use client';

import {Button} from "./ui/button";
import {Input} from "./ui/input"
import {FormEvent, useEffect, useState, useTransition} from "react";
import {doc, updateDoc} from "@firebase/firestore";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {db} from "../../firebase";

function Document({id}: { id: string }) {
    const [data, loading, error] = useDocumentData(doc(db, "documents", id));
    const [input, setInput] = useState('');
    const [isUpdating, startTransition] = useTransition();
    useEffect(() => {
        if (data) {
            setInput(data.title);
        }
    }, [data])
    const updateTitle = (e: FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            startTransition(async () => {
                await updateDoc(doc(db, "documents", id), {
                    title: input,
                })
            })
        }
    }

    return (<div>
        <div className="flex max-w-6xl mx-auto justify-between pb-5">
            <form onSubmit={updateTitle} className={"flex flex-1 space-x-2"}>
                {/* update title */}
                <Input
                    onChange={(e) => setInput(e.target.value)}
                    value={input}/>
                <Button>
                    {isUpdating ? "Updating..." : "Update"}
                </Button>

                {/* IF */}
                {/* isOwner && InviteUser, DeleteDocument}*/}
            </form>


            {/* Collaborative Editor */}
        </div>
    </div>);
}

export default Document;