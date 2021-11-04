findFromModelAndSend = (req, res, next, model, filterObj = {}) => {
    model.find(filterObj)
        .then(result => sendStatusCode(res, 200, result))
        .catch(err => sendStatusCode(res, 404))
}

saveModelDataAndSend = (req, res, next, modelData) => {
    modelData.save()
        .then(result => sendStatusCode(res, 201, result))
        .catch(err => sendStatusCode(res, 404))
}

updateModelAndSend = (req, res, next, model) => {
    model.findOneAndUpdate({_id: req.body.id}, {...req.body}, {returnOriginal: false})
        .then(result => sendStatusCode(res, 200, result))
        .catch(err => sendStatusCode(res, 404))
}

deleteModelAndSend = (req, res, next, model, filterObj) => {
    model.findOneAndRemove(filterObj, (err, docs) => {
        try {
            if (err) throw new Error(err);
            sendStatusCode(res, 200);
        } catch (e) {
            sendStatusCode(res, 404);
        }
    })
}

sendStatusCode = (res, statusCode, payload) => {
    switch (statusCode) {
        case 404:
            res.status(statusCode).send();
            break;
        case 200:
        case 201:
            res.status(statusCode).send(payload);
            break;
    }
}

module.exports = {
    findFromModelAndSend,
    saveModelDataAndSend,
    updateModelAndSend,
    deleteModelAndSend,
    sendStatusCode,
};
