import {getFile} from "@/app/utils/hooks";

export default async function VoitureCard(annonce: any) {
    return (
        <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="car-box">
                {annonce?.annonce?.voiture?.photos?.length > 0 ?
                    <div className="car-thumbnail">
                        <a href={"/annonces/details?annonce="+annonce.annonce.id+"&id="+annonce.annonce.voiture.id} className="car-img">
                            <img className="d-block w-100 img-fluid" src={await getFile(annonce?.annonce?.voiture?.photos[0]?.lien)}
                                 style={{height: '100%', width: '100%', objectFit: 'scale-down'}} />
                        </a>
                    </div>
                    :
                    <div className="car-thumbnail">
                        <a href={"/annonces/details?annonce="+annonce.annonce.id+"&id="+annonce.annonce.voiture.id} className="car-img">
                            <img className="d-block w-100 img-fluid" src="/assets/img/noimage.png"/>
                        </a>
                    </div>
                }
                <div className="detail">
                    <div className="heading clearfix">
                        <div className="title pull-left">
                            <a href={"/annonces/details?annonce="+annonce.annonce.id+"&id="+annonce.annonce.voiture.id}>{annonce?.annonce?.voiture?.sortieVoiture?.modele?.voiture}</a>
                        </div>
                        <div className="price pull-right">
                            MGA {annonce?.annonce?.prix}
                        </div>
                    </div>
                    <p>{annonce?.annonce?.voiture?.description}</p>
                    <ul className="facilities-list clearfix">
                        <li className="bordered-right">
                            <i className="flaticon-transport-4"></i> {annonce?.annonce?.voiture?.sortieVoiture?.boiteVitesse?.nom}
                        </li>
                        <li className="bordered-right">
                            <i className="flaticon-road"></i> {annonce?.annonce?.voiture?.kilometrage} km
                        </li>
                        <li>
                            <i className="flaticon-petrol"></i> {annonce?.annonce?.voiture?.sortieVoiture?.energie?.nom}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}