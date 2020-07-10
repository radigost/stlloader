import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import initSqlJs from "sql.js";
import axios from 'axios'
import store from "../store";

const getOAS = async () => {
    const res = await axios.get('http://localhost:3005/test2.oas', {
        responseType: 'arraybuffer',
        headers: {
            'Accept': '*/*'
        }
    })
    return res.data
}

const createDbFromOas = async () => {
    const SQL = await initSqlJs(
        {
            locateFile: filename => `/static/js/${filename}`
        })
    const data = await getOAS();
    const uInt8Array = new Uint8Array(data);

    const database = new SQL.Database(uInt8Array);
    return database
}

const getPrescription = (db) => {
    const treatments = db.prepare("SELECT * FROM 'TREATMENT_PRESCRIPTION'");
    let prescription
    while (treatments.step()) { //
        const row = treatments.getAsObject();
        prescription = JSON.parse(row.PrescriptionStr)
    }
    treatments.free()
    console.log(prescription)
    return prescription
}
const getCaseId = (db) => {
    const stmt = db.prepare("SELECT * FROM 'CASES'");
    let caseId
    while (stmt.step()) { //
        const row = stmt.getAsObject();
        // setCaseId(row.CASEID)
        caseId = row.CASEID

    }
    stmt.free();
    return caseId
}
const get3dModel = (db) => {
    const stmt = db.prepare("select * from ASSEMBLIES_ZIP where ID=0");
    let model
    while (stmt.step()) { //
        const row = stmt.getAsObject();
        model = row.UnsegmentedData
    }
    stmt.free();
    return model
}


const OASReader = () => {
    const [db, setDb] = useState()
    const [prescription, setPrescription] = useState()
    const [model, setModel] = useState()
    const [state, setState] = useState({
        caseId: undefined,
    })


    const initDb = async () => {
        console.log("loiading")
        store.modifyState(state => {
            state.oas.loading = true
        })
        try {
            const database = await createDbFromOas()
            setDb(database)
            store.modifyState(state => {
                state.oas.loading = false
            })
            console.log("loiading")
        } catch (e) {
            console.error(e.message)
        }
    }

    useEffect(() => {
        initDb()
    }, [])

    useEffect(() => {
        if (db) {
            setPrescription(getPrescription(db))
            setState({...state, caseId: getCaseId(db)})
            setModel(get3dModel(db))
        }
    }, [db])

    return (
        <OASContainer>
            {store.state.oas.loading ?
                <div>Loading...</div> :
                <div>
                    <h5>case id '{state.caseId}'</h5>
                    <div>
                            <textarea cols="40" rows="20" defaultValue={JSON.stringify(prescription, undefined, 4)}>
                            </textarea>
                        {/*<TeethCanvas model={model}/>*/}
                    </div>
                </div>
            }
        </OASContainer>
    );
};


const OASContainer = styled.div`
    height: 80vh;
`
export {OASReader};
