'use client';
import {API_URL} from "@/app/config";
import React, {useState} from "react";
import {
    faArrowsSpin, faBolt,
    faCarBurst, faChartSimple, faCouch, faDoorOpen,
    faEye, faGasPump, faGlobe, faHandPointUp, faIdCard,
    faMailReply,
    faMessage, faNetworkWired, faOilCan,
    faPhoneAlt, faPlug, faRuler, faScrewdriverWrench, faSwatchbook,
    faTrashAlt,
    faUser,
    faWarning
} from "@fortawesome/free-solid-svg-icons";
import {useSearchParams} from "next/navigation";
import {sendPost, useGet} from "@/app/utils/hooks";
import FaIcon from "@/app/(app)/ui/FaIcon";
import SubBanner from "@/app/(app)/ui/SubBanner";
import ClientOnly from "@/app/(app)/ui/ClientOnly";

export default function Detail() {
    const params = useSearchParams();
    const [data, setData] = useGet(API_URL+"voitures/"+params.get("id"));
    const [message, setMessage] = useState(
        {
            message:"",
            idReceveur:""
        }
    );
    const utilisateur = JSON.parse(localStorage?.getItem("utilisateur")!);

    async function envoyer(btn: any) {
        message.idReceveur = data.utilisateur.id;
        message.message = "Bonjour, je suis intéressé par votre annonce sur " + data.sortieVoiture.modele.voiture + " pouvez-vous me contacter s'il vous plaît ?";
        btn.target.classList.add("btn-loading");
        const response = await sendPost(API_URL+"messages", message);
        if(response!=null) {
            console.log(response);
            location.replace('/messages/details?utilisateur=' + data.utilisateur.id);
        }
        btn.target.classList.remove("btn-loading");
    }



    return (
        <>
            {data && <>
                <ClientOnly>
                    <SubBanner titre="Les annonces"/>
                    <div className="car-list-rightside content-area-2">
                        <div className="page-header">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-auto">
                            <span className="avatar avatar-lg rounded"
                                  style={{backgroundImage: `url('/static/avatars/me.jpg')`}}>
                            </span>
                            </div>
                            <div className="col">
                                <h1 className="fw-bold">{data.sortieVoiture.modele.voiture}</h1>
                                <div className="my-2">
                                    {data.description ? data.description : "Aucune description"}
                                </div>
                                <div className="list-inline list-inline-dots text-secondary">
                                    <div className="list-inline-item">
                                        <FaIcon icon={faUser}/>
                                        {data.utilisateur.nomComplet}
                                    </div>
                                    <div className="list-inline-item">
                                        <FaIcon icon={faMessage}/>
                                        <a href={`mailto:${data.utilisateur.email}`}
                                           className="text-reset">{data.utilisateur.email}</a>
                                    </div>
                                    <div className="list-inline-item">
                                        <FaIcon icon={faPhoneAlt}/>
                                        {data.utilisateur.contact}
                                    </div>
                                </div>
                            </div>
                            <div className="col-auto ms-auto">
                                <div className="btn-list">
                                    {data.utilisateur.id != utilisateur.id ?
                                    <button
                                        type={"button"}
                                       className={"btn btn-primary btn-icon px-3"} onClick={envoyer}>
                                        Envoyer un message
                                        <FaIcon icon={faMailReply}/>
                                    </button>:
                                    <button
                                        type={"button"}
                                        className={"btn btn-danger btn-icon px-3"}>
                                        Votre annonce</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                        <div className="page-body">
                            <div className="row">
                                <div className="col-12">
                                <div className="card mx-5 mt-5">
                                    <div className="card-body">
                    <div className="container-xl">
                        <div className="row g-3">
                            <div className="col">
                                <ul className="timeline">
                                    <li className="timeline-event">
                                        <div
                                            className="timeline-event-icon bg-twitter-lt">
                                            <FaIcon icon={faScrewdriverWrench}/>
                                        </div>
                                        <div className="card timeline-event-card">
                                            <div className="card-body">
                                                <div className="text-secondary float-end">
                                                    {new Date(data.dateControleTech).toLocaleDateString()}
                                                </div>
                                                <h4>Dernière visite technique</h4>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="timeline-event">
                                        <div
                                            className="timeline-event-icon bg-pink-lt">
                                            <FaIcon icon={faCarBurst}/>
                                        </div>
                                        <div className="card timeline-event-card">
                                            <div className="card-body">
                                                <div className="text-secondary float-end">
                                                    {new Date(data.dateFinAssurance).toLocaleDateString()}
                                                </div>
                                                <h4>Fin de l&apos;assurance</h4>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="timeline-event">
                                        <div
                                            className="timeline-event-icon bg-green-lt">
                                            <FaIcon icon={faArrowsSpin}/>
                                        </div>
                                        <div className="card timeline-event-card">
                                            <div className="card-body">
                                                <div className="text-secondary float-end">
                                                    {data.miseEnCirculation}
                                                </div>
                                                <h4>Année de mise en circulation</h4>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-4">
                                <div className="row row-cards">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-title">A propos</div>
                                                <div className="mb-2">
                                                    <FaIcon icon={faChartSimple}/>
                                                    Etat:
                                                    <strong className={"mx-2"}>
                                                        {data.etatVoiture.designation.toLowerCase().includes("bonne") ? (
                                                            <span
                                                                className="badge badge-outline text-success">{data.etatVoiture.designation}</span>
                                                        ) : (
                                                            <>
                                                                {data.etatVoiture.designation.toLowerCase().includes("mauvaise") ? (
                                                                    <span
                                                                        className="badge badge-outline text-danger">{data.etatVoiture.designation}</span>
                                                                ) : (
                                                                    <span
                                                                        className="badge badge-outline text-secondary">{data.etatVoiture.designation}</span>
                                                                )}
                                                            </>
                                                        )}
                                                    </strong>
                                                </div>
                                                <div className="mb-2">
                                                    <FaIcon icon={faRuler}/>
                                                    Kilométrage (km): <strong>{data.kilometrage}</strong>
                                                </div>
                                                <div className="mb-2">
                                                    <FaIcon icon={faOilCan}/>
                                                    Kilométrage après vidange
                                                    (km): <strong>{data.kilometrageVidange}</strong>
                                                </div>
                                                <div className="mb-2">
                                                    <FaIcon icon={faPlug}/>
                                                    Puissance (cv): <strong>{data.sortieVoiture.puissance}</strong>
                                                </div>
                                                <div className="mb-2">
                                                    <FaIcon icon={faGasPump}/>
                                                    Consommation
                                                    (L/100km): <strong>{data.sortieVoiture.consommation}</strong>
                                                </div>
                                                <div className="mb-2">
                                                    <FaIcon icon={faDoorOpen}/>
                                                    Nombre de portes: <strong>{data.sortieVoiture.nbrPorte}</strong>
                                                </div>
                                                <div className="mb-2">
                                                    <FaIcon icon={faCouch}/>
                                                    Nombre de place: <strong>{data.sortieVoiture.nbrPlace}</strong>
                                                </div>
                                                <div className="mb-2">
                                                    <FaIcon icon={faHandPointUp}/>
                                                    Première main:
                                                    <strong className={"mx-2"}>
                                                        {data.premiereMain ?
                                                            (<span
                                                                className="badge badge-outline text-success">Oui</span>) :
                                                            (<span className="badge badge-outline text-danger">Non</span>)
                                                        }
                                                    </strong>
                                                </div>
                                                <div className="mb-2">
                                                    <FaIcon icon={faBolt}/>
                                                    Energie: <strong>{data.sortieVoiture.energie.nom}</strong>
                                                </div>
                                                <div className="mb-2">
                                                    <FaIcon icon={faNetworkWired}/>
                                                    Boite de vitesse: <strong>{data.sortieVoiture.boiteVitesse.nom}</strong>
                                                </div>
                                                <div className="mb-2">
                                                    <FaIcon icon={faSwatchbook}/>
                                                    Couleur:
                                                    <strong>
                                                        {data.couleur.nom}
                                                        <div className="mx-2" style={{
                                                            backgroundColor: data.couleur.codeCouleur,
                                                            width: '20px',
                                                            height: '20px',
                                                            borderRadius: '50%',
                                                            display: "inline-block"
                                                        }}></div>
                                                    </strong>
                                                </div>
                                                <div className="mb-2">
                                                    <FaIcon icon={faIdCard}/>
                                                    Immatriculation: <strong>{data.immatriculation}</strong>
                                                </div>
                                                <div className="mb-2">
                                                    <FaIcon icon={faGlobe}/>
                                                    Fabriqué en:
                                                    <strong>
                                                    <span
                                                        className={`mx-2 flag flag-country-${data.sortieVoiture.pays.code}`}
                                                        style={{height: '30px'}}>
                                                    </span>
                                                        {data.sortieVoiture.pays.nom}
                                                    </strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                </div>
                    </div>
                </ClientOnly>
            </>}
        </>
    );
}