import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import initSqlJs from "sql.js";
import axios from 'axios'
import {last, get} from 'lodash'
// import * as wasm from '../sql-wasm.wasm'
const OASReader = () => {
    const [loading, setLoading] = useState(false)
    const [db, setDb] = useState()
    const [caseId, setCaseId] = useState()
    const [prescription, setPrescription] = useState()

    const getOAS = async () => {
        const res = await axios.get('/static/test.oas', {responseType: 'arraybuffer'})
        return res.data
    }
    const setCases = useCallback(async () => {
        const treatments = db.prepare("SELECT * FROM 'TREATMENT_PRESCRIPTION'");
        while (treatments.step()) { //
            const row = treatments.getAsObject();
            setPrescription(JSON.parse(row.PrescriptionStr))
        }
        treatments.free()
    }, [db])
    const getCaseId = async () => {
        var stmt = db.prepare("SELECT * FROM 'CASES'");

        while (stmt.step()) { //
            const row = stmt.getAsObject();
            setCaseId(row.CASEID)
        }
        stmt.free()
    }
    const initDb = async () => {
        setLoading(true)
        try {
            const SQL = await initSqlJs(
                {
                    locateFile: filename => `/static/js/${filename}`
                })
            const data = await getOAS();
            const uInt8Array = new Uint8Array(data);

            const database = new SQL.Database(uInt8Array);
            setDb(database)
            setLoading(false)
        } catch (e) {
            console.error(e.message)
        }
    }

    useEffect(() => {
        initDb()
    }, [])

    useEffect(() => {
        if (db) {
            setCases()
            getCaseId()
        }
    }, [db])


    return (
        <OASContainer>
            {
                loading ?
                    <div>Loading...</div> :
                    <div>
                        <h5>case id '{caseId}'</h5>
                        <div>

                            <textarea  cols="40" rows="20">
                                {JSON.stringify(prescription,undefined,4)}
                            </textarea>
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
