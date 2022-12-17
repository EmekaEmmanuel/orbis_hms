const Department = require('../../models/department') 

const routes = function (app) {

    // GET ALL DEPARTMENTS IN THE BRANCH
    app.get("/departments", async (req, res) => {
        const { branch_id } = req.query
        try {
            let department = await Department.find({ branch_id })
            if (!department) {
                return res.status(404).send({
                    msg: "Department does not exist in the branch",
                });
            }
            res.status(200).send({
                data: department,
                msg: "Gotten Departments succesfully"
            })
        } catch (error) {
            res.status(500).send({ msg: "Server error occurs" })
        }
    })

    // GET ONE DEPARTMENT IN THE BRANCH
    app.get("/departments/one", async (req, res) => {
        const { dept_name, branch_id } = req.query
        try {
            let department = await Department.findOne({ dept_name, branch_id })
            if (!department) {
                return res.status(404).send({ msg: "Department does not exist" })
            }
            res.status(200).send({ data: department, msg: "Gotten Department succesfully" })
        } catch (error) {
            res.status(500).send({ msg: "Server error occurs" })
        }
    })

    // CREATE DEPARTMENT
    app.post("/departments", async (req, res) => {
        let { dept_name, prefix, img, wardcount, branch_id, phone_number, deleted } = req.body
        try {
            let department = await Department.findOne({ dept_name })
            if (department) {
                return res.status(404).send({ data: bedspace, msg: "Department already exist" })
            }
            department = new Department({
                dept_name, 
                prefix,
                img, 
                wardcount, 
                branch_id, 
                phone_number, 
                deleted,
                created_dept
            })
            await department.save()
            res.status(200).send({ data: department, msg: "Department created" })
        } catch (error) {
            res.status(500).send({ msg: "Server error occurs" })
        }
    })

       // EDIT DEPARTMENT INFORMATION
       app.put("/department/:_id", async (req, res) => {
        try {
            let { _id } = req.params
            let { body } = req;
            let departmentUpdate = await Department.findById(_id)
            if (!departmentUpdate) return  res.status(404).send({ msg: "Department not found" })

            let data = departmentUpdate._doc;
            departmentUpdate.overwrite({ ...data, ...body })
            const department = await departmentUpdate.save()
            res.status(200).send({ data:department, msg: "Department updated" })
        } catch (err) {
            console.log(err)
            res.send("Server error")
        }
    })

    // DELETE DEPARTMENT
    app.delete("/department/:id", async (req, res) => {
        try {
            let { id } = req.params
            let deletedepartment = await Department.findById(id)
            if (!deletedepartment) return res.status(404).send({ msg: "Department doesn't exist" })

            deletedepartment.remove();

            res.status(200).send({ msg: "Department deleted" })
        } catch (error) {
            res.send({ msg: "Server error occurs" })
        }
    })
}

module.exports = routes