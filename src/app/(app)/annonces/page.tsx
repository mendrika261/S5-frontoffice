"use client";

import Recherche from "@/app/(app)/annonces/ui/Recherche";
import ClientOnly from "@/app/(app)/ui/ClientOnly";
import VoitureCard from "@/app/(app)/annonces/ui/VoitureCard";
import SubBanner from "@/app/(app)/ui/SubBanner";
import {sendPost, useGet} from "@/app/utils/hooks";
import {API_BASE_URL, API_URL} from "@/app/config";
import {useEffect, useState} from "react";

export default function ListAnnonce() {
    const [marques, setMarques] = useGet(API_URL+"marques");
    const [boiteVitesses, setBoiteVitesses] = useGet(API_URL+"boite_vitesses");
    const [energies, setEnergies] = useGet(API_URL+"energies");
    const [etatVoitures, setEtatVoitures] = useGet(API_URL+"etat-voitures");
    const [pays, setPays] = useGet(API_URL+"pays");
    const [data, setData] = useState<any>(
        {
            "modeleLike": "",
            "marques": [],
            "boiteVitesses": [],
            "energie": [],
            "etatVoiture": [],
            "pays": []
        }
    );
    const [annonces, setAnnonces] = useState<any>([]);

    async function getAnnonces() {
        const response = await sendPost(API_BASE_URL+"annonces/filter", data);
        setAnnonces(response);
    }

    useEffect(() => {
        getAnnonces();
    }, []);

    useEffect(() => {
        console.log(annonces);
        // scroll to top
        window.scrollTo(0, 200);
    }, [annonces]);

    return (
        <ClientOnly>
            <SubBanner titre="Les annonces"/>
            <div className="car-list-rightside content-area-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12">
                            <div className="sidebar mrb">
                                <Recherche
                                    marques={marques}
                                    boiteVitesses={boiteVitesses}
                                    energies={energies}
                                    etatVoitures={etatVoitures}
                                    pays={pays}
                                    data={data}
                                    setData={setData}
                                    getAnnonces={getAnnonces}
                                />
                            </div>
                        </div>

                        <div className="col-lg-8 col-md-12">
                            <div className="option-bar d-none d-xl-block d-lg-block d-md-block d-sm-block">
                                <div className="row clearfix">
                                    <div className="col-xl-4 col-lg-5 col-md-5 col-sm-5">
                                        <h4 className="heading">{annonces ? annonces.length: "Chargement..."} Résultats</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                {
                                    annonces && annonces.map((annonce: any) =>
                                    <VoitureCard key={annonce.id} annonce={annonce}/>)
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </ClientOnly>
    )
}