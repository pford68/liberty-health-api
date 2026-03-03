import {describe, expect, it, test} from '@jest/globals';
import QueryBuilder from "../QueryBuilder.js";
import Job from "../../model/Job.js";


describe("Query Builder", () => {
    describe("update(T:EntityType, colsToSet:string[])", () => {
        it("should write a well-formed UPDATE prepared statement" +
            " with named placeholders", () => {
            const expected = "UPDATE job_history SET title = :title, company = :company, end_date = :endDate WHERE applicant_id = ?";
            const stmt = new QueryBuilder()
                .update(Job, "title", "company", "endDate")
                .where("applicant_id = ?")
                .build();
            expect(stmt).toEqual(expected);
        })
   });
})