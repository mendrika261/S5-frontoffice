"use client";

import SubBanner from "@/app/(app)/ui/SubBanner";
import VoitureBox from "@/app/(app)/voitures/ui/VoitureBox";
import {useGet} from "@/app/utils/hooks";
import {API_URL, URL_EXTENSION} from "@/app/config";
import Loading from "@/app/loading";



export default function ListeMessage() {
    const [voitures, setVoitures] = useGet(API_URL+"voitures");

    return (
        <>
            <SubBanner titre="Mes messages" />

            {voitures ?
                <div className="car-list-fullwidth content-area-2">
                    <div className="container">
                        <div className="option-bar d-none d-xl-block d-lg-block d-md-block d-sm-block">
                            <div className="row clearfix">
                                <div className="col-xl-4 col-lg-5 col-md-5 col-sm-5">
                                    <h4 className="heading">0 Message(s) non lu</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row mb-5">
                                    <div className="col-12">
                                        <a href={`/messages/ajouter${URL_EXTENSION}`} className="btn btn-md btn-theme col-12">
                                            Nouvelle discussion
                                            <span className="fa fa-plus mx-2"></span>
                                        </a>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <a href="/">
                                                            <div>
                                                                <span className="font-weight-bold">
                                                                John doe
                                                                </span>
                                                                <span
                                                                    className="badge badge-danger badge-pill mx-2">1</span>
                                                            </div>
                                                            <div>
                                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                                Nulla nec purus feugiat, molestie ipsum et, consequat
                                                                nibh.
                                                            </div>
                                                        </a>
                                                    </td>
                                                </tr>
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