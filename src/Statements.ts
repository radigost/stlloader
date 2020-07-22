import {SqlJs} from "sql.js/module";

const getPrescription = (db: SqlJs.Database) => {
    const treatments = db.prepare("SELECT * FROM 'TREATMENT_PRESCRIPTION' WHERE ID=2");
    let prescription
    while (treatments.step()) {
        const row = treatments.getAsObject();
        prescription = JSON.parse(row.PrescriptionStr as string)
    }
    treatments.free()
    return prescription
}
const getCaseId = (db: any) => {
    const stmt = db.prepare("SELECT * FROM 'CASES'");
    let caseId
    while (stmt.step()) { //
        const row = stmt.getAsObject();
        caseId = row.CASEID
    }
    stmt.free();
    return caseId
}
const get3dModel = (db: any) => {
    const stmt = db.prepare("select * from ASSEMBLIES_ZIP where ID=0");
    let model
    while (stmt.step()) { //
        const row = stmt.getAsObject();
        model = row.UnsegmentedData
    }
    stmt.free();
    return model
}
const updateNotes = (db?: SqlJs.Database, note?: string) => {
    if (db) {
        const prescription = getPrescription(db)
        prescription.submissionForm.postedNotes = note;
        const str = `'${JSON.stringify(prescription,null,"\t")}'`
        // console.log(str)
        const statementString = `UPDATE TREATMENT_PRESCRIPTION SET PrescriptionStr=${str}  WHERE ID = 2`
        console.log(statementString)
        // const stmt = db.prepare(statementString);
        // stmt.run()
        // stmt.free();
        return true
    }

}
export {getCaseId, get3dModel, getPrescription, updateNotes}
