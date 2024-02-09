"use client";

export default function Recherche(
    {
        marques, boiteVitesses, energies, etatVoitures, pays, data, setData, getAnnonces
    }: any
) {

    return (
        <div className="widget search-area">
            <h5 className="sidebar-title">Recherche avancé</h5>
            <div className="search-area-inner">
                <div className="search-contents ">
                    <div>
                        <div className="form-group">
                            <label>Modèle</label>
                            <input type="text" className="form-control" placeholder="206"
                                      value={data.modeleLike}
                                      onChange={(e) => setData({...data, modeleLike: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>Marque</label>
                            <select className="selectpicker search-fields" multiple
                                    value={data.marques}
                                    onChange={(e) => setData({...data, marques: Array.from(e.target.selectedOptions, option => option.value)})}>
                                {marques && marques.map((marque: any) => <option key={marque.id} value={marque.id}>{marque.nom}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Boite de vitesse</label>
                            <select className="selectpicker search-fields" multiple
                                    value={data.boiteVitesses}
                                    onChange={(e) => setData({...data, boiteVitesses: Array.from(e.target.selectedOptions, option => option.value)})}>
                                {boiteVitesses && boiteVitesses.map((boiteVitesse: any) => <option key={boiteVitesse.id} value={boiteVitesse.id}>{boiteVitesse.nom}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Energie</label>
                            <select className="selectpicker search-fields" multiple
                                    value={data.energie}
                                    onChange={(e) => setData({...data, energie: Array.from(e.target.selectedOptions, option => option.value)})}>
                                {energies && energies.map((energie: any) => <option key={energie.id} value={energie.id}>{energie.nom}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Etat de la voiture</label>
                            <select className="selectpicker search-fields" multiple
                                    value={data.etatVoiture}
                                    onChange={(e) => setData({...data, etatVoiture: Array.from(e.target.selectedOptions, option => option.value)})}>
                                {etatVoitures && etatVoitures.map((etatVoiture: any) => <option key={etatVoiture.id} value={etatVoiture.id}>{etatVoiture.designation}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Pays</label>
                            <select className="selectpicker search-fields" multiple
                                    value={data.pays}
                                    onChange={(e) => setData({...data, pays: Array.from(e.target.selectedOptions, option => option.value)})}>
                                {pays && pays.map((pays: any) => <option key={pays.id} value={pays.id}>{pays.nom}</option>)}
                            </select>
                        </div>
                        <br/>
                        <button className="search-button btn-md btn-color" onClick={getAnnonces}>
                            Rechercher</button>
                    </div>
                </div>
            </div>
        </div>
    );
}