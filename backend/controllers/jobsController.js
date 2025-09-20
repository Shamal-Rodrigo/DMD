const Jobs = require ('../models/jobModel')

const getJobs = async(req, res) =>{

    try {
        await Jobs.find().then(data => {
            res.send({status:"ok", data:data})
        })
    } catch (error) {
        console.log("Error occured - ", error)
    }

}

const addJob = async(req, res) => {

    const {jobId, invoiceId, customer, address, description, date, price} = req.body;

    try {
        const job = await Jobs.create({jobId, invoiceId, customer, address, description, date, price})
        if(job){
            res.status(201).json({
                message: 'Job added successfully!!',
            });
            console.log("Got the data here!")
        }else {
            res.status(400).json({
                message: 'Job adding error',
            });
    }
    } catch (error) {
        console.log("Error occured - ", error)
    }
}


module.exports = {addJob, getJobs};