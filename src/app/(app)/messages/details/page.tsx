"use client";

import SubBanner from "@/app/(app)/ui/SubBanner";
import {sendPost, useGet} from "@/app/utils/hooks";
import {API_URL, URL_EXTENSION} from "@/app/config";
import Loading from "@/app/loading";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";



export default function Message() {
    const params = useSearchParams();
    const discussionUtilisateurId = params.get("utilisateur");
    const [discussion, setDiscussion] = useGet(API_URL+"messages/"+discussionUtilisateurId);
    const [message, setMessage] = useState(
        {
            message:"",
            idReceveur:discussionUtilisateurId
        }
    );

    function getUtilisateurDeDiscussion() {
        if(discussion.utilisateur1 == discussionUtilisateurId)
            return discussion.utilisateurObjet1;
        return discussion.utilisateurObjet2;
    }

    async function envoyer(btn: any) {
        const messageArea = document.getElementById("message-area")!;
        const messageList = document.getElementById("message-list")!;
        const template = document.getElementById("template")!;
        btn.target.classList.add("btn-loading");
        const response = await sendPost(API_URL+"messages", message);
        if(response!=null) {
            // @ts-ignore
            template.lastElementChild!.innerHTML = messageArea.value;
            messageList.appendChild(template.cloneNode(true));
            // @ts-ignore
            messageList.lastElementChild!.lastElementChild!.style.display = "block";
            messageList.scrollTop = messageList.scrollHeight;
            // @ts-ignore
            messageArea.value = "";
        }
        btn.target.classList.remove("btn-loading");
    }

    useEffect(() => {
        if(discussion) {
            const messageList = document.getElementById("message-list")!;
            messageList.scrollTop = messageList.scrollHeight;
        }
    }, [discussion]);


    return (
        <>
            <SubBanner titre="Mes messages" />

            {discussion ?
                <div className="car-list-fullwidth content-area-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title">
                                            {getUtilisateurDeDiscussion().nomComplet}
                                            <a href={"/messages/details?utilisateur=" + discussionUtilisateurId}
                                               className="text-primary mx-2">
                                                <span className="fa fa-refresh"></span>
                                            </a>
                                        </h5>
                                    </div>
                                    <div className="row mb-3 d-flex justify-content-end" style={{maxHeight: "300px"}} id="template">
                                        <div className="bg-primary text-white px-3 pt-3 pb-3 rounded" style={{display: "none"}}>
                                            {message.message}
                                        </div>
                                    </div>
                                    <div className="card-body" style={{height: "500px", overflow: "scroll"}}
                                         id="message-list">
                                        {discussion.messages.map((message: any, index: number) => <>
                                                {message.sender == discussionUtilisateurId ?
                                                    <div className="row mb-3">
                                                        <div className="bg-secondary text-white px-3 pt-3 pb-3 rounded"
                                                             style={{maxHeight: "300px"}}>
                                                            {message.message}
                                                        </div>
                                                    </div> :
                                                    <div className="row mb-3 d-flex justify-content-end"
                                                         style={{maxHeight: "300px"}}>
                                                        <div className="bg-primary text-white px-3 pt-3 pb-3 rounded">
                                                            {message.message}
                                                        </div>
                                                    </div>
                                                }
                                            </>
                                        )}
                                    </div>
                                    <div className="card-footer">
                                        <div className="input-group">
                                            <textarea className="form-control" placeholder="Votre message"
                                                      rows={1} id="message-area"
                                                      onChange={(e) => {
                                                          setMessage({...message, message: e.target.value})
                                                      }}
                                            >
                                            </textarea>
                                            <div className="input-group-append">
                                                <button className="btn btn-primary btn-icon" onClick={envoyer}>
                                                    <span className="fa fa-paper-plane"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : <Loading/>}
        </>
    )
}