"use client";

import SubBanner from "@/app/(app)/ui/SubBanner";
import {useGet} from "@/app/utils/hooks";
import {API_URL} from "@/app/config";
import Loading from "@/app/loading";
import {useEffect, useState} from "react";


export default function ListeMessage() {
    const [data, setData] = useGet(API_URL+"messages");
    const [utilisateur, setUtilisateur] = useState<any>();

    useEffect(() => {
        setUtilisateur(JSON.parse(localStorage?.getItem("utilisateur")!));
    }, []);


    function getUtilisateurDeDiscussion(data: any) {
        let utilisateur = JSON.parse(localStorage?.getItem("utilisateur")!);
        return data.utilisateur1 == utilisateur.id ? data.utilisateurObjet2 : data.utilisateurObjet1;
    }

    return (
        <>
            <SubBanner titre="Mes messages" />

            {(data && data.length == 0) &&
            <div className="container">
                <div className="row mt-3">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="text-center">Vous n&apos;avez pas encore de discussion, interagissez avec les annonces</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

            {(data && data.length > 0) ?
                <div className="car-list-fullwidth content-area-2">
                    <div className="container">
                        <div className="option-bar d-none d-xl-block d-lg-block d-md-block d-sm-block">
                            {/*div className="row clearfix">
                                <div className="col-xl-4 col-lg-5 col-md-5 col-sm-5">
                                    <h4 className="heading">0 Message(s) non lu</h4>
                                </div>
                            </div>*/}
                        </div>
                        <div className="row">
                            <div className="col-lg-12">

                                <div className="card">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <tbody>
                                                {data.map((discussion: any, index: number) =>
                                                <tr key={index}>
                                                        <td>
                                                            <a href={"/messages/details?utilisateur="+getUtilisateurDeDiscussion(discussion).id}>
                                                                <div>
                                                                <span className="font-weight-bold">
                                                                {
                                                                    utilisateur.id == discussion.utilisateur1 ?
                                                                    discussion.utilisateurObjet2.nomComplet:
                                                                    discussion.utilisateurObjet1.nomComplet
                                                                }
                                                                </span>
                                                                    {discussion.messages[0].sender != utilisateur.id &&
                                                                    <span className="badge badge-danger badge-pill mx-2">
                                                                        <span className={"fa fa-envelope"}></span>
                                                                    </span>}
                                                                </div>
                                                                <div>
                                                                    {discussion.messages[0].message.substring(0, 50)}
                                                                </div>
                                                            </a>
                                                        </td>
                                                </tr>
                                                )}
                                                </tbody>
                                            </table>
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