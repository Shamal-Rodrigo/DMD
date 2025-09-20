const mongoose = require ('mongoose')

const jobSchema = new mongoose.Schema(
    {
        jobId:{
            type: String
        },
        invoiceId:{
            type: String
        },
        customer:{
            type: String
        },
        address:{
            type: String
        },
        description:{
            type: String
        },
        date:{
            type: Date
        },
        services:{
            type: [service]
        },
        transport:{
            type: Date
        },
        tax:{
            type: Date
        },
        totalPrice:{
            type: String
        },
    }
) 

module.exports = mongoose.model('jobs',jobSchema);