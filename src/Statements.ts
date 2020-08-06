import {SqlJs} from "sql.js/module";
import _ from "lodash";

const getPrescription = (db?: SqlJs.Database) => {
    if (db) {
        const prescriptions = db.prepare("SELECT * FROM 'TREATMENT_PRESCRIPTION' WHERE ID=2");
        let prescription
        while (prescriptions.step()) {
            const row = prescriptions.getAsObject();
            prescription = JSON.parse(row.PrescriptionStr as string)
        }
        prescriptions.free()
        return prescription
    }
}
const getCaseId = (db: any) => {
    const stmt = db.prepare("SELECT * FROM 'CASES'");
    let caseId
    while (stmt.step()) {
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
        prescription.submissionForm.date = ""
        let str = `'${JSON.stringify(prescription.submissionForm, (key, value) => {
            if (_.isString(value)) {
                return value.replace("'", "")
            } else {
                return value
            }
        }, "\t")}'`
        const statementString = `UPDATE TREATMENT_PRESCRIPTION SET PrescriptionStr=${str}WHERE ID=2`
        const statements = []
        statements.push(statementString)
        console.log(statementString)
        return true
    } else {
        return false
    }
}
export {getCaseId, get3dModel, getPrescription, updateNotes}
